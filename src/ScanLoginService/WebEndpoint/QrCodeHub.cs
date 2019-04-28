using Microsoft.AspNet.SignalR;
using Microsoft.AspNet.SignalR.Hubs;
using Newtonsoft.Json;
using ScanLoginService.Model;
using Serilog;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace ScanLoginService.WebEndpoint
{
    [HubName("QrCodeApp")]
    public class QrCodeHub : Hub
    {
        /// <summary>
        /// 向客户端发送QrCode的文本以用于二维码显示
        /// </summary>
        public void SendQrCodeText()
        {
            var txt = $"login:{Context.ConnectionId}";
            this.Clients.Client(Context.ConnectionId).sendQrCodeText(txt);
            Log.Logger.Information($"SignalR发送信息：{txt}");
        }

        public override Task OnConnected()
        {
            Log.Logger.Information($"SignalR打开连接信息：{Context.ConnectionId}");
            SendQrCodeText();
            return base.OnConnected();
        }

        public override Task OnDisconnected(bool stopCalled)
        {
            Log.Logger.Information($"SignalR关闭连接：{Context.ConnectionId}");
            return base.OnDisconnected(stopCalled);
        }
    }
}
