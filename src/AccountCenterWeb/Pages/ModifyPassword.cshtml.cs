using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AccountCenterWeb.Extension;
using AccountCenterWeb.Model;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using OpenApiClient.MdmDataDistribute;
using Sso.Remoting;
using Sso.Remoting.Events;
using static AccountCenterWeb.Model.ErrorMessages;

namespace AccountCenterWeb.Pages
{
    [Authorize]
    public class ModifyPasswordModel : PageModel
    {
        Sso.Remoting.Events.IMobileCodeSender a;
        private readonly IUserAppServiceClient _userAppServiceClient;
        //private readonly IAdEventSender _adEventSender;
        private readonly IMobileCodeSender _mobileCodeSender;

        public ModifyPasswordModel(IUserAppServiceClient userAppServiceClient
            //, IAdEventSender adEventSender
            ,IMobileCodeSender mobileCodeSender)
        {
            _userAppServiceClient = userAppServiceClient;
            //_adEventSender = adEventSender;
            _mobileCodeSender = mobileCodeSender;
        }

        [BindProperty]
        public ModifyPasswordInputDto ModifyPasswordInput { get; set; }

        public async Task OnGetAsync()
        {
            var (user, _) = await this._userAppServiceClient.FindByUserIdAsync(HttpContext.GetUserId());
            if (user != null) ModifyPasswordInput = new ModifyPasswordInputDto()
            {
                Mobile = user.Mobile
            };
        }

        public async Task<IActionResult> OnPostAsync()
        {
            if (string.IsNullOrEmpty(ModifyPasswordInput.Password) || string.IsNullOrEmpty(ModifyPasswordInput.RePassword))
            {
                ModelState.AddModelError("", PasswordMust);
                return Page();
            }

            if (ModifyPasswordInput.Password != ModifyPasswordInput.RePassword)
            {
                ModelState.AddModelError("", PasswordMustBeEqual);
                return Page();
            }

            var userId = HttpContext.GetUserId();
            var (user, userAppService) = await this._userAppServiceClient.FindByUserIdAsync(userId);
            if (user == null)
            {
                ModelState.AddModelError("", UserNotFound);
                return Page();
            }

            if (!await this._mobileCodeSender.CheckAsync(user.Mobile, ModifyPasswordInput.Code))
            {
                ModelState.AddModelError("", CodeError);
                return Page();
            }
            await userAppService.UpdatePasswordAsync(user.IdCardNo, ModifyPasswordInput.Password);
            //await _adEventSender.SendUserPasswordUpdateEventAsync(user.EmployeeNumber, ModifyPasswordInput.Password);
            return RedirectToPage("Success", new { title = "修改密码成功!", desc = "修改密码成功,请您牢记新密码。" });
        }
    }
}
