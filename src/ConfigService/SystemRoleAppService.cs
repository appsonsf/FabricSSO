using ConfigService.Entities;
using Microsoft.EntityFrameworkCore;
using Serilog;
using Sso.Remoting;
using Sso.Remoting.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace ConfigService
{
    public class SystemRoleAppService : ISystemRoleAppService
    {
        private readonly Func<ServiceDbContext> _contextFactory;

        public SystemRoleAppService(
            Func<ServiceDbContext> contextFactory)
        {
            _contextFactory = contextFactory;
        }
        /// <summary>
        /// 创建系统角色
        /// </summary>
        /// <param name="srDto">系统角色Model</param>
        /// <returns></returns>
        public async Task<bool> CreateRoleAsync(SystemRoleDto srDto)
        {
            using (var db = _contextFactory())
            {
                try
                {
                    var role = new SystemRole() { ID = srDto.ID, ClientIds = srDto.ClientIds, Name = srDto.Name };
                    db.SystemRoles.Add(role);
                    return await db.SaveChangesAsync() > 0;
                }
                catch (Exception ex)
                {
                    Log.Error(ex, "SystemRole CreateRoleAsync Error");
                    return false;
                }
            }
        }
        /// <summary>
        /// 更新系统角色
        /// </summary>
        /// <param name="srDto">系统角色Model</param>
        /// <returns></returns>
        public async Task<bool> UpdateRoleAsync(SystemRoleDto srDto)
        {
            using (var db = _contextFactory())
            {
                try
                {
                    var entity = await db.SystemRoles.FirstOrDefaultAsync(p => p.ID == srDto.ID);
                    if (entity == null)
                    {
                        return false;
                    }
                    entity.Name = srDto.Name;
                    entity.ClientIds = srDto.ClientIds;
                    db.SystemRoles.Update(entity);
                    return await db.SaveChangesAsync() > 0;
                }
                catch (Exception ex)
                {
                    Log.Error(ex, "SystemRole UpdateRoleAsync Error");
                    return false;
                }
            }
        }
        /// <summary>
        /// 删除角色
        /// </summary>
        /// <param name="id">角色ID</param>
        /// <returns></returns>
        public async Task<bool> DeleteRoleAsync(string id)
        {
            using (var db = _contextFactory())
            {
                //step1,角色是否有用户
                var userRoleCount = await db.UserRoles.CountAsync(p => p.RoleID == id);
                if (userRoleCount > 0)
                    return false;
                //step2,删除角色
                var role = await db.SystemRoles.FirstOrDefaultAsync(p => p.ID == id);

                db.SystemRoles.Remove(role);

                try
                {
                    return await db.SaveChangesAsync() > 0;
                }
                catch (Exception ex)
                {
                    Log.Error(ex, "SystemRole DeleteRoleAsync Error");
                    return false;
                }
            }
        }
        /// <summary>
        /// 通过代码查找角色
        /// </summary>
        /// <param name="id">角色ID</param>
        /// <returns>系统角色Model</returns>
        public async Task<SystemRoleDto> FindRoleByIdAsync(string id)
        {
            using (var db = _contextFactory())
            {
                try
                {
                    var entity = await db.SystemRoles.FirstOrDefaultAsync(p => p.ID == id);
                    if (entity == null)
                    {
                        return null;
                    }
                    var role = new SystemRoleDto() { ID = entity.ID, ClientIds = entity.ClientIds, Name = entity.Name };
                    return role;
                }
                catch (Exception ex)
                {
                    Log.Error(ex, "SystemRole FindRoleByIdAsync Error");
                    return null;
                }
            }
        }
        /// <summary>
        /// 获取所有角色列表
        /// </summary>
        /// <returns></returns>
        public async Task<List<SystemRoleDto>> GetAllRoles()
        {
            List<SystemRoleDto> lists = new List<SystemRoleDto>();
            using (var db = _contextFactory())
            {
                var roles = await db.SystemRoles.ToListAsync();
                foreach (var role in roles)
                {
                    lists.Add(new SystemRoleDto() { ID = role.ID, ClientIds = role.ClientIds, Name = role.Name });
                }
                return lists;
            }
        }

        public async Task<int> GetRoleCountAsync()
        {
            using (var db = _contextFactory())
            {
                return await db.SystemRoles.CountAsync();
            }
        }
    }
}
