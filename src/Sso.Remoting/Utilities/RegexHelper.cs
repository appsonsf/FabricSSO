using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace Common.Utilities
{
    public static class RegexHelper
    {
        /// <summary>
        /// 判断手机号码
        /// </summary>
        /// <param name="moblie">手机号码</param>
        /// <returns>是手机号码返回true，否则false</returns>
        public static bool VerifyMoblie(string moblie)
        {
            if (moblie == null)
            {
                return false;
            }

            var regex = new Regex("^((13[0-9])|(14[5,7])|(15[0-3,5-9])|(17[0,3,5-8])|(18[0-9])|166|198|199|(147))\\d{8}$");
            return regex.IsMatch(moblie);
        }

        public static bool VerifySMCode(string code)
        {
            var regex = new Regex(@"\d{6}");
            return regex.IsMatch(code);
        }

        public static bool VerifyGuid(string guid)
        {
            Regex reg = new Regex("^[A-F0-9]{8}(-[A-F0-9]{4}){3}-[A-F0-9]{12}$", RegexOptions.Compiled);
            return reg.IsMatch(guid);
        }
        public static string GetUrlParam(string url,string key)
        {
            if (string.IsNullOrEmpty(url))
                return null;
            NameValueCollection nvc = new NameValueCollection();
            try
            {
                int paramIdx = url.IndexOf('?');
                if (paramIdx == url.Length - 1)
                    return null;
                string ps = url.Substring(paramIdx + 1);

                // 开始分析参数对   
                Regex re = new Regex(@"(^|&)?(\w+)=([^&]+)(&|$)?", RegexOptions.Compiled);
                MatchCollection mc = re.Matches(ps);
                foreach (Match m in mc)
                {
                    nvc.Add(m.Result("$2").ToLower(), m.Result("$3"));
                }

            }
            catch { }
            return nvc[key];
        }
    }
}
