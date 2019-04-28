using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MassTransit;
using OM.Base.Csi.Messages;

namespace Sso.Remoting.Events
{
    public class MobileCodeSender: IMobileCodeSender
    {
        private readonly IBusControl _bus;

        public MobileCodeSender(IBusControl bus)
        {
            _bus = bus;
        }

        public async Task SendAsync(string[] PhoneNumbers, string code)
        {
            await _bus.Send<SendMobileCodeCommand>(new
            {
                PhoneNumbers = PhoneNumbers,
                Code = code,
            });
        }
    }
}
