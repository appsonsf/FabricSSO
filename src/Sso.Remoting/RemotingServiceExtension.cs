using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AppsOnSF.Common.BaseServices;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.ServiceFabric.Actors;
using Microsoft.ServiceFabric.Actors.Client;
using ServiceFabricContrib;
using Sso.Remoting;
using Sso.Remoting.Events;

namespace Sso.Remoting
{
    public static class RemotingServiceExtension
    {
        public static IServiceCollection AddRemotingService(this IServiceCollection services)
        {
            services.AddSingleton<IRemotingClient, RemotingClient>();
            services.AddSingleton<IUserAppServiceClient, UserAppServiceClient>();
            services.AddSingleton(_ => RemotingProxyFactory.CreateSimpleKeyValueService());
            return services;
        }

        public static ItemId ToItemId(this string id)
        {
            var can = Guid.TryParse(id, out Guid guid);
            if (can) return new ItemId(guid);
            throw new ArgumentException("字符串不能转换为GUID", nameof(id));
        }
    }
}
