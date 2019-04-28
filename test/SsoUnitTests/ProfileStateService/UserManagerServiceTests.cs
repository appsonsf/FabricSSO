using MassTransit;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using OM.Base.Sso.Messages;
using ProfileStateService;
using ServiceFabricContrib;
using Sso.Remoting.Domains;
using Sso.Remoting.Models;
using System;
using System.Collections.Generic;
using System.Fabric;
using System.Threading;
using System.Threading.Tasks;

namespace SsoUnitTests.ProfileStateService
{
    [TestClass]
    public class UserAppServiceTests
    {
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


        StatefulServiceContext statefulServiceContext = new StatefulServiceContext(
          new NodeContext("Node0", new NodeId(0, 1), 0, "NodeType1", "TEST.MACHINE"),
          codePackageContext,
          typeof(UserAppService).Namespace + "Type",
          new Uri("fabric:/someapp/someservice"),
          null,
          Guid.NewGuid(),
          long.MaxValue
          );

        IBusControl needToDisposeBus;

        AutoMapper.IMapper mapper = Service.CreateMapper();

        [TestCleanup]
        public void Cleanup()
        {
            needToDisposeBus?.Stop();
        }

        public class UserCreatedTestConsumer :
            IConsumer<IUserCreated>
        {
            public Task Consume(ConsumeContext<IUserCreated> context)
            {
                Assert.AreEqual("test", context.Message.Username);
                Assert.AreEqual(DateTimeOffset.UtcNow.DayOfYear, context.Message.Created.DayOfYear);
                return Task.CompletedTask;
            }
        }

        public class UserUpdatedTestConsumer :
          IConsumer<IUserUpdated>
        {
            public Task Consume(ConsumeContext<IUserUpdated> context)
            {
                Assert.IsNotNull(context.Message.Modified);
                return Task.CompletedTask;
            }
        }

        private static IBusControl CreateBus()
        {
            //var bus= Bus.Factory.CreateUsingRabbitMq(cfg =>
            //{
            //    var host = cfg.Host(new Uri("rabbitmq://localhost/"), h =>
            //    {
            //        h.Username("guest");
            //        h.Password("guest");
            //    });
            var bus = Bus.Factory.CreateUsingInMemory(cfg =>
             {
                 cfg.ReceiveEndpoint("UnitTestQueue", e =>
                 {
                     e.Consumer<UserCreatedTestConsumer>();
                     e.Consumer<UserUpdatedTestConsumer>();
                 });
             });

            bus.Start();

            return bus;
        }

        private (UserAppService target, UserItemDto dto) CreateTargetAndDto()
        {
            var stateManager = new MockReliableStateManager();

            needToDisposeBus = CreateBus();

            var target = new UserAppService(statefulServiceContext, stateManager, new List<IBusControl>() { needToDisposeBus }, mapper);

            var dto = new UserItemDto
            {
                Id = new ItemId(),
                IdCardNo = "123",
                EmployeeNumber = "123",
                Username = "test",
                Password = "abc",
                Name = "TestUser",
                Mobile = "123",
                Email = "test@mail.com",
                Avatar = "abc.png"
            };

            return (target, dto);
        }

        [TestMethod]
        public async Task Test_CreateUser_IsUsernameExisted_UpdateUser_FindById()
        {
            var (target, dto) = CreateTargetAndDto();

            var result = await target.CreateUserAsync(dto);
            Assert.IsNotNull(result);
            Assert.IsTrue(await target.IsUsernameExistedAsync(dto.Username, CancellationToken.None));
            var dtoFound = await target.FindByIdAsync(dto.Id);
            await GeneralAssertAsync(dtoFound, target);

            result = await target.UpdateUserAsync(dto.Id, new UserItemDto { Avatar = "efg.png" });
            Assert.IsNotNull(result);

            dtoFound = await target.FindByIdAsync(dto.Id);
            Assert.AreEqual("efg.png", dtoFound.Avatar);
            Assert.IsNotNull(dtoFound.Modified);
        }


