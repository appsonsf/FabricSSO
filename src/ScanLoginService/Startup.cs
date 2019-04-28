using Microsoft.AspNet.SignalR;
using Microsoft.Owin.Cors;
using Owin;
using Owin.HealthCheck;
using Owin.Security.AesDataProtectorProvider;
using ScanLoginService.Model;
using ScanLoginService.WebEndpoint;
using ServiceFabricContrib;
//[assembly: OwinStartup(typeof(SignalRService.Startup))]

namespace ScanLoginService
{
    public class Startup : IOwinAppBuilder
    {
        private readonly RedisConfig _startupModel;
        public Startup(RedisConfig startupModel)
        {
            _startupModel = startupModel;
        }
        public void Configuration(IAppBuilder app)
        {
            app.UseHealthCheck("/health", new HealthCheckMiddlewareConfig());

            // 有关如何配置应用程序的详细信息，请访问 https://go.microsoft.com/fwlink/?LinkID=316888
            app.UseAesDataProtectorProvider(_startupModel.EncryptionPassword);

#if !DEBUG
            var redisHost = _startupModel.Host.Split(' ')[0];
            var redis = new RedisScaleoutConfiguration(redisHost, _startupModel.EventAppName);
            GlobalHost.DependencyResolver.UseRedis(redis);
#endif

            GlobalHost.DependencyResolver.Register(typeof(QrCodeHub), () => new QrCodeHub());
            app.Map("/signalr", map =>
            {
                //ref: https://forums.asp.net/t/2033309.aspx?Calling+SignalR+hub+from+other+domain+via+CORS
                map.UseCors(CorsOptions.AllowAll);
                var hubConfiguration = new HubConfiguration()
                {
                    //EnableJSONP = true,
                    EnableDetailedErrors = true,
                    //EnableJavaScriptProxies = true
                };

                map.RunSignalR(hubConfiguration);
            });
        }
    }
}
