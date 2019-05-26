using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AppsOnSF.Common.BaseServices;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Sso.Remoting;
using Sso.Remoting.Events;
using Sso.Remoting.Models;
using static AccountCenterWeb.Model.ErrorMessages;

namespace AccountCenterWeb.Pages
{
    public class FindUserNameModel : PageModel
    {
        private readonly IUserAppServiceClient _userAppServiceClient;

        public FindUserNameModel(IUserAppServiceClient userAppServiceClient, IMobileCodeSender mobileCodeSender)
        {
            _userAppServiceClient = userAppServiceClient;
            _mobileCodeSender = mobileCodeSender;
        }

        public bool FindByMobile = false;
        private readonly IMobileCodeSender _mobileCodeSender;

        public async Task<IActionResult> OnPostFindByIdCardNoAsync(string name, string idcardNo)
        {
            if (string.IsNullOrEmpty(idcardNo) || string.IsNullOrEmpty(name))
            {
                ModelState.AddModelError("", "姓名或者身份证号码不能够为空!");
                return Page();
            }

            idcardNo = idcardNo.Trim();
            name = name.Trim();

            var (user, _) = await this._userAppServiceClient.FindByIdCardNoAsync(idcardNo);
            if (user == null)
            {
                ModelState.AddModelError("", IdNotFound);
                return Page();
            }

            if (user.Name != name)
            {
                ModelState.AddModelError("", IDNameNotMatch);
                return Page();
            }
            ServiceEventSource.Current.Message("用户{0}找回用户名成功", name);
            return RedirectToPage("success", new { title = "找回登录名成功!", desc = string.Format("您的登录用户名是:{0} 请您牢记登录名!", user.Username) });
        }

        public async Task<IActionResult> OnPostFindByMobileCodeAsync(string mobile, string code)
        {
            FindByMobile = true;
            if (string.IsNullOrEmpty(mobile) || string.IsNullOrEmpty(code))
            {
                ModelState.AddModelError("", "手机号码或者验证码不能位空!");
                return Page();
            }

            mobile = mobile.Trim();
            code = code.Trim();

            var (user, _) = await this._userAppServiceClient.FindByMobileAsync(mobile.Trim());
            if (user == null)
            {
                ModelState.AddModelError("", UserNotFound);
                return Page();
            }

            if (!await _mobileCodeSender.CheckAsync(mobile,code))
            {
                ModelState.AddModelError("", CodeError);
                return Page();
            }
            ServiceEventSource.Current.Message("用户{0}找回用户名成功", user.Name);
            return RedirectToPage("success", new { title = "找回登录名成功!", desc = string.Format("您的登录用户名是:{0} 请您牢记登录名!", user.Username) });
        }
    }
}
