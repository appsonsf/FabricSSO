using Microsoft.ServiceFabric.Data.Collections;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using ProfileStateService.DomainServices;
using ServiceFabricContrib;
using Sso.Remoting.Domains;
using System;
using System.Threading.Tasks;

namespace SsoUnitTests.ProfileStateService
{
    [TestClass]
    public class UserDomainServiceTests : UnitTestBase
    {
        private Guid Id;
        private UserItem userItem;

        public UserDomainServiceTests()
        {
            Id = Guid.NewGuid();
            this.userItem = new UserItem("111", "11", "111", "111", "111", "111", "111", "111", Guid.NewGuid(), "1", Guid.NewGuid(), new ItemId(Id));
        }

        [TestMethod]
        public async Task GetAllUsersTestAsync_NotEmpty()
        {
            var mockState = await this.CreateMockStateManager();
            var userDomainService = new UserDomainService(mockState, this.statefulServiceContext);
            var result = await userDomainService.GetAllUsersAsync();
            Assert.IsNotNull(result);
            Assert.IsTrue(result.Count == 1);
            Assert.IsTrue(result[0].IdCardNo == "111");
        }

        [TestMethod]
        public async Task GetAllUsersAsyncTest_Empty()
        {
            var mockState = new MockReliableStateManager();
            var userDomainService = new UserDomainService(mockState, this.statefulServiceContext);
            var result = await userDomainService.GetAllUsersAsync();
            Assert.IsNotNull(result);
            Assert.IsTrue(result.Count == 0);
        }

        private async Task<MockReliableStateManager> CreateMockStateManager()
        {
            var mockState = new MockReliableStateManager();
            var users = await mockState.GetOrAddAsync<IReliableDictionary<ItemId, UserItem>>("Users");
            using (var tx = mockState.CreateTransaction())
            {
                await users.AddAsync(tx, this.userItem.Id, this.userItem);
                await tx.CommitAsync();
            }

            return mockState;
        }
    }
}
