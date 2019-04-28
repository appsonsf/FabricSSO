using Microsoft.ServiceFabric.Services.Remoting;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Sso.Remoting
{
    /// <summary>
    /// SignalR服务
    /// </summary>
    public interface IScanLoginNotifyAppService : IService
    {
        /// <summary>
        /// 通知客户端
        /// </summary>
        /// <param name="connectionId">客户端连接Id</param>
        /// <param name="username">用户名</param>
        /// <param name="temppwd">临时密钥</param>
        /// <returns></returns>
        Task<bool> NotifyAsync(string connectionId, string username, string temppwd);
    }
}
