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
    public class CreateUsersRoleAsyncTest : UnitTestBase
    {
        [TestMethod]
        public async Task Create_Correct()
        {
            var service = new UserRoleAppService(this.CreateDbContext);
            var roleId = CreateId();
            var userId = CreateId();
            var result = await service.CreateUsersRoleAsync(userId, new List<string>()
            {
                roleId
            });
            Assert.IsTrue(result);
            using (var db = this.CreateDbContext())
            {
                var entitys = db.UserRoles.Where(u => u.UserID == userId).ToList();
                Assert.IsTrue(entitys.Count == 1);
                db.UserRoles.RemoveRange(entitys);
                await db.SaveChangesAsync();
            }
        }
    }
}
