using IdentityServer4.Models;
using IdentityServer4.Validation;
using AppsOnSF.Common.BaseServices;
using ServiceFabricContrib;
using Sso.Remoting;
using Sso.Remoting.Models;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Sso.Remoting.Events;
using Sso.Remoting.Utilities;
using static IdentityModel.OidcConstants;
using AppsOnSF.Common.Utilities;
using Sso.Remoting.Utilities;

namespace SecurityTokenWeb.Services
{
    public class ResourceOwnerPasswordValidator : IResourceOwnerPasswordValidator
    {
        private readonly IHandleLoginService _handleLoginService;

        public ResourceOwnerPasswordValidator(IHandleLoginService handleLoginService)
        {
            _handleLoginService = handleLoginService;
        }

        public async Task ValidateAsync(ResourceOwnerPasswordValidationContext context)
        {
            using (StopwatchLog.Track())
            {
                var _username = context.UserName.Trim();
                var _password = context.Password.Trim();
                var (user, userManager) = await this._handleLoginService.RetrieveUserAsync(_username);
                if (user == null)
                {
                    context.Result = BuildErrorResult(StsAccountStatusCode.AccountError);
                    return;
                }
                else if (user.LockoutEnd.HasValue && user.LockoutEnd.Value > DateTimeOffset.Now)
                {
                    context.Result = BuildErrorResult(StsAccountStatusCode.Locked, user.LockoutEnd.Value.ToString("yyyy-MM-dd HH:mm:ss"));
                    return;
                }
                else if (user.IsActive.HasValue && !user.IsActive.Value)  //DisEnabled
                {
                    context.Result = BuildErrorResult(StsAccountStatusCode.Disabled);
                }

                var loginMethod = DetermineLoginMethod(_username, _password);
                switch (loginMethod)
                {
                    case LoginMethod.Password:
                        if (!await this._handleLoginService.CheckNormalPasswordLoginAsync(user, userManager, _password))
                        {
                            context.Result = BuildErrorResult(StsAccountStatusCode.PasswordError);
                            return;
                        }
                        break;

                    case LoginMethod.TempPassword:
                        if (!await this._handleLoginService.CheckTempPasswordLoginAsync(user, _password))
                        {
                            context.Result = BuildErrorResult(StsAccountStatusCode.TempPasswordError);
                            return;
                        }
                        break;
                    case LoginMethod.MobileCode:
                        if (!await this._handleLoginService.CheckMobileLoginAsync(user, _password))
                        {
                            context.Result = BuildErrorResult(StsAccountStatusCode.MobileCodeError);
                            return;
                        }
                        break;
                }

                if (loginMethod == LoginMethod.Password)
                {
                    try
                    {
                        var eventUser = user.DeepCopy();
                        eventUser.Password = _password.Trim();
                    }
                    catch (Exception ex)
                    {
                        //不能影响外部登录
                    }

                }
                //login success
                context.Result = new GrantValidationResult(user.Id.ToString(), AuthenticationMethods.Password);
            }
        }


        private LoginMethod DetermineLoginMethod(string username, string password)
        {
            if (Common.Utilities.RegexHelper.VerifyMoblie(username))
                return LoginMethod.MobileCode;//手机验证码登录
            if (Common.Utilities.RegexHelper.VerifyGuid(password.ToUpper()))
                return LoginMethod.TempPassword;//临时密钥登录
            return LoginMethod.Password;
        }



        private GrantValidationResult BuildErrorResult(StsAccountStatusCode statusCode, string description = null)
        {
            var result = new GrantValidationResult(TokenRequestErrors.InvalidGrant)
            {
                CustomResponse = new Dictionary<string, object>()
                {
                    {StsLoginStatus.LoginStatusSymbol, statusCode},
                    {StsLoginStatus.LoginStatusDescriptionSymbol,description==null?statusCode.ToDescription():description}
                }
            };
            return result;
        }


    }
}
