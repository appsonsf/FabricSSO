using ManageConsoleWeb.InitalData;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System.Linq;

namespace SsoUnitTests.ManageConsoleWeb
{
    [TestClass]
    public class ConfigurationClientsTest
    {
        [TestMethod]
        public void TestGet()
        {
            var lst = Clients.Get(true);
            Assert.IsTrue(lst.Any());
        }
    }
}
