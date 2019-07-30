using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ManageConsoleWeb.Controllers
{
    public class HomeController : Controller
    {
        [Authorize]
        public IActionResult Index()
        {
            var userName = string.Empty;
            var name_claim = HttpContext.User.Claims.FirstOrDefault(u => u.Type == "name");
            if (name_claim != null)
                userName = name_claim.Value;
            return View("~/Pages/Index.cshtml", userName);
        }

        [Route("/Logout")]
        public async Task<IActionResult> Logout()
        {
            await HttpContext.SignOutAsync("Cookies");
            await HttpContext.SignOutAsync("oidc");
            return Content("正在登出...", "text/html; charset=utf-8");
        }
    }
}
