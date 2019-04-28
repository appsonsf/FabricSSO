using Serilog;
using Sso.Remoting;
using Sso.Remoting.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using ConfigService.Entities;

namespace ConfigService
{
    public class UserRoleAppService: IUserRoleAppService
    {
        private readonly Func<ServiceDbContext> _contextFactory;

        public UserRoleAppService(
            Func<ServiceDbContext> contextFactory)
        {
            _contextFactory = contextFactory;
        }
        /// <summary>
        /// 查看单个用户的当前所有角色
        /// </summary>
        /// <param name="userid">用户SsoId</param>
        /// <returns>所有角色</returns>
        public async Task<List<RoleDto>> FindRolesByUserIdAsync(string userid)
        {
            ServiceEventSource.Current.ServiceRequestStart("FindRolesByUserIdAsync");
            using (var db = _contextFactory())
            {
                var result = new List<RoleDto>();
                try
                {
                    var query = from ur in db.UserRoles
                                where ur.UserID == userid
                                join sr in db.SystemRoles on ur.RoleID equals sr.ID
                                select new RoleDto
                                {
                                    ID = ur.RoleID,
                                    Name = sr.Name,
                                    ClientIds=sr.ClientIds
                                };
                    result.AddRange(await query.ToListAsync());
                }
                catch (Exception ex)
                {
                    ServiceEventSource.Current.ServiceRequestStop("FindRolesByUserIdAsync",ex.Message);
                    return new List<RoleDto>();
                }
                ServiceEventSource.Current.ServiceRequestStop("FindRolesByUserIdAsync");
                return result;
            }
        }

        /// <summary>
        /// 查看单个角色包含的所有用户
        /// </summary>
        /// <param name="roleid">角色ID</param>
        /// <returns>所有用户</returns>
        public async Task<List<UserIdsDto>> FindUsersByRoleIdAsync(string roleid)
        {
            using (var db = _contextFactory())
            {
                List<UserIdsDto> lists = new List<UserIdsDto>();
                try
                {
                    foreach (var _userRole in await db.UserRoles.Where(p => p.RoleID == roleid).ToListAsync())
                    {
                        lists.Add(new UserIdsDto() { UserID = _userRole.UserID});
                    }

                }
                catch (Exception ex)
                {
                    Log.Error(ex, "UserRole FindUsersByRoleIdAsync Error");
                    lists.Clear();
                }
                return lists;
            }
        }

        /// <summary>
        /// 在角色中添加一个或多个用户
        /// </summary>
        /// <param name="roleid">角色ID</param>
        /// <param name="users">用户ID列表</param>
        /// <returns></returns>
        public async Task<bool> CreateRoleUsersAsync(string roleid, List<string> users)
        {
            using (var db = _contextFactory())
            {
                try
                {
                    foreach(var user in users)
                    {
                        var _checkusrrole = await db.UserRoles.CountAsync(p => p.UserID == user && p.RoleID == roleid);
                        if (_checkusrrole <= 0)
                        {
                            var _usrrole = new UserRole() { UserID = user, RoleID = roleid };
                            db.UserRoles.Add(_usrrole);
                        }
                    }
                    return await db.SaveChangesAsync() > 0;
                }
                catch (Exception ex)
                {
                    Log.Error(ex, "UserRole CreateRoleUsersAsync Error");
                    return false;
                }
            }
        }

        /// <summary>
        /// 在角色中删除一个或多个用户
        /// </summary>
        /// <param name="roleid">角色ID</param>
        /// <param name="users">用户ID列表</param>
        /// <returns></returns>
        public async Task<bool> DeleteRoleUsersAsync(string roleid, List<string> users)
        {
            using (var db = _contextFactory())
            {
                try
                {
                    foreach (var user in users)
                    {
                        var _usrrole = new UserRole() { UserID = user, RoleID = roleid };
                        db.UserRoles.Remove(_usrrole);
                    }
                    return await db.SaveChangesAsync() > 0;
                }
                catch (Exception ex)
                {
                    Log.Error(ex, "UserRole DeleteRoleUsersAsync Error");
                    return false;
                }
            }
        }

        /// <summary>
        /// 在用户中添加一个或多个角色
        /// </summary>
        /// <param name="userid">用户ID列表</param>
        /// <param name="roles">角色ID列表</param>
        /// <returns></returns>
        public async Task<bool> CreateUsersRoleAsync(string userid, List<string> roles)
        {
            using (var db = _contextFactory())
            {
                try
                {
                    foreach (var role in roles)
                    {
                        var _checkusrrole = await db.UserRoles.CountAsync(p => p.UserID == userid && p.RoleID == role);
                        if (_checkusrrole <= 0)
                        {
                            var _usrrole = new UserRole() { UserID = userid, RoleID = role };
                            db.UserRoles.Add(_usrrole);
                        }
                    }
                    return await db.SaveChangesAsync() > 0;
                }
                catch (Exception ex)
                {
                    Log.Error(ex, "UserRole CreateUsersRoleAsync Error");
                    return false;
                }
            }
        }

        /// <summary>
        /// 在用户中删除一个或多个角色
        /// </summary>
        /// <param name="userid">用户ID列表</param>
        /// <param name="roles">角色ID列表</param>
        /// <returns></returns>
        public async Task<bool> DeleteUsersRoleAsync(string userid, List<string> roles)
        {
            using (var db = _contextFactory())
            {
                try
                {
                    foreach (var role in roles)
                    {
                        var _usrrole = new UserRole() { UserID = userid, RoleID = role };
                        db.UserRoles.Remove(_usrrole);
                    }
                    return await db.SaveChangesAsync() > 0;
                }
                catch (Exception ex)
                {
                    Log.Error(ex, "UserRole DeleteUsersRoleAsync Error");
                    return false;
                }
            }
        }
    }
}
