using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using ProfileStateService;
using ProfileStateService.Internal;
using ServiceFabricContrib;
using Sso.Remoting.Domains;
using Sso.Remoting.Domains.Services;
using Sso.Remoting.Models;
using System;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;

namespace SsoUnitTests.ProfileStateService
{
    [TestClass]
    public class UserDataManagerTests : UnitTestBase
    {
        private Guid Id = Guid.NewGuid();

        [TestMethod]
        public async Task ExportUserDataAsyncTest_Correct()
        {
            var timestamp = DateTime.Now.ToString("yyyy-MM-dd-HH-mm-ss");
            var mockUserDomain = this.CreateDomainService();
            var mockUserDataStorage = this.CreateUserDataStorageService();
            var service = new UserDataAppService(statefulServiceContext, mockUserDomain.Object, this.mapper,
                mockUserDataStorage.Object);
            await service.ExportUserDataAsync(timestamp);
            mockUserDomain.Verify(u => u.GetAllUsersAsync(), Times.Once);

            //TODO:It Is 下面Expression表达式还可以展现的更为详细一些
            mockUserDataStorage.Verify(u => u.SaveUserDataAsync(It.Is<UserDataFileDto>(x => x != null), It.IsNotNull<Stream>()), Times.Once);

        }

        private Mock<IUserDataStorageService> CreateUserDataStorageService()
        {
            var result = new Mock<IUserDataStorageService>();
            result.Setup(u => u.SaveUserDataAsync(It.IsNotNull<UserDataFileDto>(), It.IsNotNull<Stream>())).Returns(Task.FromResult(0));
            return result;
        }


        //Mock 因为这个接口之前已经测试过了,没必要再来测试一遍
        private Mock<IUserDomainService> CreateDomainService()
        {
            var result = new Mock<IUserDomainService>();
            result.Setup(u => u.GetAllUsersAsync()).ReturnsAsync(new List<UserItem>()
            {
                new UserItem("1234", "1234", "1234", "1234", "1234", "1234", "1234","1234",Guid.Empty, "11",Guid.Empty, new ItemId(Id))
            });
            return result;
        }
    }
}
