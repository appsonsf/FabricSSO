using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.ServiceFabric.Actors;
using Microsoft.ServiceFabric.Actors.Client;
using ServiceFabricContrib;
using Sso.Remoting;

namespace AccountCenterWeb.Controllers
{
    public abstract class BaseController : Controller
    {

        protected IActionResult Json(bool success = false, string message = null, object data = default(object))
        {
            return Json(new { success, data, message });
        }
    }
}
