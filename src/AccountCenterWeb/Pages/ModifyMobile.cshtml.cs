using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Text.Encodings.Web;
using System.Threading.Tasks;
using AccountCenterWeb.Extension;
using AccountCenterWeb.Model;
using Common.Utilities;
using IdentityServer4.ResponseHandling;
using AppsOnSF.Common.BaseServices;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.AspNetCore.Mvc.Routing;
using Sso.Remoting;
using Sso.Remoting.Models;
using static AccountCenterWeb.Model.ErrorMessages;

namespace AccountCenterWeb.Pages
{
    [Authorize]
    public class ModifyMobileModel : PageModel
    {
        private readonly IUserAppServiceClient _userAppServiceClient;
        private readonly ISimpleKeyValueService _simpleKeyValueService;

        public ModifyMobileModel(IUserAppServiceClient userAppServiceClient, ISimpleKeyValueService simpleKeyValueService)
        {
            _userAppServiceClient = userAppServiceClient;
            _simpleKeyValueService = simpleKeyValueService;
        }

        public async Task<IActionResult> OnPostAsync(string mobile, string code)
        {
            if (!RegexHelper.VerifyMoblie(mobile))
            {
                ModelState.AddModelError("", Mobile_RuleError);
                return Page();
            }

            if (string.IsNullOrEmpty(code))
            {
                ModelState.AddModelError("", CodeError);
            }

            var storedCode = await this._simpleKeyValueService.Get(MobileCodeContainerEnum.ModifyMobile.ToString(), mobile);
            if (storedCode != code)
            {
                ModelState.AddModelError("",CodeError);
                return Page();
            }
            var userId = HttpContext.GetUserId();
            var (user, userAppService) = await this._userAppServiceClient.FindByUserIdAsync(userId);
            await userAppService.UpdateUserAsync(user.Id, new UserItemDto()
            {
                Mobile = mobile
            });
            ServiceEventSource.Current.Message("用户:{0},原手机号码是:{1},新手机号码:{2}", user.Username, user.Mobile, mobile);
            return RedirectToPage("Success", new { title = "修改手机号码成功!", desc = string.Format("修改成功,您的新手机号码是:{0}。", mobile) });
        }
    }
}
