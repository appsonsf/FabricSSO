using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace SecurityTokenWeb
{
    public static class StsLoginStatus
    {
        public const string LoginStatusSymbol = "StatusCode";
        public const string LoginStatusDescriptionSymbol = "StatusCodeDescription";
    }

    public enum StsAccountStatusCode
    {
        [Description("输入账户名称错误")]
        AccountError = 1,

        [Description("密码错误")]
        PasswordError = 2,

        [Description("临时密钥错误")]
        TempPasswordError = 3,

        [Description("手机验证码错误")]
        MobileCodeError = 4,

        [Description("账户已被锁定")]
        Locked = 5,

        [Description("账户已被禁用")]
        Disabled = 5,

    }
}
