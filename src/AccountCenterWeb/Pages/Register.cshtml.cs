using AccountCenterWeb.Model;
using AppsOnSF.Common.BaseServices;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using OpenApiClient.MdmDataDistribute;
using Sso.Remoting;
using Sso.Remoting.Events;
using Sso.Remoting.Models;
using System;
using System.Threading.Tasks;

namespace AccountCenterWeb.Pages
{
    public class RegisterModel : PageModel
    {
        private readonly IUserAppServiceClient _userAppServiceClient;
        private readonly IMobileCodeSender _mobileCodeSender;
        private readonly IContactsClient _contactService;


        public RegisterModel(
            IUserAppServiceClient userAppServiceClient,
            IMobileCodeSender mobileCodeSender,
            IContactsClient contactService)
        {
            _userAppServiceClient = userAppServiceClient;
            _mobileCodeSender = mobileCodeSender;
            _contactService = contactService;
        }

        [BindProperty]
        public RegisterInputDto RegisteInput { get; set; }

        public async Task<IActionResult> OnPostAsync()
        {
            if (RegisteInput == null)
            {
                ModelState.AddModelError("", "请输入必要的数据");
                return Page();
            }

            if (!ModelState.IsValid) //必填
                return Page();

            if (RegisteInput.Password1 != RegisteInput.Password2)
            {
                ModelState.AddModelError("", ErrorMessages.PasswordMustBeEqual);
                return Page();
            }

            //企业通讯录服务
            ContactInfo contactInfo = null;
            try
            {
                contactInfo = await this._contactService.GetByIdCardNoAsync(RegisteInput.IdCardNo.Trim());
            }
            catch (Exception e)
            {
                ServiceEventSource.Current.Message("调用Mdm服务异常,Message:{0}", e.ToString());
            }
            if (contactInfo == null)
            {
                ModelState.AddModelError("", ErrorMessages.IdNotFound);
                return Page();
            }
            if (contactInfo.Name != RegisteInput.Name.Trim())
            {
                ModelState.AddModelError("", ErrorMessages.IDNameNotMatch);
                return Page();
            }

            if (!ValidateMobile(RegisteInput.Mobile.Trim()))
            {
                ModelState.AddModelError("", ErrorMessages.Mobile_RuleError);
                return Page();
            }
            if (RegisteInput.Mobile.Trim() != contactInfo.Mobile && !string.IsNullOrEmpty(contactInfo.Mobile))
            {
                ModelState.AddModelError("", "您必须使用在金蝶预留的手机号码:" + contactInfo.Mobile);
                return Page();
            }

            if (!await _mobileCodeSender.CheckAsync(contactInfo.Mobile, RegisteInput.Code.Trim()))
            {
                ModelState.AddModelError("", ErrorMessages.CodeError);
                return Page();
            }

            var (user, _) = await this._userAppServiceClient.FindByUsernameAsync(RegisteInput.UserName.Trim());
            if (user != null)
            {
                ModelState.AddModelError("", ErrorMessages.UsernameExisted);
                return Page();
            }

            (user, _) = await this._userAppServiceClient.FindByIdCardNoAsync(RegisteInput.IdCardNo.Trim());
            if (user != null)
            {
                ModelState.AddModelError("", ErrorMessages.IDRegisted);
                return Page();
            }

            var userItemDto = new UserItemDto()
            {
                IdCardNo = contactInfo.IdCardNo,
                Username = RegisteInput.UserName.Trim(),
                Password = RegisteInput.Password1.Trim(),
                Name = contactInfo.Name.Trim(),
                Mobile = RegisteInput.Mobile.Trim(),
                EmployeeNumber = contactInfo.Number,
                EmployeeMdmId = contactInfo.Id,
                DepartmentMdmId = contactInfo.DepartmentId,
                DepartmentId = contactInfo.DepartmentSrcId,
                Avatar = contactInfo.Gender == 1 ? "local://male" : "local://female",
                Created = DateTimeOffset.UtcNow
            };
            await this._userAppServiceClient.CreateUserAsync(userItemDto);
            ServiceEventSource.Current.Message("用户成功注册用户名:{0}", RegisteInput.UserName);
            return RedirectToPage("Success", new { title = "注册成功！", desc = $"您已经注册成功,用户名是:{RegisteInput.UserName}" });
        }

        private bool ValidateMobile(string mobile)
        {
            if (string.IsNullOrEmpty(mobile))
                return false;
            if (mobile.StartsWith("0"))
                return false;
            if (mobile.Contains("-"))
                return false;
            if (mobile.Length == 11 && long.TryParse(mobile, out var _))
                return true;
            return false;
        }
    }
}
