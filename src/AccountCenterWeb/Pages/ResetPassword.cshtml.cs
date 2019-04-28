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

        [BindProperty]
        public ResetPasswordInputDto Input { get; set; }

        public ResetPasswordModel(IUserAppServiceClient userAppServiceClient)
        {
            _userAppServiceClient = userAppServiceClient;
        }

        public async Task<IActionResult> OnPostAsync()
        {
            if (Input == null)
                Input = new ResetPasswordInputDto() { IdCardNo = "xxxxx" };//fix这个问题暂时找不出来,本地没问题,服务器上不行
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

            if (string.IsNullOrEmpty(Input.Password1) || string.IsNullOrEmpty(Input.Password2))
            {
                ModelState.AddModelError("", ErrorMessages.PasswordMust);
                return Page();
            }

            if (Input.Password1 != Input.Password2)
            {
                ModelState.AddModelError("", ErrorMessages.PasswordMustBeEqual);
                return Page();
            }

            if (Input.Password1.Length <= 5 || Input.Password1.Length >= 19)
            {
                ModelState.AddModelError("", ErrorMessages.Password_LengthError);
                return Page();
            }

            await userAppService.UpdatePasswordAsync(user.IdCardNo, Input.Password1);
            ServiceEventSource.Current.Message("用户:{1},重置密码成功！");
            return RedirectToPage("Success", new { title = "重置密码成功!", desc = string.Format("用户:{0},重置密码成功,请您牢记新密码", user.Username) });
        }
    }
}
