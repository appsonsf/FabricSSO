using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using ConfigService;
using IdentityServer4;
using IdentityServer4.Models;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace SsoUnitTests.ConfigService
{
    [TestClass]
    public class ClientManagerServiceTests : UnitTestBase
    {
        [TestMethod]
        public async Task Create_Update_Find_Delete_ClientTest()
        {
            #region 构造实体对象

            var client = new Client
            {
                ClientId = "sso.mc",
                ClientName = "SSO Management Console Client (Don't Delete)",
                ClientSecrets =
                {
                    new Secret("Microsoft".Sha256())
                },
                RequireConsent = false,
                AllowedGrantTypes = GrantTypes.Hybrid,
                AllowedScopes =
                {
                    IdentityServerConstants.StandardScopes.OpenId,
                    IdentityServerConstants.StandardScopes.Profile,
                    "profile.ext"
                },
                RedirectUris =
                {
                    "http://localhost:7170/signin-oidc",
                    "http://localhost:10102/signin-oidc",
                },
            };

            #endregion

            var service = new ClientAppService(this.CreateDbContext);

            var createResult = await service.CreateClientsAsync(new List<Client>()
            {
                client
            });
            Assert.IsTrue(createResult > 0);

            client.ClientName = "Update_ClientName";
            var updateResult = await service.UpdateClientsAsync(new List<Client>()
            {
                client
            });
            Assert.IsTrue(updateResult > 0);

            var clientById = await service.FindClientByIdAsync(client.ClientId);
            Assert.IsTrue(clientById.ClientName == "Update_ClientName");
            Assert.IsNotNull(clientById);

            var clientByName = await service.FindClientByNameAsync(client.ClientName);
            Assert.IsTrue(clientByName.ClientName == "Update_ClientName");
            Assert.IsNotNull(clientByName);

            var clients = await service.GetAllClientAsync();
            Assert.IsNotNull(clients);
            Assert.IsTrue(clients.Any());

            var deleteResult = await service.DeleteClientsAsync(client.ClientId);
            Assert.IsTrue(deleteResult);

            clientById = await service.FindClientByIdAsync(client.ClientId);
            Assert.IsNull(clientById);
        }
    }
}
