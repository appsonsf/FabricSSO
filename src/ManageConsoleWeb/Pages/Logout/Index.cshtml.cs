using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace ManageConsoleWeb.Pages
{
    public class LogoutIndeModel:PageModel
    {
        public void OnGet()
        {
            HttpContext.SignOutAsync("Cookies");
            HttpContext.SignOutAsync("oidc");
        }
    }
}