        private static async Task GeneralAssertAsync(UserItemDto dtoFound, UserAppService target)
        {
            Assert.AreEqual("test", dtoFound.Username);
            Assert.AreEqual("TestUser", dtoFound.Name);
            Assert.AreEqual("abc.png", dtoFound.Avatar);
            Assert.AreEqual("test@mail.com", dtoFound.Email);
            Assert.AreEqual("123", dtoFound.IdCardNo);
            Assert.AreEqual("123", dtoFound.EmployeeNumber);
            Assert.AreEqual(true, dtoFound.IsActive);
            Assert.AreEqual("123", dtoFound.Mobile);
            Assert.IsTrue(await target.CheckPasswordAsync(dtoFound.Id, "abc"));
            Assert.AreEqual(DateTimeOffset.UtcNow.DayOfYear, dtoFound.Created.Value.DayOfYear);
        }

        [TestMethod]
        public async Task Test_CreateUser_UpdatePhone_FindById()
        {
            var (target, dto) = CreateTargetAndDto();

            var result = await target.CreateUserAsync(dto);
            Assert.IsNotNull(result);
            var dtoFound = await target.FindByIdAsync(dto.Id);
            await GeneralAssertAsync(dtoFound, target);

            result = await target.UpdatePhoneAsync("123", "456");
            Assert.IsNotNull(result);

            dtoFound = await target.FindByIdAsync(dto.Id);
            Assert.AreEqual("456", dtoFound.Mobile);
            Assert.IsNotNull(dtoFound.Modified);
        }

        [TestMethod]
        public async Task Test_CreateUser_UpdatePassword_FindById()
        {
            var (target, dto) = CreateTargetAndDto();

            var result = await target.CreateUserAsync(dto);
            Assert.IsNotNull(result);
            var dtoFound = await target.FindByIdAsync(dto.Id);
            await GeneralAssertAsync(dtoFound, target);

            result = await target.UpdatePasswordAsync("123", "xyz");
            Assert.IsNotNull(result);

            dtoFound = await target.FindByIdAsync(dto.Id);
            Assert.IsTrue(await target.CheckPasswordAsync(dtoFound.Id, "xyz"));
            Assert.IsNotNull(dtoFound.Modified);
        }

        [TestMethod]
        public void Test_CheckCreatedCriteria()
        {
            var inputs = new List<UserItem>();
            for (int i = 0; i < 12; i++)
            {
                var item = new UserItem(null, "test" + i, null, "TestUser" + i, null, null, null, null, null, null, null);
                item.SetCreated(new DateTimeOffset(2018, i + 1, 1, 1, 1, 1, TimeSpan.Zero));
                inputs.Add(item);
            }
            var result = new List<UserItem>();

            // StartCreated != null && EndCreated != null
            var query = new UserQueryInput
            {
                StartCreated = new DateTimeOffset(2018, 3, 1, 1, 1, 1, TimeSpan.Zero),
                EndCreated = new DateTimeOffset(2018, 8, 1, 1, 1, 1, TimeSpan.Zero)
            };
            result = new List<UserItem>();
            foreach (var item in inputs)
            {
                if (query.CheckCriteria(item))
                    result.Add(item);
            }
            Assert.AreEqual(6, result.Count);

            // StartCreated = null
            query = new UserQueryInput
            {
                StartCreated = null,
                EndCreated = new DateTimeOffset(2018, 8, 1, 1, 1, 1, TimeSpan.Zero)
            };
            result = new List<UserItem>();
            foreach (var item in inputs)
            {
                if (query.CheckCriteria(item))
                    result.Add(item);
            }
            Assert.AreEqual(8, result.Count);

            // EndCreated = null

            result = new List<UserItem>();
            query = new UserQueryInput
            {
                StartCreated = new DateTimeOffset(2018, 8, 1, 1, 1, 1, TimeSpan.Zero),
                EndCreated = null
            };
            foreach (var item in inputs)
            {
                if (query.CheckCriteria(item))
                    result.Add(item);
            }
            Assert.AreEqual(5, result.Count);

            // StartCreated = null and EndCreated = null
            query = new UserQueryInput
            {
                StartCreated = null,
                EndCreated = null
            };
            result = new List<UserItem>();
            foreach (var item in inputs)
            {
                if (query.CheckCriteria(item))
                    result.Add(item);
            }
            Assert.AreEqual(12, result.Count);
        }
    }
}
