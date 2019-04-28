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
    public class DeleteRoleUserAsyncTest : UnitTestBase
    {
        [TestMethod]
        public async Task Delete_Correct()
        {
            var service = new UserRoleAppService(this.CreateDbContext);
            var roleId = CreateId();
            var userId = CreateId();
            using (var db = this.CreateDbContext())
            {
                db.UserRoles.Add(new UserRole()
                {
                    UserID = userId,
                    RoleID = roleId
                });
                await db.SaveChangesAsync();
            }

            await service.DeleteRoleUsersAsync(roleId, new List<string>()
            {
                userId
            });

            var result = await service.FindUsersByRoleIdAsync(roleId);
            Assert.IsNotNull(result);
            Assert.IsTrue(result.Count == 0);
        }
    }
}
