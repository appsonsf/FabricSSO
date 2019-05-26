using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AccountCenterWeb.Tools;
using Common.Utilities;
using MassTransit;
using AppsOnSF.Common.BaseServices;
using Microsoft.AspNetCore.Mvc;
using Sso.Remoting;
using Sso.Remoting.Events;

namespace AccountCenterWeb.Controllers
{
    public class MobileController : BaseController
    {
        private readonly IUserAppServiceClient _userAppServiceClient;
        private readonly IMobileCodeSender _mobileCodeSender;

        public MobileController(IUserAppServiceClient userAppServiceClient, IMobileCodeSender mobileCodeSender)
        {
            _userAppServiceClient = userAppServiceClient;
            _mobileCodeSender = mobileCodeSender;
        }

        [HttpPost]
        public async Task<IActionResult> SendCode(string mobile, CheckMobileScenario type)
        {
            if (string.IsNullOrWhiteSpace(mobile) || !RegexHelper.VerifyMoblie(mobile))
                return Json(false, "请输入正确的手机号码!");

            var (user, _) = await this._userAppServiceClient.FindByMobileAsync(mobile);

            switch (type)
            {
                case CheckMobileScenario.Register:
                case CheckMobileScenario.ModifyMobile:
                    if (user != null)
                        return Json(false, string.Format("此手机已被使用!,使用人为{0}", user.Name));
                    break;
                case CheckMobileScenario.FindUserName:
                    if (user == null)
                        return Json(false, "此手机号当前未被已注册用户所使用!");
                    break;
            }

            var code = await this._mobileCodeSender.SendAsync(new string[] { mobile });
#if DEBUG
            return Json(true, code);
#else
            return Json(true, "短信发送成功!");
#endif
        }
    }
}
