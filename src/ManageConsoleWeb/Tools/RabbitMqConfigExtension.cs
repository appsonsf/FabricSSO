using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using ManageConsoleWeb.HangfireJobs;
using MassTransit;
using Microsoft.Extensions.DependencyInjection;
using OpenApiClient.MdmDataDistribute;
using Sso.Remoting;
using Sso.Remoting.Events;

namespace ManageConsoleWeb.Tools
{
    public static class RabbitMqConfigExtension
    {
        public static IServiceCollection AddRabbitMqApp(this IServiceCollection services, IMapper mapper, IBusControl bus, IBusControl sso2mdm_bus)
        {
            services
                .AddSingleton(sso2mdm_bus)
                .AddScoped<IPublishUsers>(u => new PublishUsers(u.GetService<IRemotingClient>(), mapper, new List<IBusControl>() { sso2mdm_bus, bus }));
            return services;
        }
    }
}
