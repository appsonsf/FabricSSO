using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AccountCenterWeb.Tools
{
    //短信模板
    public static class SmsTemplates
    {
        /// <summary>
        /// 用户注册短信模板
        /// </summary>
        [Obsolete]
        public const string UserRegisteTempLate = "验证码:{0},您正在通过单点登录系统进行用户注册操作,请勿泄露验证码。";

        /// <summary>
        /// 用户修改密码短信模板
        /// </summary>
        [Obsolete]
        public const string UserChangePasswordTempLate = "验证码:{0},您正在通过单点登录系统进行修改密码操作,请勿泄露验证码。";

        /// <summary>
        /// 用户重置密码短信模板
        /// </summary>
        [Obsolete]
        public const string UserResetPasswordTempLate = "验证码:{0},您正在通过单点登录系统进行找回密码操作,请勿泄露验证码。";

        /// <summary>
        /// 用户重置手机号码模板
        /// </summary>
        [Obsolete]
        public const string UserReSetMobileTempLate = "验证码:{0},您正在通过单点登录系统进行重置手机号码操作,请勿泄露验证码。";


    }
}
