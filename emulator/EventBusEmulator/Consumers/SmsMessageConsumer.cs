using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MassTransit;
using OM.Base.Csi.Messages;

namespace EventBusEmulator.Consumers
{
    public class SmsMessageConsumer : IConsumer<SendMobileCodeCommand>
    {
        private readonly MainForm _mainForm;

        public SmsMessageConsumer(MainForm mainForm)
        {
            _mainForm = mainForm;
        }

        public Task Consume(ConsumeContext<SendMobileCodeCommand> context)
        {
            var sb = new StringBuilder();
            sb.Append("Code:");
            sb.Append(context.Message.Code);
            sb.Append("......PhoneNumbers:");
            sb.Append(string.Join(",", context.Message.PhoneNumbers));
            _mainForm.PrintResult(sb.ToString());
            return Task.CompletedTask;
        }
    }
}
