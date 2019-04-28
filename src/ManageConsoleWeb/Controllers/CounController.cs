using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ManageConsoleWeb.Model;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Sso.Remoting;

namespace ManageConsoleWeb.Controllers
{
    [Route("/api/count")]
    public class CounController : BaseController
    {
        private readonly IRemotingClient _remotingClient;
        private readonly IUserAppServiceClient _userAppServiceClient;

        public CounController(
            IRemotingClient remotingClient,
            IUserAppServiceClient userAppServiceClient)
        {
            _remotingClient = remotingClient;
            _userAppServiceClient = userAppServiceClient;
        }

        /// <summary>
        /// 获取首页数据信息
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public async Task<IActionResult> CountInfo()
        {
            var clientAppService = _remotingClient.CreateClientAppService();
            var systemRoleAppService = _remotingClient.CreateSystemRoleAppService();
            var result = new CountOutDto()
            {
                ClientCount = await clientAppService.GetClientCountAsync(),
                RoleCount = await systemRoleAppService.GetRoleCountAsync(),
                UserCount = await _userAppServiceClient.GetUserCount()
            };
            return Json(true, result, "获取数据成功!");
        }
    }
}
