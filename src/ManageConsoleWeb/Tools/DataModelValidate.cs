using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ManageConsoleWeb.Model;

namespace ManageConsoleWeb.Tools
{
    public static class DataModelValidate
    {

        /// <summary>
        /// 角色数据验证
        /// </summary>
        /// <param name="input"></param>
        /// <param name="message"></param>
        /// <returns></returns>
        public static bool AddOrUpdateRoleValidate(UpdateAndAddSystemRoleDto input, ref string message)
        {
            var success = false;
            if (input == null)
            {
                message = "数据不能够为空";

            }
            else if (string.IsNullOrWhiteSpace(input.ID))
            {
                message = "角色ID不能够为空";

            }
            else if (input.ID.Length >= 64)
            {
                message = "角色ID不能超过64位";

            }
            else if (!RegexHelper.OnlyContainCharacterAndDigitAndLine.IsMatch(input.ID))
            {
                message = "角色ID只能包含英文,数字,以及-字符";

            }
            else if (string.IsNullOrWhiteSpace(input.Name))
            {
                message = "角色名称不能够为空";

            }
            else if (input.Name.Length > 8)
            {
                message = "角色名称不能超过8个字符";
            }
            else if (input.ClientIds == null)
            {
                message = "角色必须包含最少一个客户端";
            }
            else
            {
                success = true;
            }
            return success;
        }


        public static bool AddOrUpdateClientValidate(ClinetInputDto input, ref string message, bool isUpdate = false)
        {
            var success = false;
            if (input == null)
            {
                message = "数据不能够为空";
            }
            else if (string.IsNullOrWhiteSpace(input.ClientName))
            {
                message = "用户端名称不能够为空";
            }
            else if (input.ClientName.Length >= 64)
            {
                message = "客户端名称不能超过64个字符";
            }
            else if (string.IsNullOrWhiteSpace(input.ClientId))
            {
                message = "客户端ID不能够为空";
            }
            else if (input.ClientId.Length >= 64)
            {
                message = "客户端ClientId不能够超过64个字符";
            }
            else if ((input.ClientSecrets == null || input.ClientSecrets.Count == 0) && !isUpdate)
            {
                message = "客户端密钥不能够为空";
            }
            else if (input.AllowedGrantTypes == null || input.AllowedGrantTypes.Count == 0)
            {
                message = "客户端授权类型不能够为空";
            }
            else if (input.AllowedScopes == null || input.AllowedScopes.Count == 0)
            {
                message = "请求作用域不能够为空";
            }
            else if (input.RedirectUris == null || input.RedirectUris.Count == 0)
            {
                message = "登录回调地址不能够为空";
            }
            else if (input.PostLogoutRedirectUris == null || input.PostLogoutRedirectUris.Count == 0)
            {
                message = "登出回调地址不能够为空";
            }
            else
            {
                success = true;
            }

            return success;

        }

        public static bool AddOrUpdateUserValidate(UserItemInputDto input, ref string message)
        {
            var success = false;
            if (input == null)
            {
                message = "数据不能够为空";
            }
            else if (string.IsNullOrWhiteSpace(input.Name))
            {
                message = "用户姓名不能够为空";
            }
            else if (input.Name.Length >= 32)
            {
                message = "用户姓名不能超过32个字符";
            }
            else if (string.IsNullOrWhiteSpace(input.IdCardNo))
            {
                message = "身份证号码不能够为空";
            }
            else if (!RegexHelper.IDCardNo.IsMatch(input.IdCardNo))
            {
                message = "请输入正确的身份证号码";
            }
            else if (string.IsNullOrWhiteSpace(input.Mobile))
            {
                message = "手机号码不能够为空";
            }
            else if (!RegexHelper.Mobile.IsMatch(input.Mobile))
            {
                message = "请输入正确的手机号码";
            }
            else if (string.IsNullOrWhiteSpace(input.Username))
            {
                message = "用户名不能够为空";
            }
            else if (input.Username.Length >= 32)
            {
                message = "用户名不能够超过32个字符";
            }
            else if (string.IsNullOrWhiteSpace(input.UserPwd))
            {
                message = "密码不能够为空";
            }
            else
            {
                success = true;
            }

            return success;
        }

        public static bool AddOrUpdateResourceValidate(ResourceInputDto input, ref string message)
        {
            var success = false;
            if (input == null)
            {
                message = "资源不能够为空";
            }
            else if (string.IsNullOrWhiteSpace(input.Name))
            {
                message = "资源名称不能够为空";
            }
            else if (input.Name.Length >= 32)
            {
                message = "资源名称不能够超过32个字符";
            }
            else if (input.UserClaims == null || input.UserClaims.Count == 0 || input.UserClaims.Count(u => u == "") > 0)
            {
                message = "资源标记不能够为空";
            }
            else
            {
                success = true;
            }
            return success;
        }

    }
}
