using Microsoft.ServiceFabric.Services.Remoting;
using Sso.Remoting.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Sso.Remoting
{
    public interface ISystemRoleAppService : IService
    {
        /// <summary>
        /// 创建系统角色
        /// </summary>
        /// <param name="systemRole">系统角色Model</param>
        /// <returns></returns>
        Task<bool> CreateRoleAsync(SystemRoleDto systemRole);
        /// <summary>
        /// 更新系统角色
        /// </summary>
        /// <param name="systemRole">系统角色Model</param>
        /// <returns></returns>
        Task<bool> UpdateRoleAsync(SystemRoleDto systemRole);
        /// <summary>
        /// 删除角色
        /// </summary>
        /// <param name="id">角色ID</param>
        /// <returns></returns>
        Task<bool> DeleteRoleAsync(string id);

            /// <summary>
        /// 通过代码查找角色
        /// </summary>
        /// <param name="id">角色ID</param>
        /// <returns>系统角色Model</returns>
        Task<SystemRoleDto> FindRoleByIdAsync(string id);
        /// <summary>
        /// 获取所有角色列表
        /// </summary>
        /// <returns></returns>
        Task<List<SystemRoleDto>> GetAllRoles();

        Task<int> GetRoleCountAsync();
    }
}
