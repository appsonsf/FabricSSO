using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AccountCenterWeb.Extension;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Sso.Remoting;

namespace AccountCenterWeb.Controllers
{
    [Authorize]
    public class LoginController : BaseController
    {
        private readonly IUserAppServiceClient _userAppServiceClient;

        public LoginController(IUserAppServiceClient userAppServiceClient)
        {
            _userAppServiceClient = userAppServiceClient;
        }

        [Authorize]
        public async Task<IActionResult> Index()
        {
            var userId = HttpContext.GetUserId();
            var (userItemDto, _) = await this._userAppServiceClient.FindByUserIdAsync(userId);
            return View(userItemDto);
        }

        [Authorize]
        public async Task<IActionResult> Logout()
        {
            await HttpContext.SignOutAsync("Cookies");
            await HttpContext.SignOutAsync("oidc");
            return View();
        }
    }
}
