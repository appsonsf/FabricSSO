using Hangfire;
using AppsOnSF.Common.BaseServices;
using Microsoft.AspNetCore.Authentication.OpenIdConnect;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.DataProtection;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpOverrides;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using Sso.Remoting;
using System;
using System.Fabric;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Threading.Tasks;
using IdentityServer4.Validation;
using ManageConsoleWeb.HangfireJobs;
using OpenApiClient.MdmDataDistribute;
using OpenApiClient;

namespace ManageConsoleWeb
{
    public class Startup
    {
        private readonly StatelessServiceContext _serviceContext;

        public Startup(IConfiguration configuration,
            StatelessServiceContext serviceContext)
        {
            Configuration = configuration;
            _serviceContext = serviceContext;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddHealthChecks();

#if !DEBUG
            services.AddDataProtection()
                .SetApplicationName("SsoApp-ManageConsoleWeb")
                .PersistKeysToServiceFabric();
#endif



            services.AddRemotingService();
            var idsvrOptions = Configuration.GetSection("IdSvr");
           
            JwtSecurityTokenHandler.DefaultInboundClaimTypeMap.Clear();

            services.AddAuthorization(options =>
            {
                options.AddPolicy("Admin", policy => policy.RequireUserName("sso_admin"));
            });

            #region  授权认证接入SSO
            services
                .AddAuthentication(options =>
                {
                    options.DefaultScheme = "Cookies";
                    options.DefaultChallengeScheme = "oidc";
                })
                .AddCookie("Cookies")
                .AddOpenIdConnect("oidc", options =>
                {
                    options.SignInScheme = "Cookies";
                    options.Authority = idsvrOptions.GetValue<string>("IssuerUri");
                    options.RequireHttpsMetadata = idsvrOptions.GetValue<bool>("RequireHttps");
                    options.ClientId = "sso.mc";
                    options.ClientSecret = "sso_mc";
                    options.ResponseType = "code id_token";
                    options.SaveTokens = true;
                    options.GetClaimsFromUserInfoEndpoint = true;
                    options.Scope.Add("openid");
                    options.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuerSigningKey = false
                    };
                    options.Events = new OpenIdConnectEvents()
                    {
                        OnUserInformationReceived = (context) =>
                        {
                            var identity = context.Principal.Identity as ClaimsIdentity;
                            if (identity != null)
                            {
                                try
                                {
                                    var userName = context.User.GetValue("preferred_username").ToString();
                                    identity.AddClaim(new Claim(ClaimTypes.Name, userName));
                                }
                                catch (Exception)
                                {

                                }
                            }

                            return Task.FromResult(0);
                        }
                    };
                });
            #endregion

            services.AddAntiforgery(o => o.HeaderName = "XSRF-TOKEN");

            services.AddMemoryCache();

            var hangfireDbConnectionString = Configuration.GetSection("ConnectionStrings").GetValue<string>("HangfireDbConnection");
            services.AddHangfire(x => x.UseSqlServerStorage(hangfireDbConnectionString));

            services.AddMvc().AddRazorPagesOptions(option =>
                {
                    option.Conventions.AuthorizeFolder("/ReactClientManage", "Admin");
                    option.Conventions.AuthorizeFolder("/ReactResourceManager", "Admin");
                    option.Conventions.AuthorizeFolder("/ReactRoleManager", "Admin");
                    option.Conventions.AuthorizeFolder("/ReactRoleUsersManage", "Admin");
                    option.Conventions.AuthorizeFolder("/ReactUserManager", "Admin");
                    option.Conventions.AuthorizeFolder("/ReactEmpManager", "Admin");
                });

            ;
            services.AddScoped<IExportUserData, ExportUserData>();
            services.AddHttpClient<IContactsClient, ContactsClient>(client =>
            {
                client.BaseAddress = new Uri(BaseUrls.MdmDataDistribute);
                client.Timeout = TimeSpan.FromSeconds(10);
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory, IServiceProvider serviceProvider)
        {
            app.UseHealthChecks("/health");

            app.UseForwardedHeaders(new ForwardedHeadersOptions
            {
                ForwardedHeaders = ForwardedHeaders.XForwardedFor | ForwardedHeaders.XForwardedProto
            });

            loggerFactory.AddDebug();

            if (env.IsDevelopment())
            {
                //app.UseBrowserLink();
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseDeveloperExceptionPage();
                app.UseExceptionHandler("/error");
            }
            app.UseAuthentication();
            app.UseStaticFiles();

            //hangfire
            app.UseHangfireServer(new BackgroundJobServerOptions
            {
                ServerName = _serviceContext.NodeContext.NodeName,
                Activator = new HangfireJobActivatorWithServiceProvider(serviceProvider)
            });
            app.UseHangfireDashboard("/hangfire", new DashboardOptions
            {
                Authorization = new[] { new HangfireAuthorizationFilter() }
            });
            app.UseMvcWithDefaultRoute();
        }
    }
}
