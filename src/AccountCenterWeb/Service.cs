using System;
using System.Collections.Generic;
using System.Fabric;
using System.IO;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using AppsOnSF.Common.Options;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Diagnostics.EventFlow;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.ServiceFabric.Services.Communication.AspNetCore;
using Microsoft.ServiceFabric.Services.Communication.Runtime;
using Microsoft.ServiceFabric.Services.Runtime;
using Serilog;
using ServiceFabricContrib;

namespace AccountCenterWeb
{
    /// <summary>
    /// The FabricRuntime creates an instance of this class for each service type instance. 
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
        /// Optional override to create listeners (like tcp, http) for this service instance.
        /// </summary>
        /// <returns>The collection of listeners.</returns>
        protected override IEnumerable<ServiceInstanceListener> CreateServiceInstanceListeners()
        {
            return new ServiceInstanceListener[]
            {
                new ServiceInstanceListener(serviceContext =>
                    new KestrelCommunicationListener(serviceContext, "ServiceEndpoint", (url, listener) =>
                    {
                        ServiceEventSource.Current.ServiceMessage(serviceContext, $"Starting Kestrel on {url}");

                        return new WebHostBuilder()
                                    .UseKestrel()
                                    .UseCommonConfiguration(serviceContext)
                                    .ConfigureServices(
                                        services => services
                                            .AddSingleton<StatelessServiceContext>(serviceContext)
                                            .AddSingleton<DiagnosticPipeline>(_diagnosticPipeline))
                                    .UseContentRoot(Directory.GetCurrentDirectory())
                                    .UseStartup<Startup>()
                                    .UseServiceFabricIntegration(listener, ServiceFabricIntegrationOptions.None)
                                    .UseUrls(url)
                                    .Build();
                    }))
            };
        }
    }
}
