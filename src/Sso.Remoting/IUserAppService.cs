using Microsoft.ServiceFabric.Services.Remoting;
using OM.Base.Sso.Messages;
using ServiceFabricContrib;
using Sso.Remoting.Domains;
using Sso.Remoting.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Sso.Remoting
{


    public interface IUserAppService : IService
    {
        Task<UserItemDto> FindByIdAsync(ItemId id);

        Task<UserItemDto> FindByUsernameAsync(string userName, CancellationToken ct = default(CancellationToken));

        Task<UserItemDto> FindByUsernameOrEmployeeNumberAsync(string userNameNumber, CancellationToken ct = default(CancellationToken));

        Task<UserItemDto> FindByMobileAsync(string mobile, CancellationToken ct = default(CancellationToken));

        Task<UserItemDto> FindByIdCardNoAsync(string idCardNo, CancellationToken ct = default(CancellationToken));

        Task<UserItemDto> FindByEmployeeNumberAsync(string employeeNumber, CancellationToken ct = default(CancellationToken));

        Task<bool> DeleteByIdAsync(ItemId id);

        Task EnableOrDisableUserAsync(ItemId id, bool active);

        /// <summary>
        /// 获取用户的数量
        /// </summary>
        /// <returns></returns>
        Task<long> GetUsersCountAsync();
        
        /// <summary>
        /// 创建用户
        /// </summary>
        /// <param name="dto">用户信息</param>
        /// <returns>创建成功后的用户信息，创建失败为空</returns>
        Task<UserItemDto> CreateUserAsync(UserItemDto dto);

        Task<UserItemDto> CreateUserByImportAsync(UserItemDto dto);

        /// <summary>
        /// 输入用户名和密码进行验证
        /// </summary>
        /// <param name="userName">用户名</param>
        /// <param name="password">密码</param>
        /// <returns>验证通过的用户信息，否则为null</returns>
        Task<UserItemDto> CheckIdentityVerify(string userName, string password);

        /// <summary>
        /// 输入身份证号码和姓名进行验证
        /// </summary>
        /// <param name="idCardNo">身份证号</param>
        /// <param name="name">真实姓名</param>
        /// <returns>验证通过的用户信息，否则为null</returns>
        [Obsolete]
        Task<UserItemDto> CheckRealIdentityVerify(string idCardNo, string name);

        /// <summary>
        /// 修改电话
        /// </summary>
        /// <returns>修改成功后的最新用户信息，修改失败为空</returns>
        Task<UserItemDto> UpdatePhoneAsync(string idCardNo, string phone);

        /// <summary>
        /// 修改密码
        /// </summary>
        /// <param name="oldPwd"></param>
        /// <param name="newPwd"></param>
        /// <returns>修改成功后的用户信息，修改失败为空</returns>
        Task<UserItemDto> UpdatePasswordAsync(string idCardNo, string newPwd);

        Task<bool> IsUsernameExistedAsync(string username, CancellationToken ct = default(CancellationToken));

        /// <summary>
        /// 修改用户信息，根据dto不为空的属性进行修改
        /// </summary>
        /// <param name="itemId"></param>
        /// <param name="dto"></param>
        /// <returns>修改成功后的用户信息，修改失败为空</returns>
        Task<UserItemDto> UpdateUserAsync(ItemId itemId, UserItemDto dto);

        Task<List<UserItemDto>> GetAllUserItem(UserQueryInput input);

        Task<bool> IsMobileExistedAsync(string mobile, CancellationToken ct = default(CancellationToken));

        Task<bool> IsIDCardNoExistedAsync(string idCardNo, CancellationToken ct = default(CancellationToken));

        Task<bool> CheckPasswordAsync(ItemId itemId, string password);

        Task<UserItemDto> UnlockUserAsync(ItemId itemId);
        Task InitEmployeeMdmIdAsync(Dictionary<Guid, Guid> userIdToEmployeeMdmIdMapping);
    }
}
