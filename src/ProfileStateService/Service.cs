using System;
using System.Collections.Generic;
using System.Fabric;
using MassTransit;
using AppsOnSF.Common.Options;
using Microsoft.ServiceFabric.Services.Communication.Runtime;
using Microsoft.ServiceFabric.Services.Runtime;
using ServiceFabricContrib;
using AutoMapper;
using Microsoft.ServiceFabric.Services.Remoting.V2.FabricTransport.Runtime;
using Serilog;
using System.Threading;
using System.Threading.Tasks;
using System.Fabric.Description;
using Microsoft.ServiceFabric.Data;
using Microsoft.ServiceFabric.Data.Collections;
using System.IO;
using CsvHelper;
using Microsoft.Diagnostics.EventFlow;
using ProfileStateService.DomainServices;
using ProfileStateService.Internal;
using static Sso.Remoting.Constants;

namespace ProfileStateService
{
    /// <summary>
    /// An instance of this class is created for each service replica by the Service Fabric runtime.
    /// </summary>
    public sealed class Service : StatefulService
    {
        public Service(StatefulServiceContext context,
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

        public static IMapper CreateMapper()
        {
            var config = new MapperConfiguration(cfg =>
            {
                cfg.AddProfile<MappingProfile>();
            });
            return config.CreateMapper();
        }

        private static IBusControl CreateBus(ServiceContext serviceContext)
        {
            var option = serviceContext.GetOption<RabbitMQOption>("RabbitMQ");

            return Bus.Factory.CreateUsingRabbitMq(cfg =>
            {
                cfg.Host(new Uri(option.HostAddress), h =>
                {
                    h.Username(option.Username);
                    h.Password(option.Password);
                });
            });
        }

        private static IBusControl CreateBus_Sso2mdm(ServiceContext serviceContext)
        {
            var option = serviceContext.GetOption<RabbitMQOption>("RabbitMQ_sso2mdm");

            return Bus.Factory.CreateUsingRabbitMq(cfg =>
            {
                cfg.Host(new Uri(option.HostAddress), h =>
                {
                    h.Username(option.Username);
                    h.Password(option.Password);
                });
            });
        }

        /// <summary>
        /// Optional override to create listeners (e.g., HTTP, Service Remoting, WCF, etc.) for this service replica to handle client or user requests.
        /// </summary>
        /// <remarks>
        /// For more information on service communication, see https://aka.ms/servicefabricservicecommunication
        /// </remarks>
        /// <returns>A collection of listeners.</returns>
        protected override IEnumerable<ServiceReplicaListener> CreateServiceReplicaListeners()
        {
            var mapper = CreateMapper();

            var bus = CreateBus(Context);
            var bus_sso2mdm = CreateBus_Sso2mdm(Context);
            var minioOption = GetMiniOption(Context);
            var userDataStorageService = new MinioUserDataStorageService(minioOption);

            return new[]
            {
                new ServiceReplicaListener((c)=>
                    new FabricTransportServiceRemotingListener(c,new UserAppService(Context,StateManager,new List<IBusControl>(){bus,bus_sso2mdm}, mapper))
                    , ListenerName_UserAppService),
                new ServiceReplicaListener((c)=>
                    new FabricTransportServiceRemotingListener(c,new UserDataAppService(Context,new UserDomainService(StateManager, Context), mapper,userDataStorageService))
                    , ListenerName_UserDataAppService),
                new ServiceReplicaListener((c)=>
                        new FabricTransportServiceRemotingListener(c,new AdOperationAppService(Context,StateManager,mapper))
                    , ListenerName_AdOperationAppService)
            };
        }

        private MinioOption GetMiniOption(StatefulServiceContext context)
        {
            var result = context?.GetOption<MinioOption>("BackupSettings.Minio");
            //if (result == null ||
            //    string.IsNullOrEmpty(result.EndPoint) ||
            //    string.IsNullOrEmpty(result.AccessKey) ||
            //    string.IsNullOrEmpty(result.SecretKey))
            //    throw new Exception("Minio配置不能够为空");
            return result;

        }

        private readonly DiagnosticPipeline _diagnosticPipeline;
    }
}
