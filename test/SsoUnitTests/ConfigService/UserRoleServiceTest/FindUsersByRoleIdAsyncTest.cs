using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ConfigService;
using ConfigService.Entities;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace SsoUnitTests.ConfigService.UserRoleServiceTest
{
    [TestClass]
    public class FindUsersByRoleIdAsyncTest : UnitTestBase
    {
        [TestMethod]
        public async Task FindUsers_Correct()
        {
            var service = new UserRoleAppService(this.CreateDbContext);
            var userId = CreateId();
            var roleId = CreateId();
            var systemRole = new SystemRole()
            {
                ClientIds = "1,2,3",
                ID = roleId,
                Name = "Name"
            };
            var userRole = new UserRole()
            {
                RoleID = roleId,
                UserID = userId
            };
            using (var db = this.CreateDbContext())
            {
                db.SystemRoles.Add(systemRole);
                db.UserRoles.Add(userRole);
                await db.SaveChangesAsync();
            }

            var userIds = await service.FindUsersByRoleIdAsync(roleId);
            Assert.IsNotNull(userIds);
            Assert.IsTrue(userIds.Count == 1);
            Assert.IsTrue(userIds[0].UserID == userId);

            using (var db = this.CreateDbContext())
            {
                db.SystemRoles.Remove(systemRole);
                db.UserRoles.Remove(userRole);
                await db.SaveChangesAsync();
            }
        }
    }
}
