using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using AccountCenterWeb.Extension;
using AccountCenterWeb.Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Sso.Remoting;
using Sso.Remoting.Events;
using Sso.Remoting.Models;
using static AccountCenterWeb.Model.ErrorMessages;

namespace AccountCenterWeb.Pages
{
    public class ReNameModel : PageModel
    {
        private readonly IUserAppServiceClient _userAppServiceClient;

        public ReNameModel(IUserAppServiceClient userAppServiceClient)
        {
            _userAppServiceClient = userAppServiceClient;
        }


        public async Task<IActionResult> OnPostAsync(string userName)
        {
            if (string.IsNullOrEmpty(userName))
            {
                ModelState.AddModelError("", "请输入新的用户名");
                return Page();
            }

            var regex = new Regex(RegisterInputDto.UserNameRegexRule);
            userName = userName.Trim();
            if (!regex.IsMatch(userName))
            {
                ModelState.AddModelError("", UserName_RuleError);
                return Page();
            }

            var (oldUser, _) = await this._userAppServiceClient.FindByUsernameAsync(userName.Trim());
            if (oldUser != null)
            {
                ModelState.AddModelError("", UsernameExisted);
                return Page();
            }

            var userId = HttpContext.GetUserId();
            var (user, service) = await this._userAppServiceClient.FindByUserIdAsync(userId);
            if (user == null)
            {
                ModelState.AddModelError("", UserNotFound);
                return Page();
            }

            await service.UpdateUserAsync(user.Id, new UserItemDto() { Id = user.Id, Username = userName });
            ServiceEventSource.Current.Message("修改用户:{0},修改用户名为{1},成功", user.Username, userName);

            return RedirectToPage("success",
                new { title = "修改用户名成功", desc = string.Format("修改用户名成功,您的新用户名是:{0}", userName) });
        }
    }
}
