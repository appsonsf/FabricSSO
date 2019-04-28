using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ConfigService;
using ConfigService.Entities;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace SsoUnitTests.ConfigService.SystemRoleServiceTest
{
    [TestClass]
    public class FindRoleByIdAsyncTest : UnitTestBase
    {
        [TestMethod]
        public async Task Find_NotEmpty_Empty()
        {
            var service = new SystemRoleAppService(this.CreateDbContext);
            var id = Guid.NewGuid().ToString("N");
            var role = new SystemRole()
            {
                ID = id,
                ClientIds = "1,3,4",
                Name = "Name"
            };
            using (var db = this.CreateDbContext())
            {
                db.SystemRoles.Add(role);
                await db.SaveChangesAsync();
            }

            var dto1 = await service.FindRoleByIdAsync(id);
            var dto2 = await service.FindRoleByIdAsync(Guid.NewGuid().ToString("N"));
            Assert.IsNotNull(dto1);
            Assert.IsNull(dto2);
            using (var db = this.CreateDbContext())
            {
                db.SystemRoles.Remove(role);
                await db.SaveChangesAsync();
            }

        }
    }
}
