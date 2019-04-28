using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using ServiceFabricContrib;
using Sso.Remoting.ClientParam;
using Sso.Remoting.Domains;
using Sso.Remoting.Models;

namespace Sso.Remoting
{
    public interface IUserAppServiceClient
    {
        Task<UserItemDto> CheckIdentityVerify(string userName, string password);
        Task<UserItemDto> CreateUserAsync(UserItemDto dto, bool byImport = false);
        Task<(UserItemDto, IUserAppService)> FindByMobileAsync(string mobile);
        Task<(UserItemDto, IUserAppService)> FindByUserIdAsync(string userId);
        Task<(UserItemDto, IUserAppService)> FindByIdCardNoAsync(string idCardNo);
        Task<(UserItemDto, IUserAppService)> FindByEmployeeNumberAsync(string employeeNumber);
        Task<(UserItemDto, IUserAppService)> FindByUserNameOrEmployeeNumberAsync(string userNameOrNumber);
        Task<(UserItemDto, IUserAppService)> FindByUsernameAsync(string username);
        [Obsolete("应该基于查询条件来得到用户列表")]
        Task<IList<UserItemDto>> GetAllUsersAsync(UserQueryParam param);
        Task<QueryResult<UserItemDto>> GetQueryFilterUserItemAsync(QF_UserItemDto qF_UserItemDto);
        Task<long> GetUserCount();
        Task<bool> IsIdCardNoExistedAsync(string idCardNo);
        Task<bool> IsMobileExistedAsync(string mobile);
        Task<bool> IsUsernameExistedAsync(string username);
        Task<UserItemDto> UpdatePassword(string idCardNo, string newPwd);
        Task<UserItemDto> UpdatePhone(string idCardNo, string phone);
        Task<(UserItemDto, IUserAppService)> UnlockUserAsync(string userId);
        Task<(UserAdEventLogDto,IAdOperationAppService)> GetUserAdEventLogAsync(ItemId Id, UserAdEventType type);
        Task AddUserAdEventLogAsync(UserAdEventLogDto log);
        Task CompleteAdEventLogAsync(ItemId Id, UserAdEventType type);
    }
}