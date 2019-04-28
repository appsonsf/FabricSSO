using IdentityModel;
using AppsOnSF.Common.BaseServices;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SecurityTokenWeb.Extensions;
using Sso.Remoting;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace SecurityTokenWeb.Controllers
{
    [Authorize(AuthenticationSchemes = "Bearer")]
    [Produces("application/json")]
    [Route("api/ScanLogin")]
    public class ScanLoginController : Controller
    {
        private readonly ISimpleKeyValueService _simpleKeyValueService;
        private readonly IRemotingClient _remotingClient;

        public ScanLoginController(ISimpleKeyValueService simpleKeyValueService,
            IRemotingClient remotingClient)
        {
            _simpleKeyValueService = simpleKeyValueService;
            _remotingClient = remotingClient;
        }

        [HttpGet]
        public async Task<IActionResult> GetAsync([Required]string connectionId)
        {
            if (!ModelState.IsValid) return BadRequest("connectionId is null");

            if (User.Identity.IsAuthenticated)
            {
                var userId = User.GetSubId();
                var userName = User.GetUserName();
                if (!string.IsNullOrEmpty(userId) && !string.IsNullOrEmpty(userName))
                {
                    var tmpPwd = Guid.NewGuid().ToString();
                    await _simpleKeyValueService.AddOrUpdate(StsConstants.TempPasswordContainerName, userId, tmpPwd);
                    var notifyAppService = _remotingClient.CreateScanLoginNotifyAppService();
                    await notifyAppService.NotifyAsync(connectionId, userName, tmpPwd);
                    return Ok(userName);
                }
                return BadRequest("userId or userName is null");
            }
            return Unauthorized();
        }
    }
}
