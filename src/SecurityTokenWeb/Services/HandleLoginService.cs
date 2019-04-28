using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AppsOnSF.Common.BaseServices;
using Sso.Remoting;
using Sso.Remoting.Models;

namespace SecurityTokenWeb.Services
{
    /// <summary>
    /// 处理非密码模式登录的方法
    /// </summary>
    public class HandleLoginService : IHandleLoginService
    {
        private readonly IUserAppServiceClient _userAppServiceClient;
        private readonly ISimpleKeyValueService _simpleKeyValueService;

        public HandleLoginService(IUserAppServiceClient userAppServiceClient, ISimpleKeyValueService simpleKeyValueService)
        {
            _userAppServiceClient = userAppServiceClient;
            _simpleKeyValueService = simpleKeyValueService;
        }

        /// <summary>
        /// 临时密钥登录
        /// </summary>
        /// <param name="user"></param>
        /// <param name="password"></param>
        /// <returns></returns>
        public async Task<bool> CheckTempPasswordLoginAsync(UserItemDto user, string password)
        {
            var code = await _simpleKeyValueService.CheckAndGet(StsConstants.TempPasswordContainerName,
                user.Id.ToString(), TimeSpan.FromSeconds(30)); //临时密码30秒钟有效
            if (code != password)
                return false;

            await _simpleKeyValueService.Remove(StsConstants.TempPasswordContainerName, user.Id.ToString());
            return true;
        }

        /// <summary>
        /// 手机短信登录
        /// </summary>
        /// <param name="user"></param>
        /// <param name="password"></param>
        /// <returns></returns>
        public async Task<bool> CheckMobileLoginAsync(UserItemDto user, string password)
        {
            var code = await _simpleKeyValueService.CheckAndGet(StsConstants.MobileLoginCodeContainerName,
                user.Mobile, TimeSpan.FromMinutes(5)); //短信验证码5分钟有效
            if (code != password)
                return false;

            await _simpleKeyValueService.Remove(StsConstants.MobileLoginCodeContainerName, user.Username);
            return true;
        }

        /// <summary>
        /// 普通的用户名以及密码登录
        /// </summary>
        /// <param name="user"></param>
        /// <param name="password"></param>
        /// <returns></returns>
        public async Task<bool> CheckNormalPasswordLoginAsync(UserItemDto user, IUserAppService userAppService, string password)
        {
            return await userAppService.CheckPasswordAsync(user.Id, password);
        }

        public async Task<(UserItemDto, IUserAppService)> RetrieveUserAsync(string identity)
        {
            var (user, userManager) = default((UserItemDto, IUserAppService));
            //check to use username or moblie
            if (Common.Utilities.RegexHelper.VerifyMoblie(identity))
            {
                (user, userManager) = await _userAppServiceClient.FindByMobileAsync(identity);
            }
            else
            {
                (user, userManager) = await _userAppServiceClient.FindByUserNameOrEmployeeNumberAsync(identity);
            }

            return (user, userManager);
        }
    }
}
