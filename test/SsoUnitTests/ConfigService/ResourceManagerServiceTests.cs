using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ConfigService;
using IdentityServer4.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace SsoUnitTests.ConfigService
{
    [TestClass]
    public class ResourceManagerServiceTests : UnitTestBase
    {
        [TestMethod]
        public async Task Create_Update_Find_Delete_ApiResourcesAsyncTest()
        {
            var apiName = CreateId();
            var scopeName = CreateId();
            var secret = CreateId();
            var claimTypes = CreateId();
            var api = new ApiResource(apiName, "displayName", new List<string>()
            {
                claimTypes
            });
            api.Scopes = new List<Scope>()
            {
                new Scope(scopeName,"displayName")
            };
            api.ApiSecrets = new List<Secret>()
            {
                new Secret(secret)
            };
            var service = new ResourceAppService(this.CreateDbContext);
            //Create Test
            var result1 = await service.CreateApiResourcesAsync(new List<ApiResource>()
            {
                api
            });

            //Update Test
            api.DisplayName = "DemoDisplay";
            var result2 = await service.UpdateApiResourcesAsync(new List<ApiResource>()
            {
                api
            });

            //Find Test
            var findByName = await service.FindApiResourceAsync(api.Name);
            var findByScope = await service.FindApiResourcesByScopeAsync(api.Scopes.Select(u => u.Name).ToList());

            Assert.IsNotNull(findByName);
            Assert.IsNotNull(findByScope);
            Assert.IsTrue(findByScope.Count() == 1);
            Assert.IsTrue(findByScope.First().Name == apiName);
            Assert.IsTrue(findByName.DisplayName == "DemoDisplay");
            Assert.IsTrue(result2 > 0);
            Assert.IsTrue(result1 == 4);

            //Delete Test
            var deleteResult = await service.DeleteApiResourceAsync(apiName);
            var deletedResult = await service.FindApiResourceAsync(apiName);
            Assert.IsTrue(deleteResult);
            Assert.IsNull(deletedResult);

            //using (var db = this.CreateDbContext())
            //{
            //    var entityApi = await db.ApiResources.FirstOrDefaultAsync(u => u.Name == apiName);
            //    var scope = await db.ApiScope.FirstOrDefaultAsync(u => u.Name == scopeName);
            //    var secretValue = await db.ApiSecret.FirstOrDefaultAsync(u => u.Value == secret);
            //    var claim = await db.ApiResourceClaim.FirstOrDefaultAsync(u => u.Type == claimTypes);
            //    Assert.IsTrue(entityApi.DisplayName == "DemoDisplay");
            //    Assert.IsNotNull(entityApi);
            //    Assert.IsNotNull(scope);
            //    Assert.IsNotNull(secretValue);
            //    Assert.IsNotNull(claim);
            //    db.ApiResources.Remove(entityApi);
            //    db.ApiScope.Remove(scope);
            //    db.ApiSecret.Remove(secretValue);
            //    db.ApiResourceClaim.Remove(claim);
            //    await db.SaveChangesAsync();
            //}
        }

        [TestMethod]
        public async Task Create_Update_Find_Delete_IdentityResourcesAsyncTest()
        {
            var identityName = CreateId();
            IdentityResource identity = new IdentityResource(identityName, "DisplayName", new List<string>()
            {
                "ClaimsType"
            });
            var service = new ResourceAppService(this.CreateDbContext);
            var createResult = await service.CreateIdentityResourcesAsync(new List<IdentityResource>()
            {
                identity
            });
            Assert.IsTrue(createResult > 0);
            identity.DisplayName = "Demo";
            var updateResult = await service.UpdateIdentityResourcesAsync(new List<IdentityResource>()
            {
                identity
            });
            Assert.IsTrue(updateResult > 0);

            var findbyScope = await service.FindIdentityResourcesByScopeAsync(new List<string>()
            {
                identityName
            });
            Assert.IsNotNull(findbyScope);
            Assert.IsTrue(findbyScope.Count() == 1);
            Assert.IsTrue(findbyScope.First().DisplayName == "Demo");

            var deleteResult = await service.DeleteIdentityResourceAsync(identityName);
            Assert.IsTrue(deleteResult);
        }
    }
}
