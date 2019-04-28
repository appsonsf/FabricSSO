using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Sso.Remoting;

namespace ManageConsoleWeb.HangfireJobs
{
    public interface IExportUserData
    {
        void DoAction(string jobId);
    }

    public class ExportUserData : IExportUserData
    {
        private readonly IRemotingClient _remotingClient;

        public ExportUserData(IRemotingClient remotingClient)
        {
            _remotingClient = remotingClient;
        }

        public void DoAction(string jobId)
        {
            var appServices = _remotingClient.CreateAllUserDataAppServicesAsync().GetAwaiter().GetResult();
            var tasks = new List<Task>();
            //精确到毫秒数级别
            var timeStamp = DateTime.Now.ToString("yyyy-MM-dd-HH-mm-ss");
            foreach (var appService in appServices)
            {
                tasks.Add(appService.ExportUserDataAsync(timeStamp));
            }
            Task.WhenAll(tasks).GetAwaiter().GetResult();
        }
    }
}
