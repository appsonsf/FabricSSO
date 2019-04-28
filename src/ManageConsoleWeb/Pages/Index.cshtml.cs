using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace ManageConsoleWeb.Pages
{
    public class IndexModel : PageModel
    {
        public void OnGet()
        {
            //临时当作主页用
            // HttpContext.Response.Redirect("/ReactClientManage");
        }
    }
}
