using System;
using System.Collections.Generic;
using System.Fabric;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using AppsOnSF.Common.Options;
using Microsoft.Diagnostics.EventFlow;
using Microsoft.ServiceFabric.Services.Communication.Runtime;
using Microsoft.ServiceFabric.Services.Remoting.FabricTransport.Runtime;
using Microsoft.ServiceFabric.Services.Remoting.V2.FabricTransport.Runtime;
using Microsoft.ServiceFabric.Services.Runtime;
using ScanLoginService.Model;
using Serilog;
using ServiceFabricContrib;
using static Sso.Remoting.Constants;

namespace ScanLoginService
{
    /// <summary>
    /// 通过 Service Fabric 运行时为每个服务实例创建此类的一个实例。
    /// </summary>
    internal sealed class Service : StatelessService
    {
        private readonly DiagnosticPipeline _diagnosticPipeline;

        public Service(StatelessServiceContext context,
            DiagnosticPipeline diagnosticPipeline)
            : base(context)
        {
            _diagnosticPipeline = diagnosticPipeline;

            CreateSerilog(diagnosticPipeline);
        }

        private void CreateSerilog(DiagnosticPipeline diagnosticPipeline)
        {
            var option = Context.GetOption<DiagnosticsOption>("Diagnostics");

            Log.Logger = new LoggerConfiguration()
                          .MinimumLevel.Is(option.SerilogEventLevel)
                          .WriteTo.Debug()
                          .WriteTo.EventFlow(diagnosticPipeline)
                          .CreateLogger();
        }

        /// <summary>
        /// 可选择性地替代以创建侦听器(如 TCP、HTTP)，从而使此服务副本可以处理客户端或用户请求。
        /// </summary>
        /// <returns>侦听器集合。</returns>
        protected override IEnumerable<ServiceInstanceListener> CreateServiceInstanceListeners()
        {
            //return new ServiceInstanceListener[0];
            return new ServiceInstanceListener[] {
                new ServiceInstanceListener(context => new OwinCommunicationListener(null, new Startup(GetStartupParams(context)), context), "OwinListener"),
                new ServiceInstanceListener((c) =>
                    new FabricTransportServiceRemotingListener(c,
                        new ScanLoginNotifyAppService())
                        ,ListenerName_ScanLoginNotifyAppService)
            };
        }

        private RedisConfig GetStartupParams(ServiceContext serviceContext)
        {
            var option = serviceContext.GetOption<RedisConfig>("RedisConfig");
            return option;
        }

    }
}
