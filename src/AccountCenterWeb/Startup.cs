using System;
using System.Fabric;
using System.Security.Claims;
using System.Threading.Tasks;
using MassTransit;
using AppsOnSF.Common.BaseServices;
using AppsOnSF.Common.Options;
using Microsoft.AspNetCore.Authentication.OpenIdConnect;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.DataProtection;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using Microsoft.ServiceFabric.Actors;
using Microsoft.ServiceFabric.Services.Remoting.Client;
using Microsoft.ServiceFabric.Services.Remoting.V2.FabricTransport.Client;
using OM.Base.Sso.Messages;
using OpenApiClient;
using OpenApiClient.MdmDataDistribute;
using ServiceFabricContrib;
using Sso.Remoting;
using Sso.Remoting.Events;
using WebCommon;

namespace AccountCenterWeb
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
            services.AddDataProtection()
               .SetApplicationName("SsoApp-AccountCenterWeb")
               .PersistKeysToServiceFabric();
#endif
            services.AddRemotingService();
            //π‹¿ÌhttpClient
            services.AddHttpClient<IContactsClient, ContactsClient>(client =>
            {
                client.BaseAddress = new Uri(BaseUrls.MdmDataDistribute);
                client.Timeout = TimeSpan.FromSeconds(10);
            });
            var (bus, bus_option) = this.CreateBus("RabbitMQ");
            //services.AddSingleton<IAdEventSender, AdEventSender>();
            services.AddMobileCodeSender(bus, bus_option.HostAddress);

            services.AddMvc().AddRazorPagesOptions(u =>
            {
                u.Conventions.AuthorizePage("/ModifyMobile");
                u.Conventions.AuthorizePage("/ModifyPassword");
                u.Conventions.AuthorizePage("/ReName");
                u.Conventions.AddPageRoute("/Register", "/");

            });
            services.AddAntiforgery(o => o.HeaderName = "XSRF-TOKEN");

            #region  
            var idsvrOptions = Configuration.GetSection("IdSvr");
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
                    options.ClientId = "SSO_AC_Web_001";
                    options.ClientSecret = "SSOACWeb001";
                    options.ResponseType = "code id_token";
                    options.SaveTokens = true;
                    options.GetClaimsFromUserInfoEndpoint = true;
                    options.Scope.Add("openid");
                    options.Scope.Add("profile");
                    options.Scope.Add("profile.ext");
                    options.Scope.Add("phone");
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
                                    var idcardNo = context.User.GetValue("idcard_number").ToString();
                                    identity.AddClaim(new Claim(ClaimTypes.Name, userName));
                                    identity.AddClaim(new Claim("IdCardNo", idcardNo));
                                }
                                catch (Exception e)
                                {

                                }
                            }

                            return Task.FromResult(0);
                        }
                    };
                });
            #endregion

            services.Configure<GeneralOptions>(Configuration.GetSection("General"));

            var generalOptions = Configuration.GetSection("General").Get<GeneralOptions>();
            HtmlHelperExtensions.StaticFileHost = generalOptions.StaticFileSiteHost;
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
        {
            app.UseHealthChecks("/health");

            loggerFactory.AddDebug();

            if (env.IsDevelopment())
            {
                //app.UseBrowserLink();
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
            }

            app.UseAuthentication();
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
