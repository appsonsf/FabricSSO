using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ManageConsoleWeb.Model;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using ServiceFabricContrib;
using Sso.Remoting;
using Sso.Remoting.Models;

namespace ManageConsoleWeb.Pages.Roles
{

    [Authorize(Roles = "Admin")]
    [IgnoreAntiforgeryToken(Order = 10000000)]
    public class IndexModel : PageModel
    {
        private readonly IRemotingClient _remoteServiceClient;
        private readonly ISystemRoleAppService _systemRoleService;
        private readonly IUserRoleAppService _userRoleService;

        public IndexModel(IRemotingClient remoteServiceClient)
        {
            this._remoteServiceClient = remoteServiceClient;
            this._systemRoleService = remoteServiceClient.CreateSystemRoleAppService();
            this._userRoleService = remoteServiceClient.CreateUserRoleAppService();
        }

        public void OnGet()
        {

        }

        //添加角色
        public async Task<IActionResult> OnPostCreateRoleAsync([FromBody]UpdateAndAddSystemRoleDto input)
        {
            var success = false;
            if (string.IsNullOrEmpty(input?.ID) || input.ClientIds.Count == 0)
            {
                return new JsonResult(new { success = success, message = "角色代码或者客户端不能为空" });
            }

            var dto = new SystemRoleDto()
            {
                ID = input.ID,
                Name = input.Name,
                ClientIds = string.Join(",", input.ClientIds)
            };
            success = await this._systemRoleService.CreateRoleAsync(dto);
            return new JsonResult(new { success = success, message = success ? "创建成功" : "创建失败" });
        }

        //更新角色
        public async Task<IActionResult> OnPostUpdateRoleAsync([FromBody] UpdateAndAddSystemRoleDto input)
        {
            var success = false;
            if (string.IsNullOrEmpty(input?.ID) || input.ClientIds.Count == 0)
            {
                return new JsonResult(new { success = success, message = "角色代码或者客户端不能为空" });
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
            return new JsonResult(new { success = success, message = success ? "更新成功" : "更新失败" });
        }

        //删除角色
        public async Task<IActionResult> OnPostDeleteRole([FromBody] SystemRoleDto input)
        {
            var success = await this._systemRoleService.DeleteRoleAsync(input.ID);
            return new JsonResult(new { success = success, message = success ? "删除成功" : "删除失败" });
        }

        /// <summary>
        /// 获取所有的角色
        /// </summary>
        /// <returns></returns>
        public async Task<IActionResult> OnPostAllRoles()
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
            return new JsonResult(new { success = true, datas = result });
        }

        /// <summary>
        /// 获取所有的用户,要改成根据用户名搜索的形式 TODO:kangze
        /// </summary>
        /// <returns></returns>
        public async Task<IActionResult> OnPostAllUsers()
        {
            var userList = new List<UserItemDto>();
            var userManagers = await this._remoteServiceClient.CreateAllUserAppServicesAsync();
            foreach (var userManager in userManagers)
            {
                var users = await userManager.GetAllUserItem(new UserQueryInput());
                userList.AddRange(users);
            }
            var list = new List<object>();
            foreach (var user in userList)
            {
                list.Add(new { Id = user.Id, Name = user.Username + "_" + user.Mobile });
            }
            return new JsonResult(new { success = true, datas = list });
        }

        /// <summary>
        /// 角色绑定多个用户
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        public async Task<IActionResult> OnPostBindUser([FromBody]RoleBindUsersInputDto input)
        {
            var success = await this._userRoleService.CreateRoleUsersAsync(input.RoleId, input.UserIds);
            return new JsonResult(new { success, message = success ? "绑定成功" : "绑定失败" });
        }

        /// <summary>
        /// 查看一个角色下面的所有用户
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        public async Task<IActionResult> OnPostRoleUsers([FromBody] SystemRoleDto input)
        {
            if (input == null || string.IsNullOrEmpty(input.ID))
            {
                return new JsonResult(new { success = false, message = "参数错误" });
            }

            var rawRoleUsers = await this._userRoleService.FindUsersByRoleIdAsync(input.ID);
            var list = new List<object>();
            foreach (UserIdsDto rawRoleUser in rawRoleUsers)
            {
                var itemId = new ItemId(new Guid(rawRoleUser.UserID));
                //获取到那个manager
                var userManager = this._remoteServiceClient.CreateUserAppService(itemId);
                var user = await userManager.FindByIdAsync(itemId);
                if (user == null)
                    continue;
                //var roles = (await this._userRoleService.FindRolesByUserIdAsync(user.Id.ToString()))
                //    .Select(u =>
                //    {
                //        if (string.IsNullOrEmpty(u.Name))
                //            return u.ID;
                //        return u.Name;
                //    }).ToList();
                //list.Add(new { id = user.Id.ToString(), username = user.Username, name = user.Name, mail = user.Email, roles = roles, state = user.IsActive });
                var _state = "禁用";
                if (user.IsActive.HasValue && user.IsActive.Value)
                {
                    _state = "可用";
                }
                list.Add(new { id = user.Id.ToString(), username = user.Username, name = user.Name, mail = user.Email, state = _state });
            }
            return new JsonResult(new { success = true, datas = list });
        }

        /// <summary>
        /// 该角色的用户中,移除一个用户或者多个用户
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        public async Task<IActionResult> OnPostRemoveRoleUser([FromBody] RemoveRoleUserInput input)
        {
            var success = await this._userRoleService.DeleteRoleUsersAsync(input.RoleId, input.UserIds);
            return new JsonResult(new { success = success, message = "" });
        }

        public async Task<IActionResult> OnPostLoadAllUsers()
        {
            var listUsers = new List<UserItemDto>();
            var listResult = new List<object>();
            var userManagers = await this._remoteServiceClient.CreateAllUserAppServicesAsync();
            foreach (var manager in userManagers)
            {
                var users = await manager.GetAllUserItem(new UserQueryInput());
                listUsers.AddRange(users);
            }

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
            return new JsonResult(new { success = true, datas = listResult });
        }

        /// <summary>
        /// 用户移除一个或者多个角色
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        public async Task<IActionResult> OnPostUserRemoveRoles([FromBody] UserRemoveRolesInputDto input)
        {
            var success = await this._userRoleService.DeleteUsersRoleAsync(input.UserId, input.RoleIds);
            return new JsonResult(new { success = success, message = success ? "操作成功" : "操作失败" });
        }

        /// <summary>
        /// 用户更新多个角色
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        public async Task<IActionResult> OnPostUpdateUserRoles([FromBody] UserRemoveRolesInputDto input)
        {
            //1.先删除
            var roles = await this._userRoleService.FindRolesByUserIdAsync(input.UserId);
            await this._userRoleService.DeleteUsersRoleAsync(input.UserId, roles.Select(u => u.ID).ToList());

            var success = await this._userRoleService.CreateUsersRoleAsync(input.UserId, input.RoleIds);
            return new JsonResult(new { success = success, message = success ? "操作成功" : "操作失败" });
        }

    }
}