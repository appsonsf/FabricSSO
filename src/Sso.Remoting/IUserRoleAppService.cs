using Microsoft.ServiceFabric.Services.Remoting;
using Sso.Remoting.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Sso.Remoting
{
    public interface IUserRoleAppService : IService
    {
        /// <summary>
        /// 查看单个用户的当前所有角色
        /// </summary>
        /// <param name="userid">用户SsoId</param>
        /// <returns>所有角色</returns>
        Task<List<RoleDto>> FindRolesByUserIdAsync(string userid);
        /// <summary>
        /// 查看单个角色包含的所有用户
        /// </summary>
        /// <param name="roleid">角色ID</param>
        /// <returns>所有用户</returns>
        Task<List<UserIdsDto>> FindUsersByRoleIdAsync(string roleid);

        /// <summary>
        /// 在角色中添加一个或多个用户
        /// </summary>
        /// <param name="roleid">角色ID</param>
        /// <param name="users">用户ID列表</param>
        /// <returns></returns>
        Task<bool> CreateRoleUsersAsync(string roleid, List<string> users);

        /// <summary>
        /// 在角色中删除一个或多个用户
        /// </summary>
        /// <param name="roleid">角色ID</param>
        /// <param name="users">用户ID列表</param>
        /// <returns></returns>
        Task<bool> DeleteRoleUsersAsync(string roleid, List<string> users);

        /// <summary>
        /// 在用户中添加一个或多个角色
        /// </summary>
        /// <param name="userid">用户ID列表</param>
        /// <param name="roles">角色ID列表</param>
        /// <returns></returns>
        Task<bool> CreateUsersRoleAsync(string userid, List<string> roles);

        /// <summary>
        /// 在用户中删除一个或多个角色
        /// </summary>
        /// <param name="userid">用户ID列表</param>
        /// <param name="roles">角色ID列表</param>
        /// <returns></returns>
        Task<bool> DeleteUsersRoleAsync(string userid, List<string> roles);
    }
}
