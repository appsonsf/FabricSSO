using System;
using System.Threading.Tasks;
using IdentityServer4.Extensions;
using AppsOnSF.Common.BaseServices;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SecurityTokenWeb.Extensions;

namespace SecurityTokenWeb.Controllers
{
    /// <summary>
    /// 获取临时登录密码
    /// </summary>
    [Authorize(AuthenticationSchemes = "Bearer")]
    [Produces("application/json")]
    [Route("api/TempToken")]
    public class TempTokenController : Controller
    {
        private readonly ISimpleKeyValueService _simpleKeyValueService;

        public TempTokenController(ISimpleKeyValueService simpleKeyValueService)
        {
            _simpleKeyValueService = simpleKeyValueService;
        }

        // GET: api/TempToken
        [HttpGet]
        public async Task<ActionResult<string>> GetAsync()
        {
            if (User.Identity.IsAuthenticated)
            {
                var userId = User.GetSubId();
                if (!string.IsNullOrEmpty(userId))
                {
                    var tmpPwd = Guid.NewGuid().ToString();
                    await _simpleKeyValueService.AddOrUpdate(StsConstants.TempPasswordContainerName, userId, tmpPwd);
                    return tmpPwd;
                }
                return BadRequest("userId is null");
            }
            return Unauthorized();
        }
    }
}
