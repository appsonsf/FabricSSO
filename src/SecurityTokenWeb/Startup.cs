using System;
using System.IO;
using System.Security.Cryptography.X509Certificates;
using System.Text;
using MassTransit;
using AppsOnSF.Common.BaseServices;
using AppsOnSF.Common.Options;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.DataProtection;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpOverrides;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using OpenApiClient;
using OpenApiClient.MdmDataDistribute;
using SecurityTokenWeb.Extensions;
using SecurityTokenWeb.Services;
using Sso.Remoting;
using Sso.Remoting.Events;
using StackExchange.Redis;
using WebCommon;

namespace SecurityTokenWeb
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddHealthChecks();

#if !DEBUG
            var redisHosts = Configuration.GetSection("RedisConfig").GetValue<string>("Host").Split(' ');
            var redisConfig = new ConfigurationOptions() { AbortOnConnectFail = false };
            Array.ForEach(redisHosts, o => redisConfig.EndPoints.Add(o));

            services.AddDataProtection()
                .SetApplicationName("SsoApp-SecurityTokenWeb")
                .PersistKeysToServiceFabric();
#endif

            services.AddRemotingService();
            services.AddHttpClient<IContactsClient, ContactsClient>(client =>
            {
                client.BaseAddress = new Uri(BaseUrls.MdmDataDistribute);
                client.Timeout = TimeSpan.FromSeconds(10);
            });

            var (bus, bus_option) = this.CreateBus("RabbitMQ");
            services.AddScoped<IMobileCodeSender, MobileCodeSender>();
            services.AddMobileCodeSender(bus, bus_option.HostAddress);

            services.AddSingleton<IHandleLoginService, HandleLoginService>();
            services.AddCors(options =>
                options.AddPolicy("CorsPolicy", builder => builder.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod()));

            services.AddMemoryCache();
            services.AddMvc();
            var idsvrOptions = Configuration.GetSection("IdSvr");
            var issuerUri = idsvrOptions.GetValue<string>("IssuerUri");
            services.AddIdentityServer(options =>
                {
                    options.Events.RaiseSuccessEvents = true;
                    options.Events.RaiseFailureEvents = true;
                    options.Events.RaiseErrorEvents = true;

                    options.Caching.ClientStoreExpiration = TimeSpan.FromMinutes(3);
                    options.Caching.ResourceStoreExpiration = TimeSpan.FromMinutes(3);

                    options.PublicOrigin = issuerUri;
                })
#if DEBUG
                .AddInMemoryCaching()
#else
                .AddOperationalStore(options =>
                {
                    options.ConfigurationOptions = redisConfig;
                    options.Db = 1;
                })
                .AddRedisCaching(options =>
                {
                    options.ConfigurationOptions = redisConfig;
                    options.KeyPrefix = "ids";
                })
#endif
                .AddConfigurationStore()
                //.AddSigningCredential()
                //.AddInMemoryClients(Clients.Get())
                //.AddInMemoryIdentityResources(Resources.GetIdentityResources())
                //.AddInMemoryApiResources(Resources.GetApiResources())
                //https://blogs.msdn.microsoft.com/webdev/2017/01/23/asp-net-core-authentication-with-identityserver4/
                .AddSigningCredential(GetX509Certificate2())
                //.AddDeveloperSigningCredential()
                .AddExtensionGrantValidator<ExtensionGrantValidator>()
                .AddExtensionGrantValidator<NoSubjectExtensionGrantValidator>()
                .AddJwtBearerClientAuthentication()
                .AddAppAuthRedirectUriValidator()
                .AddResourceOwnerValidator<ResourceOwnerPasswordValidator>()
                .AddProfileService<ProfileService>();
            //.AddTestUsers(TestUsers.Users);

            var requireHttps = idsvrOptions.GetValue<bool>("RequireHttps");
            services.AddAuthentication()
                .AddJwtBearer(jwt =>
                {
                    jwt.Authority = issuerUri;
                    jwt.RequireHttpsMetadata = requireHttps;
                    jwt.Audience = "sso.sts";
                });

            services.Configure<GeneralOptions>(Configuration.GetSection("General"));

            var generalOptions = Configuration.GetSection("General").Get<GeneralOptions>();
            HtmlHelperExtensions.StaticFileHost = generalOptions.StaticFileSiteHost;
        }

        private X509Certificate2 GetX509Certificate2()
        {
            var filename = Path.Combine(Directory.GetCurrentDirectory(), "FabricSSO.pfx");
            if (File.Exists(filename))
            {
                return new X509Certificate2(filename, "appsonsf");
            }
            throw new FileNotFoundException("FabricSSO.pfx not found");
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
        {
            app.UseHealthChecks("/health");

            app.UseForwardedHeaders(new ForwardedHeadersOptions
            {
                ForwardedHeaders = ForwardedHeaders.XForwardedFor | ForwardedHeaders.XForwardedProto
            });

            app.UseCors("CorsPolicy");

            loggerFactory.AddDebug();

            //log ASP.NET Core Request
            //app.Use(async (context, next) =>
            //{
            //    var logger = loggerFactory.CreateLogger("ASP.NET Core Request");
            //    var sbHeaders = new StringBuilder();
            //    foreach (var header in context.Request.Headers)
            //    {
            //        sbHeaders.Append($"{header.Key}: {header.Value},");
            //    }

            //    logger.LogInformation("Request Method: {0}; Request Scheme: {1}; Request Path: {2}; Request Headers: {3}; Request RemoteIp: {4}",
            //        context.Request.Method, context.Request.Scheme, context.Request.Path, sbHeaders.ToString(), context.Connection.RemoteIpAddress);

            //    await next.Invoke();
            //});

            if (env.IsDevelopment())
            {
                //app.UseBrowserLink();
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
            }

            app.UseIdentityServer();
            //WebSocket
            //var webSocketOptions = new WebSocketOptions()
            //{
            //    KeepAliveInterval = TimeSpan.FromSeconds(30),
            //    ReceiveBufferSize = 4 * 1024
            //};
            //app.UseWebSockets(webSocketOptions);
            //app.UseWebSockets();
            //app.MapWebSocketManager("/token", serviceProvider.GetService<SSOTokenHandler>());
            app.UseStaticFiles();
            app.UseMvcWithDefaultRoute();

        }

        private (IBusControl, RabbitMQOption) CreateBus(string sectionName)
        {
            var option = Configuration.GetSection(sectionName).Get<RabbitMQOption>();
            var bus = Bus.Factory.CreateUsingRabbitMq(cfg =>
            {
                var host = cfg.Host(new Uri(option.HostAddress), h =>
                {
                    h.Username(option.Username);
                    h.Password(option.Password);
                });
            });
            return (bus, option);
        }
    }
}
