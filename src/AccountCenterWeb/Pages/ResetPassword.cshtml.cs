using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AccountCenterWeb.Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Sso.Remoting;
using Sso.Remoting.Events;

namespace AccountCenterWeb.Pages
{
    public class ResetPasswordModel : PageModel
    {
        private readonly IUserAppServiceClient _userAppServiceClient;
        //private readonly IAdEventSender _adEventSender;

        [BindProperty]
        public ResetPasswordInputDto Input { get; set; }

        public ResetPasswordModel(IUserAppServiceClient userAppServiceClient
            //, IAdEventSender adEventSender
            )
        {
            _userAppServiceClient = userAppServiceClient;
            //_adEventSender = adEventSender;
        }

        public async Task<IActionResult> OnPostAsync()
        {
            if (Input == null)
                Input = new ResetPasswordInputDto() { IdCardNo = "xxxxx" };//fix这个问题暂时找不出来,本地没问题,服务器上不行
            if (!ModelState.IsValid)
                return Page();

            var (user, userAppService) = await this._userAppServiceClient.FindByIdCardNoAsync(Input.IdCardNo);
            if (user == null)
            {
                ModelState.AddModelError("", ErrorMessages.IdNotFound);
                return Page();
            }

            if (user.Name != Input.Name.Trim())
            {
                ModelState.AddModelError("", ErrorMessages.IDNameNotMatch);
                return Page();
            }

            if (user.Mobile.Trim() != Input.Mobile)
            {
                ModelState.AddModelError("", ErrorMessages.MobileNotMatch + ":" + user.Mobile);
                return Page();
            }

            if (Input.Password1 != Input.Password2)
            {
                ModelState.AddModelError("", ErrorMessages.PasswordMustBeEqual);
                return Page();
            }
            await userAppService.UpdatePasswordAsync(user.IdCardNo, Input.Password1);
            //await _adEventSender.SendUserPasswordUpdateEventAsync(user.EmployeeNumber, Input.Password1);
            ServiceEventSource.Current.Message("用户:{0},重置密码成功！", user.Username);
            return RedirectToPage("Success", new { title = "重置密码成功!", desc = string.Format("用户:{0},重置密码成功,请您牢记新密码", user.Username) });
        }
    }
}
