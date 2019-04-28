using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ConfigService;
using Microsoft.EntityFrameworkCore;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Sso.Remoting.Models;

namespace SsoUnitTests.ConfigService.SystemRoleServiceTest
{
    [TestClass]
    public class CreateRoleAsyncTest:UnitTestBase
    {
        [TestMethod]
        public async Task CreateRoleAsync_Correct()
        {
            var service = new SystemRoleAppService(this.CreateDbContext);
            var id1 = Guid.NewGuid().ToString("N");
            var id2 = Guid.NewGuid().ToString("N");
            var role1 = new SystemRoleDto()
            {
                ClientIds = "1,2,4",
                ID = id1,
                Name = "Test"
            };
            var role2 = new SystemRoleDto()
            {
                ClientIds = "11132132132111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111",
                ID = id2,
                Name = "fdassssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss",
            };
            await service.CreateRoleAsync(role1);
            await service.CreateRoleAsync(role2);
            using (var db = this.CreateDbContext())
            {
                var temp1 = await db.SystemRoles.FirstOrDefaultAsync(u => u.ID == id1);
                var temp2 = await db.SystemRoles.FirstOrDefaultAsync(u => u.ID == id2);
                Assert.IsNotNull(temp1);
                db.SystemRoles.Remove(temp2);
                db.SystemRoles.Remove(temp1);
                await db.SaveChangesAsync();
            }
        }
    }
}
