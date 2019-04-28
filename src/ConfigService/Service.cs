using System;
using System.Collections.Generic;
using System.Fabric;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.ServiceFabric.Services.Communication.Runtime;
using Microsoft.ServiceFabric.Services.Remoting.FabricTransport.Runtime;
using Microsoft.ServiceFabric.Services.Remoting.V2.FabricTransport.Runtime;
using Microsoft.ServiceFabric.Services.Runtime;
using Serilog;
using ServiceFabricContrib;
using AppsOnSF.Common.Options;
using static Sso.Remoting.Constants;
using Microsoft.Diagnostics.EventFlow;

namespace ConfigService
{
    /// <summary>
    /// An instance of this class is created for each service instance by the Service Fabric runtime.
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

        class ConfigDbOption
        {
            public string DefaultConnection { get; set; }
        }
        ServiceDbContext CreateDbContext()
        {
            return new ServiceDbContext(Context.GetOption<ConfigDbOption>("ConnectionStrings").DefaultConnection);
        }

        /// <summary>
        /// Optional override to create listeners (e.g., TCP, HTTP) for this service replica to handle client or user requests.
        /// </summary>
        /// <returns>A collection of listeners.</returns>
        protected override IEnumerable<ServiceInstanceListener> CreateServiceInstanceListeners()
        {
            return new[]
            {
                new ServiceInstanceListener((c)=>
                    new FabricTransportServiceRemotingListener(c,
                        new ClientAppService(CreateDbContext)),
                    ListenerName_ClientAppService),
                new ServiceInstanceListener((c)=>
                    new FabricTransportServiceRemotingListener(c,
                        new PersistedGrantAppService(CreateDbContext)),
                    ListenerName_PersistedGrantAppService),
                new ServiceInstanceListener((c)=>
                    new FabricTransportServiceRemotingListener(c,
                        new ResourceAppService(CreateDbContext)),
                    ListenerName_ResourceAppService),
                new ServiceInstanceListener((c)=>
                    new FabricTransportServiceRemotingListener(c,
                        new SystemRoleAppService(CreateDbContext)),
                    ListenerName_SystemRoleAppService),
                new ServiceInstanceListener((c)=>
                    new FabricTransportServiceRemotingListener(c,
                        new UserRoleAppService(CreateDbContext)),
                    ListenerName_UserRoleAppService)
           };
        }

        protected override async Task OnOpenAsync(CancellationToken cancellationToken)
        {
            await base.OnOpenAsync(cancellationToken);

            using (var db = CreateDbContext())
            {
                await db.Database.MigrateAsync();
            }
        }
    }
}
