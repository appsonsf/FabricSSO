using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ManageConsoleWeb.Model;
using ManageConsoleWeb.Tools;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ServiceFabricContrib;
using Sso.Remoting;
using Sso.Remoting.ClientParam;
using Sso.Remoting.Models;

namespace ManageConsoleWeb.Controllers
{
    [Authorize(Policy = "Admin")]
    [Route("/api/role")]
    public class RoleController : BaseController
    {
        private readonly IRemotingClient _remoteServiceClient;
        private readonly ISystemRoleAppService _systemRoleService;
        private readonly IUserRoleAppService _userRoleService;
        private readonly IUserAppServiceClient _userAppServiceClient;

        public RoleController(IRemotingClient remoteServiceClient, IUserAppServiceClient userAppServiceClient)
        {
            _remoteServiceClient = remoteServiceClient;
            _userAppServiceClient = userAppServiceClient;
            this._systemRoleService = remoteServiceClient.CreateSystemRoleAppService();
            this._userRoleService = remoteServiceClient.CreateUserRoleAppService();
        }

        /// <summary>
        /// 服务器端身份guid
        /// </summary>
        /// <returns></returns>
        [HttpPost(template: "CreateGuid")]
        public IActionResult CreateGuid()
        {
            var guid = Guid.NewGuid().ToString();
            return Json(true, guid, "");
        }

        /// <summary>
        /// 获取所有的客户端信息//TODO:将会被删除
        /// </summary>
        /// <returns></returns>
        public async Task<IActionResult> AllClients()
        {
            var manager = _remoteServiceClient.CreateClientAppService();
            var clients = await manager.GetAllClientAsync();
            var resultList = new List<Object>();
            foreach (var client in clients)
            {
                resultList.Add(new { clientId = client.ClientId, clientName = client.ClientName });
            }

            return Json(true, resultList, "");
        }

        [HttpGet]
        public async Task<IActionResult> AllRoles()
        {
            var result = new List<SystemRoleOutPutDto>();
            var clientManager = this._remoteServiceClient.CreateClientAppService();
            var allClients = await clientManager.GetAllClientAsync();
            var list = await this._systemRoleService.GetAllRoles();
            IList<string> clientIds = new List<string>();
            foreach (SystemRoleDto dto in list)
            {
                var entityClientIds = dto.ClientIds.Split(",");
                var entity = new SystemRoleOutPutDto()
                {
                    ID = dto.ID,
                    Name = dto.Name,
                    ClientIds = new List<SimpeClientInfoOutPutDot>()
                };
                foreach (var entityClientId in entityClientIds)
                {
                    var client = allClients.FirstOrDefault(u => u.ClientId == entityClientId);
                    if (client == null)
                        continue;
                    entity.ClientIds.Add(new SimpeClientInfoOutPutDot()
                    {
                        ClientId = client.ClientId,
                        ClientName = client.ClientName
                    });
                }
                result.Add(entity);
            }

            return Json(true, result, "");
        }

        [HttpDelete]
        public async Task<IActionResult> DeleteRole([FromBody] SystemRoleDto input)
        {
            var success = await this._systemRoleService.DeleteRoleAsync(input.ID);
            return Json(success, null, success ? "删除成功" : "删除失败");
        }

        /// <summary>
        /// 添加一个角色
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        [HttpPost]
        public async Task<IActionResult> AddRoleAsync([FromBody]UpdateAndAddSystemRoleDto input)
        {
            var success = false;
            string message = string.Empty;
            success = DataModelValidate.AddOrUpdateRoleValidate(input, ref message);
            if (!success)
            {
                return Json(success, null, message);
            }
            var dto = new SystemRoleDto()
            {
                ID = input.ID,
                Name = input.Name,
                ClientIds = string.Join(",", input.ClientIds)
            };
            success = await this._systemRoleService.CreateRoleAsync(dto);
            return Json(success, null, success ? "创建成功" : "创建失败");
        }
        /// <summary>
        /// 更新一个角色
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        [HttpPut]
        public async Task<IActionResult> UpdateRoleAsync([FromBody] UpdateAndAddSystemRoleDto input)
        {
            string message = string.Empty;
            bool success = DataModelValidate.AddOrUpdateRoleValidate(input, ref message);
            if (!success)
            {
                return Json(success, null, message);
            }
            var dto = new SystemRoleDto()
            {
                ID = input.ID,
                Name = input.Name,
            };
            var clientManager = this._remoteServiceClient.CreateClientAppService();
            foreach (string split in input.ClientIds)
            {
                var client = await clientManager.FindClientByIdAsync(split);
                if (client == null)
                    continue;
                dto.ClientIds += client.ClientId + ",";
            }

            dto.ClientIds = dto.ClientIds.Remove(dto.ClientIds.Length - 1, 1);
            success = await this._systemRoleService.UpdateRoleAsync(dto);
            return Json(success, null, success ? "更新成功" : "更新失败");
        }

        [HttpPost(template: "BindUser")]
        public async Task<IActionResult> BindUserAsync([FromBody] RoleBindUsersInputDto input)
        {
            var success = await this._userRoleService.CreateRoleUsersAsync(input.RoleId, input.UserIds);
            return Json(success, null, success ? "绑定成功" : "绑定失败");
        }

        [HttpGet(template: "allroleusers")]
        public async Task<IActionResult> AllRoleUsers()
        {

            var listResult = new List<object>();
            var listUsers = await this._userAppServiceClient.GetAllUsersAsync(new UserQueryParam());

            foreach (var user in listUsers)
            {
                //获取用户的角色
                var roleUser = await this._userRoleService.FindRolesByUserIdAsync(user.Id.ToString());
                var _state = "禁用";
                if (user.IsActive.HasValue && user.IsActive.Value)
                {
                    _state = "可用";
                }
                listResult.Add(new { id = user.Id.ToString(), username = user.Username, name = user.Name, mail = user.Email, roles = roleUser, state = _state });
            }
            return Json(true, listResult, "获取角色用户数据成功");
        }

        [HttpGet(template: "roleusers")]
        public async Task<IActionResult> RoleUsers(string Id)
        {
            if (Id == null || string.IsNullOrEmpty(Id))
            {
                return new JsonResult(new { success = false, message = "参数错误" });
            }

            var rawRoleUsers = await this._userRoleService.FindUsersByRoleIdAsync(Id);
            var list = new List<object>();
            foreach (UserIdsDto rawRoleUser in rawRoleUsers)
            {
                var itemId = new ItemId(new Guid(rawRoleUser.UserID));
                //获取到那个manager
                var userManager = this._remoteServiceClient.CreateUserAppService(itemId);
                var user = await userManager.FindByIdAsync(itemId);
                if (user == null)
                    continue;
                //list.Add(new { id = user.Id.ToString(), username = user.Username, name = user.Name, mail = user.Email, roles = roles, state = user.IsActive });
                var _state = "禁用";
                if (user.IsActive.HasValue && user.IsActive.Value)
                {
                    _state = "可用";
                }
                list.Add(new { id = user.Id.ToString(), username = user.Username, name = user.Name, mail = user.Email, state = _state });
            }

            return Json(true, list, "获取成功");
        }

        [HttpDelete(template: "removeroleusers")]
        public async Task<IActionResult> RemoveRoleUsers([FromBody] RemoveRoleUserInput input)
        {
            var success = await this._userRoleService.DeleteRoleUsersAsync(input.RoleId, input.UserIds);
            return Json(success, null, success ? "操作成功" : "操作失败");
        }

    }
}