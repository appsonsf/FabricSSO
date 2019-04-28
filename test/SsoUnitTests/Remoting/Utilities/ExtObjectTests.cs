using Microsoft.VisualStudio.TestTools.UnitTesting;
using Sso.Remoting.Domains;

namespace SsoUnitTests.Remoting.Utilities
{
    [TestClass]
    public class ExtObjectTests
    {
        [TestMethod]
        public void Test_UserItem_DeepCopy()
        {
            var origin = new UserItem(null, null, "password", "cat", null, null, null, null, null, null, null);

            var clone = origin.UpdateName("dog");
            Assert.IsNotNull(clone.Id);
            Assert.AreEqual(origin.Id, clone.Id);
            Assert.IsTrue(clone.VerifyPassword("password"));
            Assert.AreNotEqual(origin.Name, clone.Name);
        }
    }
}
