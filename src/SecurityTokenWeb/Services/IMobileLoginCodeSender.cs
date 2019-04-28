using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace SecurityTokenWeb.Services
{
    public interface IMobileLoginCodeSender
    {
        /// <summary>
        /// 获取登录短信验证码  
        /// 必须是系统存在手机号码才能发送成功
        /// 没有其他限制
        /// </summary>
        /// <param name="mobile"></param>
        /// <returns></returns>
        Task<string> Send(string mobile);

          

    }
}
