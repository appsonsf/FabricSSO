using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ScanLoginService.Model
{
    /// <summary>
    /// 应答协议类
    /// </summary>
    public class LoginInfo
    {
        /// <summary>
        /// 用户登录名
        /// </summary>
        public string Username { get; set; }
        /// <summary>
        /// 临时密钥
        /// </summary>
        public string TempPwd { get; set; }
    }
}
