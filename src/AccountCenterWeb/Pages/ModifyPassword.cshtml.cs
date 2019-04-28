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
using Sso.Remoting;
using Sso.Remoting.Events;
using static AccountCenterWeb.Model.ErrorMessages;

namespace AccountCenterWeb.Pages
{
    [Authorize]
    public class ModifyPasswordModel : PageModel
    {
        private readonly IUserAppServiceClient _userAppServiceClient;
        public ModifyPasswordModel(IUserAppServiceClient userAppServiceClient)
        {
            _userAppServiceClient = userAppServiceClient;
        }

        public async Task<IActionResult> OnPostAsync(string password1, string password2)
        {
            if (string.IsNullOrEmpty(password1) || string.IsNullOrEmpty(password2))
            {
                ModelState.AddModelError("", PasswordMust);
                return Page();
            }

            if (password1 != password2)
            {
                ModelState.AddModelError("",PasswordMustBeEqual);
                return Page();
            }

            if (password1.Length <= 5 || password1.Length >= 19)
            {
                ModelState.AddModelError("", Password_LengthError);
                return Page();
            }

            var userId = HttpContext.GetUserId();
            var (user, userAppService) = await this._userAppServiceClient.FindByUserIdAsync(userId);
            if (user == null)
            {
                ModelState.AddModelError("", UserNotFound);
                return Page();
            }
            await userAppService.UpdatePasswordAsync(user.IdCardNo, password1);
            return RedirectToPage("Success", new { title = "修改密码成功!", desc = "修改密码成功,请您牢记新密码。" });
        }
    }
}
