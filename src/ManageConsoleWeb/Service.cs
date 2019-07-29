using System;
using System.Collections.Generic;
using System.Fabric;
using System.IO;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using ManageConsoleWeb.HangfireJobs;
using ManageConsoleWeb.MessageConsumers;
using ManageConsoleWeb.Services;
using ManageConsoleWeb.Tools;
using MassTransit;
using MassTransit.RabbitMqTransport;
using AppsOnSF.Common.Options;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Diagnostics.EventFlow;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.ServiceFabric.Services.Communication.AspNetCore;
using Microsoft.ServiceFabric.Services.Communication.Runtime;
using Microsoft.ServiceFabric.Services.Runtime;
using OpenApiClient.MdmDataDistribute;
using Serilog;
using ServiceFabricContrib;
using Sso.Remoting;
using Sso.Remoting.Events;

namespace ManageConsoleWeb
{
    /// <summary>
    /// The FabricRuntime creates an instance of this class for each service type instance. 
    /// </summary>
    internal sealed class Service : StatelessService
    {
        private readonly DiagnosticPipeline _diagnosticPipeline;

        private readonly IMapper _mapper;
        private readonly IBusControl _bus_mdm;
        private readonly IBusControl _bus_sso2mdm;
        private readonly IBusControl _bus_sso2ad;
        private readonly IBusControl _bus;

        public Service(StatelessServiceContext context,
            DiagnosticPipeline diagnosticPipeline)
            : base(context)
        {
            _diagnosticPipeline = diagnosticPipeline;

            CreateSerilog(diagnosticPipeline);

            var config = new MapperConfiguration(cfg =>
            {
                cfg.AddProfile<MappingProfile>();
            });
            _mapper = config.CreateMapper();
            (_bus, _bus_mdm, _bus_sso2mdm, _bus_sso2ad) = BuildRabbitMqBusControl(context);
        }

        private (IBusControl, IBusControl, IBusControl, IBusControl) BuildRabbitMqBusControl(ServiceContext context)
        {
            var bus = this.CreateBus(context, "RabbitMQ");

            var mdm_bus = this.CreateBus(context, "RabbitMQ_mdm", (host, cfg) =>
            {
                cfg.ReceiveEndpoint(host, "OM.Sso.ManageConsole", c =>
                {
                    c.Consumer(() => new OrgDataEvenConsumer(UserAppServiceClient.Create()));
                });
            });

            var sso2mdm_bus = this.CreateBus(context, "RabbitMQ_sso2mdm");

            var sso2ad_bus = this.CreateBus(context, "RabbitMQ_sso2ad", (host, cfg) =>
            {
                cfg.ReceiveEndpoint(host, "OM.Sso.ManageConsole", c =>
                {
                    //c.Consumer(() => new AdOperationCompletedConsumer(UserAppServiceClient.Create()));
                });
            });

            return (bus, mdm_bus, sso2mdm_bus, sso2ad_bus);
        }

        /// <summary>
        /// Optional override to create listeners (like tcp, http) for this service instance.
        /// </summary>
        /// <returns>The collection of listeners.</returns>
        protected override IEnumerable<ServiceInstanceListener> CreateServiceInstanceListeners()
        {
            return new ServiceInstanceListener[]
            {
                new ServiceInstanceListener(_ => new MassTransitListener(_bus_mdm), "masstransit_mdm"),
                new ServiceInstanceListener(_ => new MassTransitListener(_bus_sso2ad), "masstransit_sso2ad"),
                new ServiceInstanceListener(serviceContext =>
                    new KestrelCommunicationListener(serviceContext, "ServiceEndpoint", (url, listener) =>
                    {
                        ServiceEventSource.Current.ServiceMessage(serviceContext, $"Starting Kestrel on {url}");

                        return new WebHostBuilder()
                                    .UseKestrel()
                                    .UseCommonConfiguration(serviceContext)
                                    .ConfigureServices(services =>
                                        services
                                                .AddSingleton(this._mapper)
                                                .AddSingleton(serviceContext)
                                                .AddSingleton(_diagnosticPipeline)
                                                .AddSingleton<IUserService,UserService>()
                                                .AddRabbitMqApp(this._mapper,this._bus
                                                //,this._bus_sso2mdm
                                                ,this._bus_sso2ad))
                                    .UseContentRoot(Directory.GetCurrentDirectory())
                                    .UseStartup<Startup>()
                                    .UseServiceFabricIntegration(listener, ServiceFabricIntegrationOptions.None)
                                    .UseUrls(url)
                                    .Build();
                    }),"Web")
            };
        }

        private IBusControl CreateBus(ServiceContext serviceContext, string sectionName, Action<IRabbitMqHost, IRabbitMqBusFactoryConfigurator> config = null)
        {
            var option = serviceContext.GetOption<RabbitMQOption>(sectionName);

            var bus = Bus.Factory.CreateUsingRabbitMq(cfg =>
            {
                var host = cfg.Host(new Uri(option.HostAddress), h =>
                {
                    h.Username(option.Username);
                    h.Password(option.Password);
                });
                config?.Invoke(host, cfg);
            });
            return bus;
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
    }
}
