using Sso.Remoting.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using ServiceFabricContrib;
using System.Diagnostics;
using System.Linq;
using IdentityServer4.Models;
using Serilog;
using Sso.Remoting.ClientParam;
using Sso.Remoting.Domains;
using Sso.Remoting.Utilities;

namespace Sso.Remoting
{
    public class UserAppServiceClient : IUserAppServiceClient
    {
        private readonly IRemotingClient _remotingClient;

        public UserAppServiceClient(IRemotingClient remotingClient)
        {
            _remotingClient = remotingClient;
        }

        public async Task<(UserItemDto, IUserAppService)> FindByIdCardNoAsync(string idCardNo)
        {
            foreach (var appService in await _remotingClient.CreateAllUserAppServicesAsync())
            {
                try
                {
                    var user = await appService.FindByIdCardNoAsync(idCardNo);
                    if (user != null)
                    {
                        return (user, appService);
                    }
                }
                catch (Exception ex)
                {
                    Trace.TraceError(ex.Message);
                }

            }
            return default((UserItemDto, IUserAppService));
        }

        public async Task<(UserItemDto, IUserAppService)> FindByEmployeeNumberAsync(string employeeNumber)
        {
            foreach (var appService in await _remotingClient.CreateAllUserAppServicesAsync())
            {
                try
                {
                    var user = await appService.FindByEmployeeNumberAsync(employeeNumber);
                    if (user != null)
                    {
                        return (user, appService);
                    }
                }
                catch (Exception ex)
                {
                    Trace.TraceError(ex.Message);
                }

            }
            return default((UserItemDto, IUserAppService));
        }

        public async Task<(UserItemDto, IUserAppService)> FindByUserNameOrEmployeeNumberAsync(string userNameOrNumber)
        {
            foreach (var appService in await _remotingClient.CreateAllUserAppServicesAsync())
            {
                try
                {
                    var user = await appService.FindByUsernameOrEmployeeNumberAsync(userNameOrNumber);
                    if (user != null)
                    {
                        return (user, appService);
                    }
                }
                catch (Exception ex)
                {
                    Trace.TraceError(ex.Message);
                }

            }
            return default((UserItemDto, IUserAppService));
        }

        public async Task<(UserItemDto, IUserAppService)> FindByUsernameAsync(string username)
        {
            foreach (var appService in await _remotingClient.CreateAllUserAppServicesAsync())
            {
                try
                {
                    var user = await appService.FindByUsernameAsync(username);
                    if (user != null)
                    {
                        return (user, appService);
                    }
                }
                catch (Exception ex)
                {
                    Trace.TraceError(ex.Message);
                }

            }
            return default((UserItemDto, IUserAppService));
        }

        /// <summary>
        /// 根据用户的Id查找用户信息
        /// </summary>
        /// <param name="userId"></param>
        /// <returns></returns>
        public async Task<(UserItemDto, IUserAppService)> FindByUserIdAsync(string userId)
        {
            try
            {
                var itemId = new ItemId(new Guid(userId));
                var appService = _remotingClient.CreateUserAppService(itemId);
                var userItemDto = await appService.FindByIdAsync(itemId);
                return (userItemDto, appService);
            }
            catch (Exception e)
            {
                Trace.TraceError(e.Message);
                return default((UserItemDto, IUserAppService));
            }


        }

        public async Task<(UserItemDto, IUserAppService)> FindByMobileAsync(string mobile)
        {
            foreach (var appService in await _remotingClient.CreateAllUserAppServicesAsync())
            {
                try
                {
                    var user = await appService.FindByMobileAsync(mobile);
                    if (user != null)
                    {
                        return (user, appService);
                    }
                }
                catch (Exception ex)
                {
                    Trace.TraceError(ex.Message);
                }

            }
            return default((UserItemDto, IUserAppService));
        }

        public async Task<bool> IsUsernameExistedAsync(string username)
        {
            foreach (var appService in await _remotingClient.CreateAllUserAppServicesAsync())
            {
                if (await appService.IsUsernameExistedAsync(username)) return true;
            }
            return false;
        }

        public async Task<bool> IsMobileExistedAsync(string mobile)
        {
            foreach (var appService in await _remotingClient.CreateAllUserAppServicesAsync())
            {
                if (await appService.IsMobileExistedAsync(mobile)) return true;
            }
            return false;
        }

