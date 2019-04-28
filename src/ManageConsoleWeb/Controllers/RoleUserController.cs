using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ManageConsoleWeb.Model;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Sso.Remoting;
using Sso.Remoting.ClientParam;
using Sso.Remoting.Models;

namespace ManageConsoleWeb.Controllers
{
    [Authorize(Policy = "Admin")]
    [Route("/api/roleuser")]
    public class RoleUserController : BaseController
    {
        private readonly IRemotingClient _remoteServiceClient;
        private readonly IUserAppServiceClient _userAppServiceClient;

        public RoleUserController(IRemotingClient remoteServiceClient, IUserAppServiceClient userAppServiceClient)
        {
            _remoteServiceClient = remoteServiceClient;
            _userAppServiceClient = userAppServiceClient;
        }

        /// <summary>
        /// 所有的角色用户信息
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public async Task<IActionResult> AllRoleUsers()
        {
            var userRoleService = this._remoteServiceClient.CreateUserRoleAppService();
            var listUsers =await this._userAppServiceClient.GetAllUsersAsync(new UserQueryParam());
            var listResult = new List<object>();
            

            foreach (var user in listUsers)
            {
                //获取用户的角色
                var roleUser = await userRoleService.FindRolesByUserIdAsync(user.Id.ToString());
                var _state = "禁用";
                if (user.IsActive.HasValue && user.IsActive.Value)
                {
                    _state = "可用";
                }
                listResult.Add(new { id = user.Id.ToString(), username = user.Username, name = user.Name, mail = user.Email, roles = roleUser, state = _state });
            }

            return Json(true, listResult, "获取角色用户信息成功");
        }

        [HttpPut]
        public async Task<IActionResult> UpdateUserRoles([FromBody] UserRemoveRolesInputDto input)
        {
            var userRoleService = this._remoteServiceClient.CreateUserRoleAppService();

            //1.先删除
            var roles = await userRoleService.FindRolesByUserIdAsync(input.UserId);
            await userRoleService.DeleteUsersRoleAsync(input.UserId, roles.Select(u => u.ID).ToList());
            var success = await userRoleService.CreateUsersRoleAsync(input.UserId, input.RoleIds);
            return Json(success, null, success ? "操作成功" : "操作失败");
        }

        [HttpDelete(template: "removeroles")]
        public async Task<IActionResult> UserRemoveRoles([FromBody] UserRemoveRolesInputDto input)
        {
            var userRoleService = this._remoteServiceClient.CreateUserRoleAppService();
            var success = await userRoleService.DeleteUsersRoleAsync(input.UserId, input.RoleIds);
            return Json(success, null, success ? "操作成功" : "操作失败");
        }
    }
}
