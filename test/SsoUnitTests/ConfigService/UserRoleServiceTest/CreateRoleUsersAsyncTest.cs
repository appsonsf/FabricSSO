using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ConfigService;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace SsoUnitTests.ConfigService.UserRoleServiceTest
{

    //再角色中添加一个或者多个用户
    [TestClass]
    public class CreateRoleUsersAsyncTest : UnitTestBase
    {
        [TestMethod]
        public async Task Create_Correct()
        {
            var service = new UserRoleAppService(this.CreateDbContext);
            var roleId = CreateId();
            var userId = CreateId();
            var result = await service.CreateRoleUsersAsync(roleId, new List<string>()
            {
                userId
            });
            //因为用户Id 以及 角色Id不是已经存在的
            Assert.IsTrue(result);
        }
    }
}
