using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ConfigService;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace SsoUnitTests.ConfigService.UserRoleServiceTest
{
    [TestClass]
    public class DeleteUsersRoleAsyncTest : UnitTestBase
    {
        [TestMethod]
        public async Task Delete_Correct()
        {
            var service = new UserRoleAppService(this.CreateDbContext);
            var roleId = CreateId();
            var userId = CreateId();
            await service.CreateUsersRoleAsync(userId, new List<string>()
            {
                roleId
            });
            var result = await service.DeleteUsersRoleAsync(userId, new List<string>()
            {
                roleId
            });
            Assert.IsTrue(result);
            using (var db = this.CreateDbContext())
            {
                var entitys = db.UserRoles.Where(u => u.UserID == userId).ToList();
                Assert.IsTrue(entitys.Count == 0);
            }
        }
    }
}
