using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ManageConsoleWeb.Controllers
{
    public class BaseController : Controller
    {
        public JsonResult Json(bool success, object data = null, string message = null)
        {
            return base.Json(new { success, data, message });
        }
    }
}
