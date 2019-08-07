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
using OpenApiClient.MdmDataDistribute;
using Sso.Remoting;
using Sso.Remoting.Events;
using Sso.Remoting.Models;
using static AccountCenterWeb.Model.ErrorMessages;

namespace AccountCenterWeb.Pages
{
    public class ReNameModel : PageModel
    {
        private readonly IUserAppServiceClient _userAppServiceClient;
        //private readonly IAdEventSender _adEventSender;
        private readonly IMobileCodeSender _mobileCodeSender;

        public ReNameModel(IUserAppServiceClient userAppServiceClient
            //, IAdEventSender adEventSender
            , IMobileCodeSender mobileCodeSender)
        {
            _userAppServiceClient = userAppServiceClient;
            //_adEventSender = adEventSender;
            _mobileCodeSender = mobileCodeSender;
        }


        [BindProperty]
        public ReNameInputDto ReNameInput { get; set; }

        public async Task OnGetAsync()
        {
            var (user, _) = await this._userAppServiceClient.FindByUserIdAsync(HttpContext.GetUserId());
            if (user != null) ReNameInput = new ReNameInputDto()
            {
                Mobile = user.Mobile
            };
        }


        public async Task<IActionResult> OnPostAsync()
        {
            if (ReNameInput == null)
            {
                ModelState.AddModelError("", "请输入必要的数据");
                return Page();
            }

            if (!ModelState.IsValid) //必填
                return Page();


            var (oldUser, _) = await this._userAppServiceClient.FindByUsernameAsync(ReNameInput.UserName.Trim());
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

            if (!await this._mobileCodeSender.CheckAsync(user.Mobile, ReNameInput.Code))
            {
                ModelState.AddModelError("", CodeError);
                return Page();
            }

            await service.UpdateUserAsync(user.Id, new UserItemDto() { Id = user.Id, Username = ReNameInput.UserName.Trim() });
            //await _adEventSender.SendUserNameUpdateEventAsync(user, ReNameInput.UserName.Trim());
            ServiceEventSource.Current.Message("修改用户:{0},修改用户名为{1},成功", user.Username, ReNameInput.UserName.Trim());

            return RedirectToPage("success",
                new { title = "修改用户名成功", desc = string.Format("修改用户名成功,您的新用户名是:{0}", ReNameInput.UserName.Trim()) });
        }
    }
}