        public async Task<bool> IsIdCardNoExistedAsync(string idCardNo)
        {
            foreach (var appService in await _remotingClient.CreateAllUserAppServicesAsync())
            {
                if (await appService.IsIDCardNoExistedAsync(idCardNo)) return true;
            }
            return false;
        }

        public async Task<UserItemDto> CreateUserAsync(UserItemDto dto, bool byImport = false)
        {
            if (dto == null)
                throw new ArgumentNullException(nameof(dto));

            try
            {
                if (dto.Id == null) dto.Id = new ItemId();
                var appService = _remotingClient.CreateUserAppService(dto.Id);
                if (!byImport)
                    return await appService.CreateUserAsync(dto);
                return await appService.CreateUserByImportAsync(dto);
            }
            catch (Exception ex)
            {
                Trace.TraceError(ex.Message);
            }
            return null;
        }

        public async Task<UserItemDto> CheckIdentityVerify(string userName, string password)
        {
            foreach (var appService in await _remotingClient.CreateAllUserAppServicesAsync())
            {
                var dto = await appService.CheckIdentityVerify(userName, password);
                if (dto != null) return dto;
            }
            return null;
        }

        /// 修改密码
        /// </summary>
        /// <param name="oldPwd"></param>
        /// <param name="newPwd"></param>
        /// <returns></returns>
        public async Task<UserItemDto> UpdatePassword(string idCardNo, string newPwd)
        {
            foreach (var appService in await _remotingClient.CreateAllUserAppServicesAsync())
            {
                var result = await appService.UpdatePasswordAsync(idCardNo, newPwd);
                if (result != null) return result;
            }
            return null;
        }

        /// <summary>
        /// 修改电话
        /// </summary>
        /// <param name="item"></param>
        /// <returns></returns>
        public async Task<UserItemDto> UpdatePhone(string idCardNo, string phone)
        {
            foreach (var appService in await _remotingClient.CreateAllUserAppServicesAsync())
            {
                var result = await appService.UpdatePhoneAsync(idCardNo, phone);
                if (result != null) return result;
            }
            return null;
        }

        //BUG 此方法有潜在性能问题
        /// <summary>
        /// 分页获取用户
        /// </summary>
        /// <param name="qF_UserItemDto"></param>
        /// <returns></returns>
        public async Task<QueryResult<UserItemDto>> GetQueryFilterUserItemAsync(QF_UserItemDto qF_UserItemDto)
        {
            QueryResult<UserItemDto> result = new QueryResult<UserItemDto>();
            List<UserItemDto> rList = new List<UserItemDto>();
            foreach (var appService in await _remotingClient.CreateAllUserAppServicesAsync())
            {
                rList.AddRange(await appService.GetAllUserItem(new UserQueryInput()));
            }
            if (rList.Count >= 1)
            {
                result.recordsTotal = rList.Count;
                if (!string.IsNullOrEmpty(qF_UserItemDto.IdCardNo))
                {
                    rList = rList.Where(c => c.IdCardNo.Contains(c.IdCardNo)).ToList();
                }
                if (!string.IsNullOrEmpty(qF_UserItemDto.Mobile))
                {
                    rList = rList.Where(c => c.Mobile.Contains(c.Mobile)).ToList();
                }
                if (!string.IsNullOrEmpty(qF_UserItemDto.Name))
                {
                    rList = rList.Where(c => c.Name.Contains(c.Name)).ToList();
                }
                if (!string.IsNullOrEmpty(qF_UserItemDto.SortFields))
                {
                    rList = qF_UserItemDto.IsSortDesc ? rList.OrderByDescending(c => qF_UserItemDto.SortFields).ToList() : rList.OrderBy(c => qF_UserItemDto.SortFields).ToList();
                }
                rList = rList.Skip((qF_UserItemDto.PageIndex - 1) * qF_UserItemDto.PageSize).Take(qF_UserItemDto.PageSize).ToList();
                result.data = rList;
            }
            result.PageIndex = qF_UserItemDto.PageIndex;
            result.PageSize = qF_UserItemDto.PageSize;
            result.SortFields = qF_UserItemDto.SortFields;
            result.draw = qF_UserItemDto.draw;
            return result;
        }

