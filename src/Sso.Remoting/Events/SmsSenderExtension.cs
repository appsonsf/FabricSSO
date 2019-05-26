using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MassTransit;
using Microsoft.Extensions.DependencyInjection;
using Base.Csi.Sms.MsgContracts;
using AppsOnSF.Common.BaseServices;

namespace Sso.Remoting.Events
{
    public static class SmsSenderExtension
    {
        public static IServiceCollection AddMobileCodeSender(this IServiceCollection services, IBusControl bus, string host)
        {
            services.AddSingleton<IMobileCodeSender>(_ => new MobileCodeSender(
                bus, RemotingProxyFactory.CreateSimpleKeyValueService()));
            EndpointConvention.Map<SendMobileCodeCommand>(
                new Uri(host + "Base.Csi.SmsService"));
            return services;
        }
    }
}
