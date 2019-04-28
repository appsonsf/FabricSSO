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
    [TestClass]
    public class DeleteRoleAsyncTest : UnitTestBase
    {
        [TestMethod]
        public async Task Delete_Correct()
        {
            var service = new SystemRoleAppService(this.CreateDbContext);
            var id = Guid.NewGuid().ToString("N");
            using (var db = this.CreateDbContext())
            {
                db.SystemRoles.Add(new SystemRole()
                {
                    ClientIds = "111",
                    ID = id,
                    Name = "Name"
                });
                await db.SaveChangesAsync();
            }

            var result = await service.DeleteRoleAsync(id);
            Assert.IsTrue(result);

            using (var db = this.CreateDbContext())
            {
                var entity = await db.SystemRoles.FirstOrDefaultAsync(u => u.ID == id);
                Assert.IsNull(entity);
                
            }
        }
    }
}
