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
    public class GetALlRolesTest : UnitTestBase
    {
        [TestMethod]
        public async Task GetAll_Correct()
        {
            var service = new SystemRoleAppService(this.CreateDbContext);
            var id = Guid.NewGuid().ToString("N");
            var role = new SystemRole()
            {
                ClientIds = "1,2,3,4",
                ID = id,
                Name = "Name"
            };
            var beforCount = (await service.GetAllRoles()).Count;
            using (var db = this.CreateDbContext())
            {
                db.SystemRoles.Add(role);
                await db.SaveChangesAsync();
            }

            var afterCount = (await service.GetAllRoles()).Count;
            Assert.AreEqual(1, afterCount - beforCount);
            using (var db = this.CreateDbContext())
            {
                db.SystemRoles.Remove(role);
                await db.SaveChangesAsync();
            }
        }
    }
}
