using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Common.Utilities;
using MassTransit;
using AppsOnSF.Common.BaseServices;
using Sso.Remoting;
using Sso.Remoting.Events;

namespace SecurityTokenWeb.Services
{
    public class MobileLoginCodeSender : IMobileLoginCodeSender
    {

        private readonly IUserAppServiceClient _userAppServiceClient;
        private readonly ISimpleKeyValueService _simpleKeyValueService;
        private readonly IMobileCodeSender _mobileCodeSender;

        public MobileLoginCodeSender(
            IUserAppServiceClient userAppServiceClient,
            ISimpleKeyValueService simpleKeyValueService,
            IMobileCodeSender mobileCodeSender)
        {
            _userAppServiceClient = userAppServiceClient;
            _simpleKeyValueService = simpleKeyValueService;
            _mobileCodeSender = mobileCodeSender;
        }

        /// <summary>
        /// 获取手机登录验证码
        /// </summary>
        /// <param name="mobile"></param>
        /// <returns></returns>
        public async Task<string> Send(string mobile)
        {
            if (!RegexHelper.VerifyMoblie(mobile))
            {
                return "请提供有效手机号码";
            }
            if (!await _userAppServiceClient.IsMobileExistedAsync(mobile))
            {
                return "尚未注册的手机号码";
            }
            var code = await this._mobileCodeSender.SendAsync(new[] { mobile });
#if DEBUG
            return code;
#else
            ServiceEventSource.Current.Message($"Mobile Phone Validate code Login,SMSVerificationCode send Validate successfully. phone: {mobile} Code:{code}");
            return "";
#endif 
        }
    }
}
