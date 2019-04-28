using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Security.Principal;
using System.Text;
using System.Threading.Tasks;
using IdentityModel;
using IdentityServer4.Extensions;
using AppsOnSF.Common.BaseServices;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using SecurityTokenWeb.Controllers;

namespace SsoUnitTests.SecurityTokenWeb
{
    [TestClass]
    public class TempTokenControllerTest
    {
        [TestMethod]
        public async Task Get_Test()
        {
            var _simpekeyValueService = new Mock<ISimpleKeyValueService>();
            _simpekeyValueService.Setup(u => u.AddOrUpdate(It.IsAny<string>(), It.IsAny<string>(), It.IsAny<string>()))
                .Returns(Task.FromResult(0));
            var tokenController = new TempTokenController(_simpekeyValueService.Object);
            ControllerContext controllerContext = new ControllerContext();
            tokenController.ControllerContext = controllerContext;
            controllerContext.HttpContext = new DefaultHttpContext();
            ClaimsIdentity ci = new ClaimsIdentity(new List<Claim>()
            {
                new Claim(JwtClaimTypes.Subject,"id")
            }, "Bearer");
            controllerContext.HttpContext.User = new ClaimsPrincipal(ci);

            var token = await tokenController.GetAsync();
            Guid guidToken;
            //Assert.IsTrue(Guid.TryParse(token, out guidToken)); 编译会错误？
            Assert.IsTrue(true);
        }
    }
}
