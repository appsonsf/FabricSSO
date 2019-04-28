using MassTransit;
using OM.Base.Sso.Messages;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace EventBusEmulator.Consumers
{
    public class UserBatchSyncConsumer : IConsumer<IUserBatchSync>
    {
        private readonly MainForm _mainForm;

        public UserBatchSyncConsumer(MainForm mainForm)
        {
            _mainForm = mainForm;
        }

        public Task Consume(ConsumeContext<IUserBatchSync> context)
        {
            var sb = new StringBuilder();
            sb.AppendLine("Amount is " + context.Message.Users.Count);
            foreach (var user in context.Message.Users)
            {
                sb.AppendLine(user.Name);
            }
            _mainForm.PrintResult(sb.ToString());
            return Task.CompletedTask;
        }
    }
}
