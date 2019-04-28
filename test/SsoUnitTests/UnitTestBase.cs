using System;
using System.Collections.Generic;
using System.Fabric;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using ConfigService;
using MassTransit;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.Extensions.DependencyInjection;
using ProfileStateService;
using ServiceFabricContrib;

namespace SsoUnitTests
{
    public class UnitTestBase
    {
        protected IMapper mapper;

        protected MinioOption Minioption = new MinioOption()
        {
            AccessKey = "A9D5AK5B8KJPVNHGNEZ2",
            Endpoint = "127.0.0.1:9000",
            SecretKey = "nfiCNF3R0be3w8UD9xcAZlcJq4cYp3y4eT87WO0g"
        };

        public UnitTestBase()
        {
            var config = new MapperConfiguration(cfg =>
            {
                cfg.AddProfile<MappingProfile>();
                cfg.AddProfile<global::ManageConsoleWeb.MappingProfile>();
            });
            mapper = config.CreateMapper();
        }

        private static ICodePackageActivationContext codePackageContext = new MockCodePackageActivationContext(
            "fabric:/someapp",
            "SomeAppType",
            "Code",
            "1.0.0.0",
            Guid.NewGuid().ToString(),
            @"C:\Log",
            @"C:\Temp",
            @"C:\Work",
            "ServiceManifest",
            "1.0.0.0"
        );


        protected StatefulServiceContext statefulServiceContext = new StatefulServiceContext(
            new NodeContext("Node0", new NodeId(0, 1), 0, "NodeType1", "TEST.MACHINE"),
            codePackageContext,
            typeof(UserAppService).Namespace + "Type",
            new Uri("fabric:/someapp/someservice"),
            null,
            Guid.NewGuid(),
            long.MaxValue
        );

        protected ServiceDbContext CreateDbContext()
        {
            var options = new DbContextOptionsBuilder<ServiceDbContext>()
                .UseInMemoryDatabase(databaseName: "SsosfApp2_configDb")
                .Options;
            return new ServiceDbContext(options);
        }

        protected static string CreateId()
        {
            return Guid.NewGuid().ToString("N");
        }

        protected static IBusControl CreateBus(Action<IInMemoryReceiveEndpointConfigurator> action)
        {
            var needToDisposeBus = Bus.Factory.CreateUsingInMemory(cfg =>
            {
                cfg.ReceiveEndpoint("UnitTestQueue", action);
            });
            return needToDisposeBus;
        }
    }
}
