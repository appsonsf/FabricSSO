using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Security.Principal;
using System.Text;
using System.Threading.Tasks;
using IdentityModel;
using AppsOnSF.Common.BaseServices;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using SecurityTokenWeb.Controllers;
using Sso.Remoting;

namespace SsoUnitTests.SecurityTokenWeb
{
    [TestClass]
    public class ScanLoginControllerTest
    {
        [TestMethod]
        public async Task Get_Test()
        {
            //Arrage:
            var simpleKeyService = new Mock<ISimpleKeyValueService>();
            var remotingClient = new Mock<IRemotingClient>();
            var scanLoginNotifyAppService = new Mock<IScanLoginNotifyAppService>();
            scanLoginNotifyAppService
                .Setup(u => u.NotifyAsync(It.IsAny<string>(), It.IsAny<string>(), It.IsAny<string>()))
                .ReturnsAsync(true);
            simpleKeyService.Setup(u => u.AddOrUpdate(It.IsAny<string>(), It.IsAny<string>(), It.IsAny<string>()))
                .Returns(Task.FromResult(0));
            remotingClient.Setup(u => u.CreateScanLoginNotifyAppService()).Returns(scanLoginNotifyAppService.Object);

            //Act:
            var tokenController = new ScanLoginController(simpleKeyService.Object, remotingClient.Object);
            ControllerContext controllerContext = new ControllerContext();
            tokenController.ControllerContext = controllerContext;
            controllerContext.HttpContext = new DefaultHttpContext();
            ClaimsIdentity ci = new ClaimsIdentity(new List<Claim>()
            {
                new Claim(JwtClaimTypes.Subject,"id"),
                new Claim(JwtClaimTypes.PreferredUserName,"id")
            }, "Bearer");
            controllerContext.HttpContext.User = new ClaimsPrincipal(ci);
            var result = await tokenController.GetAsync("111");


            //Assert:
            Assert.IsTrue(result is OkObjectResult);

        }
    }
}
