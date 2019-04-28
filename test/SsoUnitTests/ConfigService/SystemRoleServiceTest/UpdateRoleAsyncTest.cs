using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ConfigService;
using ConfigService.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Sso.Remoting.Models;

namespace SsoUnitTests.ConfigService.SystemRoleServiceTest
{
    public class UpdateRoleAsyncTest : UnitTestBase
    {
        [TestMethod]
        public async Task UpdateRoleAsync_Correct()
        {
            var service = new SystemRoleAppService(this.CreateDbContext);
            var id = Guid.NewGuid().ToString("N");
            var role = new SystemRole()
            {
                ClientIds = "1,2,3",
                ID = id,
                Name = "Test"
            };
            using (var db = this.CreateDbContext())
            {
                db.SystemRoles.Add(role);
                await db.SaveChangesAsync();
            }

            var result = await service.UpdateRoleAsync(new SystemRoleDto()
            {
                ClientIds = "4,5,6",
                ID = id,
                Name = "Name"
            });
            Assert.IsTrue(result);
            using (var db = this.CreateDbContext())
            {
                var entity = await db.SystemRoles.FirstOrDefaultAsync(u => u.ID == id);
                Assert.IsNotNull(entity);
                Assert.IsTrue(entity.ClientIds == "4,5,6");
                db.SystemRoles.Remove(role);
                await db.SaveChangesAsync();
            }

        }
    }
}
