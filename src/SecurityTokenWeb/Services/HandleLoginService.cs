﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AppsOnSF.Common.BaseServices;
using Sso.Remoting;
using Sso.Remoting.Events;
using Sso.Remoting.Models;
using Constants = Sso.Remoting.Constants;

namespace SecurityTokenWeb.Services
{
    /// <summary>
    /// 处理非密码模式登录的方法
    /// </summary>
    public class HandleLoginService : IHandleLoginService
    {
        private readonly IUserAppServiceClient _userAppServiceClient;
        private readonly ISimpleKeyValueService _simpleKeyValueService;
        private readonly IMobileCodeSender _mobileCodeSender;

        public HandleLoginService(IUserAppServiceClient userAppServiceClient,
            ISimpleKeyValueService simpleKeyValueService,
            IMobileCodeSender mobileLoginCodeSender
            )
        {
            this._userAppServiceClient = userAppServiceClient;
            this._simpleKeyValueService = simpleKeyValueService;
            this._mobileCodeSender = mobileLoginCodeSender;
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
            return await this._mobileCodeSender.CheckAsync(user.Mobile, password);
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
