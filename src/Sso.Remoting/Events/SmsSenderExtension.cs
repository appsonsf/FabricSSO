using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MassTransit;
using Microsoft.Extensions.DependencyInjection;
using OM.Base.Csi.Messages;

namespace Sso.Remoting.Events
{
    public static class SmsSenderExtension
    {
        public static IServiceCollection AddMobileCodeSender(this IServiceCollection services, IBusControl bus, string host)
        {
            services.AddSingleton<IMobileCodeSender>(u => new MobileCodeSender(bus));
            EndpointConvention.Map<SendMobileCodeCommand>(
                new Uri(host + "OM.Base.Csi.SmsService"));
            return services;
        }
    }
}
