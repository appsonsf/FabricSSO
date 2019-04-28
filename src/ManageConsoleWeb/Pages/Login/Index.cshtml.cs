using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace ManageConsoleWeb.Pages.Login
{
    [Authorize]
    public class IndexModel:PageModel
    {
        public void OnGet()
        {
            //返回首页
            this.HttpContext.Response.Redirect("/");
        }
    }
}
