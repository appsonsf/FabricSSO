using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using IdentityServer4.Models;
using IdentityServer4.Quickstart.UI;
using IdentityServer4.Services;
using IdentityServer4.Stores;
using ManageConsoleWeb.Controllers;
using AppsOnSF.Common.BaseServices;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Configuration.Memory;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using ProfileStateService;
using SecurityTokenWeb.Services;
using ServiceFabricContrib;
using Sso.Remoting;
using Sso.Remoting.Models;
using Constants = AppsOnSF.Common.BaseServices.Constants;
using ControllerContext = Microsoft.AspNetCore.Mvc.ControllerContext;

namespace SsoUnitTests.SecurityTokenWeb
{
    [TestClass]
    public class AccountControllerTest : UnitTestBase
    {
        [TestMethod]
        public async Task GetLoginMobileVerificationCode_Test()
        {
            //Arrage:
            var identityServerInteractionServer = this.MockIdentityServerInteractionService();
            var clientStore = this.MockClientStore();
            var authenticationSchemeProvider = this.MockAuthenticationSchemeProvider();
            var eventService = this.MockIEventService();
            var userAppServiceClient = this.MockUserAppServiceClient();
            var mobileLoginCodeSender = this.MockMobileLoginCodeSender();
            var configuration = this.MockConfiguration();
            var LoginService = this.MockIHanleLoginService();

            var accountController = new AccountController(identityServerInteractionServer.Object, clientStore.Object,
                authenticationSchemeProvider.Object,
                eventService.Object, userAppServiceClient.Object, mobileLoginCodeSender.Object, configuration.Object, LoginService.Object);
            var result = await accountController.GetLoginMobileVerificationCode("15523318594");
            Assert.IsTrue(result is JsonResult);
            mobileLoginCodeSender.Verify(u => u.Send(It.IsAny<string>()), Times.Once);
        }

        [TestMethod]
        public async Task Get_Login_Test()
        {
            //Arrage:
            var identityServerInteractionServer = this.MockIdentityServerInteractionService();
            var clientStore = this.MockClientStore();
            var authenticationSchemeProvider = this.MockAuthenticationSchemeProvider();
            var eventService = this.MockIEventService();
            var userAppServiceClient = this.MockUserAppServiceClient();
            var mobileLoginCodeSender = this.MockMobileLoginCodeSender();
            var LoginService = this.MockIHanleLoginService();

            var source = new Dictionary<string, string>()
            {
                ["IdSvr:ScanLoginServiceUri"] = "111111"
            };
            var builder = new ConfigurationBuilder();
            builder.Sources.Add(new MemoryConfigurationSource()
            {
                InitialData = source
            });
            var config = builder.Build();

            var accountController = new AccountController(identityServerInteractionServer.Object, clientStore.Object,
                authenticationSchemeProvider.Object,
                eventService.Object, userAppServiceClient.Object, mobileLoginCodeSender.Object, config, LoginService.Object);

            var result1 = await accountController.Login(new LoginInputModel()
            {
                LoginType = LoginType.UserNamePwdLogin,
                Password = "111",
                RememberLogin = true,
                ReturnUrl = "/grant",
                Username = "111"
            }, "login");

            Assert.IsTrue(result1 is ViewResult);


        }





        //Arrage:Service
        private Mock<IIdentityServerInteractionService> MockIdentityServerInteractionService()
        {
            var service = new Mock<IIdentityServerInteractionService>();
            service.Setup(u => u.GetAuthorizationContextAsync(It.IsAny<string>()))
                .ReturnsAsync(new AuthorizationRequest());
            service.Setup(u => u.GrantConsentAsync(It.IsNotNull<AuthorizationRequest>(),
                It.IsNotNull<ConsentResponse>(), It.IsAny<string>())).Returns(Task.FromResult(0));
            return service;
        }

        private Mock<IClientStore> MockClientStore()
        {
            var server = new Mock<IClientStore>();
            return server;
        }

        private Mock<IAuthenticationSchemeProvider> MockAuthenticationSchemeProvider()
        {
            var server = new Mock<IAuthenticationSchemeProvider>();
            return server;
        }

        private Mock<IEventService> MockIEventService()
        {
            var server = new Mock<IEventService>();
            return server;
        }

        private Mock<IHandleLoginService> MockIHanleLoginService()
        {

            var service = new Mock<IHandleLoginService>();
            var serviceUserAppService = new Mock<IUserAppService>();
            serviceUserAppService.Setup(u => u.CheckPasswordAsync(It.IsAny<ItemId>(), It.IsAny<string>()))
                .ReturnsAsync(false);
            service.Setup(u => u.RetrieveUserAsync(It.IsAny<string>())).ReturnsAsync((new UserItemDto() { Id = new ItemId(Guid.NewGuid()), Username = "test" },
                serviceUserAppService.Object));
            service.Setup(u => u.CheckMobileLoginAsync(It.IsAny<UserItemDto>(), It.IsAny<string>())).ReturnsAsync(false);
            service.Setup(u => u.CheckTempPasswordLoginAsync(It.IsAny<UserItemDto>(), It.IsAny<string>())).ReturnsAsync(false);
            return service;
        }

        private Mock<ISimpleKeyValueService> MockSimpleKeyValueServer()
        {
            var server = new Mock<ISimpleKeyValueService>();
            server.Setup(u => u.CheckAndGet(It.IsNotNull<string>(), It.IsNotNull<string>(), It.IsAny<TimeSpan>()))
                .ReturnsAsync("111");
            server.Setup(u => u.Remove(It.IsNotNull<string>(), It.IsAny<string>())).ReturnsAsync("111");
            return server;
        }

        private Mock<IUserAppServiceClient> MockUserAppServiceClient()
        {
            var server = new Mock<IUserAppServiceClient>();
            var userAppServer = new Mock<IUserAppService>();
            server.Setup(u => u.IsMobileExistedAsync(It.IsAny<string>())).ReturnsAsync(true);
            userAppServer.Setup(u => u.CheckPasswordAsync(It.IsNotNull<ItemId>(), It.IsAny<string>()))
                .ReturnsAsync(true);
            server.Setup(u => u.FindByUsernameAsync(It.IsAny<string>())).ReturnsAsync(() =>
            {
                var userItemDto = new UserItemDto()
                {
                    Username = "111"
                };

                return (userItemDto, userAppServer.Object);
            });
            return server;
        }

        private Mock<IMobileLoginCodeSender> MockMobileLoginCodeSender()
        {
            var server = new Mock<IMobileLoginCodeSender>();
            server.Setup(u => u.Send(It.IsAny<string>())).ReturnsAsync("111");
            return server;
        }

        private Mock<IConfiguration> MockConfiguration()
        {
            var server = new Mock<IConfiguration>();

            return server;
        }
    }
}
