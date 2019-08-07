using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MassTransit;
using Base.Csi.Sms.MsgContracts;
using AppsOnSF.Common.Options;
using AppsOnSF.Common.Utilities;
using AppsOnSF.Common.BaseServices;

namespace Sso.Remoting.Events
{
    public class MobileCodeSender : IMobileCodeSender
    {
        private readonly IBusControl _bus;
        private readonly ISimpleKeyValueService _simpleKeyValueService;

        public MobileCodeSender(IBusControl bus, ISimpleKeyValueService simpleKeyValueService)
        {
            _bus = bus;
            _simpleKeyValueService = simpleKeyValueService;
        }

        public async Task<bool> CheckAsync(string phoneNumber, string code)
        {
            var original = await _simpleKeyValueService.CheckAndGet(
                     Constants.SimpleKeyValueServiceContainerName_MobileCode, phoneNumber, TimeSpan.FromMinutes(5));
            return original == code;
        }

        public async Task<string> SendAsync(string[] phoneNumbers)
        {
            var code = (new Random().Next(1000, 9999)).ToString();

            foreach (var item in phoneNumbers)
            {
                await _simpleKeyValueService.AddOrUpdate(
                    Constants.SimpleKeyValueServiceContainerName_MobileCode, item, code);
            }
            /*
            // Related to 
            await _bus.Send<SendMobileCodeCommand>(new
            {
                PhoneNumbers = phoneNumbers,
                Code = code,
            });
            */
            return code;
        }
    }
}