        /// <summary>
        /// 根据查询条件获取所有的用户
        /// </summary>
        /// <returns></returns>
        public async Task<IList<UserItemDto>> GetAllUsersAsync(UserQueryParam param)
        {
            List<UserItemDto> users = new List<UserItemDto>();
            var tasks = new List<Task<List<UserItemDto>>>();
            foreach (var appService in await _remotingClient.CreateAllUserAppServicesAsync())
            {
                tasks.Add(appService.GetAllUserItem(new UserQueryInput()
                {
                    IdCardNo = param.IdCardNo,
                    Name = param.Name,
                    Username = param.UserName,
                    UserId = param.UserId
                }));
            }
            await Task.WhenAll(tasks);
            users.AddRange(tasks.SelectMany(u => u.Result));
            users.Sort(new UserItemDtoComparer());
            if (param.PageIndex.HasValue && param.PageSize.HasValue)
            {
                users = users.OrderByDescending(u => u.Created ?? default(DateTimeOffset))
                    .Skip(Math.Abs((param.PageIndex.Value - 1) * param.PageSize.Value))
                    .Take(Math.Abs(param.PageSize.Value)).ToList();
            }
            return users;
        }

        /// <summary>
        /// 获取用户数量
        /// </summary>
        /// <returns></returns>
        public async Task<long> GetUserCount()
        {
            var tasks = new List<Task<long>>();
            foreach (var appService in await _remotingClient.CreateAllUserAppServicesAsync())
            {
                tasks.Add(appService.GetUsersCountAsync());
            }
            await Task.WhenAll(tasks);
            return tasks.Sum(o => o.Result);
        }

        public async Task<(UserItemDto, IUserAppService)> UnlockUserAsync(string userId)
        {
            try
            {
                var itemId = new ItemId(new Guid(userId));
                var appService = this._remotingClient.CreateUserAppService(itemId);
                var userItemDto = await appService.UnlockUserAsync(itemId);
                return (userItemDto, appService);
            }
            catch (Exception e)
            {
                Trace.TraceError(e.Message);
                return default((UserItemDto, IUserAppService));
            }

        }

        public async Task<(UserAdEventLogDto, IAdOperationAppService)> GetUserAdEventLogAsync(ItemId Id, UserAdEventType type)
        {
            try
            {
                var appService = this._remotingClient.CreateAdOperationAppService(Id);
                var userItemDto = await appService.GetUserAdEventLogAsync(Id, type);
                return (userItemDto, appService);
            }
            catch (Exception e)
            {
                Trace.TraceError(e.Message);
                return default((UserAdEventLogDto, IAdOperationAppService));
            }
        }

        public async Task AddUserAdEventLogAsync(UserAdEventLogDto log)
        {
            if (log == null)
                throw new ArgumentNullException(nameof(log));
            if (log.UserId == null) log.UserId = new ItemId();
            var appService = _remotingClient.CreateAdOperationAppService(log.UserId);
            await appService.AddOrUpdateUserAdEventLogAsync(log);
        }

        public async Task CompleteAdEventLogAsync(ItemId Id, UserAdEventType type)
        {
            var appService = _remotingClient.CreateAdOperationAppService(Id);
            await appService.CompleteAdEventAsync(Id, type);
        }

        ///// <summary>
        ///// 修改用户信息,根据用户名查询用户进行修改，修改用户的用户名，手机号码，密码，用户的状态，身份证姓名
        ///// 用户名和身份证号码不能修改
        ///// </summary>
        ///// <param name="user">要修改的用户对象</param>
        ///// <returns></returns>
        //public async Task<bool> UpdateUserByName(UserItemDto user) { 
        //    foreach (var userManager in await GetAllUserManagersAsync())
        //    { 
        //        var userDto = userManager.FindByUsernameAsync(user.Username).Result;
        //        if (userDto != null) {
        //            userDto.IsActive = user.IsActive;
        //            userDto.Mobile = user.Mobile;
        //            userDto.PasswordHash = user.PasswordHash;
        //            userDto.Name = user.Name;
        //          return await  userManager.UpdateUserAsync(userDto);
        //        }
        //    }
        //    return false;
        //}
    }
}
