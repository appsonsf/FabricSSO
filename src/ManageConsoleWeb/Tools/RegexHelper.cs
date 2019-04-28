using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace ManageConsoleWeb.Tools
{
    public static class RegexHelper
    {
        
        /// <summary>
        /// 包含数字因为以及连接线
        /// </summary>
        public static Regex OnlyContainCharacterAndDigitAndLine = new Regex(@"^[a-zA-Z0-9-]*$");

        /// <summary>
        /// 身份证号码
        /// </summary>
        public static Regex IDCardNo=new Regex(@"^(^\d{15}$|^\d{18}$|^\d{17}(\d|X|x))$", RegexOptions.IgnoreCase);

        /// <summary>
        /// 手机号码
        /// </summary>
        public static Regex Mobile=new Regex("^[0-9]{11,11}$");

        /// <summary>
        /// 用户名正则表达
        /// </summary>
        public static Regex UserName = new Regex(@"^[a-zA-Z0-9_]{5,19}$");

    }
}
