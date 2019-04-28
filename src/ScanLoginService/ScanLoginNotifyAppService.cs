using Microsoft.AspNet.SignalR;
using Newtonsoft.Json;
using ScanLoginService.Model;
using ScanLoginService.WebEndpoint;
using Serilog;
using Sso.Remoting;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ScanLoginService
{
    public class ScanLoginNotifyAppService : IScanLoginNotifyAppService
    {
        public Task<bool> NotifyAsync(string connectionId, string username, string temppwd)
        {
            var hubContext = GlobalHost.ConnectionManager.GetHubContext<QrCodeHub>();
            var info = new LoginInfo() { Username = username, TempPwd = temppwd };
            var msg = JsonConvert.SerializeObject(info);
            try
            {
                hubContext.Clients.Client(connectionId).sendLoginInfo(msg);
                return Task.FromResult(true);
            }
            catch (Exception ex)
            {
                Log.Logger.Error($"通知客户端时，出现错误：{ex.Message}。发生时间：{DateTime.Now.ToString()}");
                return Task.FromResult(false);
            }
        }
    }
}
