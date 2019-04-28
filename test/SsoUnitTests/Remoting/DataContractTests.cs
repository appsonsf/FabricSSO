using IdentityServer4;
using IdentityServer4.Models;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Newtonsoft.Json;
using Newtonsoft.Json.Bson;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;

namespace SsoUnitTests.Remoting
{
    [TestClass]
    public class DataContractTests
    {
        [TestMethod]
        public void TestClientBson()
        {
            var lst = new List<Client>
            {
                ///////////////////////////////////////////
                // Console Client Credentials Flow Sample
                //////////////////////////////////////////
                new Client
                {
                    ClientId = "client",
                    ClientSecrets =
                    {
                        new Secret
                        {
                            Type =IdentityServerConstants.SecretTypes.SharedSecret,
                            Value="secret".Sha256()
                        }
                    },

                    AllowedGrantTypes = GrantTypes.ClientCredentials.ToList(),
                    AllowedScopes = new List<string> { "api1", "api2.read_only" }
                },
            };

            var ms = new MemoryStream();
            var serializer = new JsonSerializer();

            // serialize product to BSON
            var writer = new BsonDataWriter(ms);
            serializer.Serialize(writer, lst);
            writer.Flush();
            ms.Position = 0;

            var reader = new BsonDataReader(ms, true, DateTimeKind.Unspecified);
            var deserialized = serializer.Deserialize<List<Client>>(reader);

            Assert.IsNotNull(deserialized);
            Assert.IsTrue(deserialized.Count > 0);
            Assert.AreEqual("client", deserialized[0].ClientId);
        }
    }
}
