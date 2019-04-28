using Microsoft.ServiceFabric.Actors;
using Microsoft.ServiceFabric.Actors.Client;
using Microsoft.ServiceFabric.Services.Client;
using Microsoft.ServiceFabric.Services.Remoting.Client;
using Microsoft.ServiceFabric.Services.Remoting.V2.FabricTransport.Client;
using Serilog;
using ServiceFabricContrib;
using Sso.Remoting;
using Sso.Remoting.Domains;
using Sso.Remoting.Models;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Fabric;
using System.Linq;
using System.Threading.Tasks;

namespace Sso.Remoting
{
    public class RemotingClient : IRemotingClient
    {
        private static ServiceProxyFactory proxyFactory = new ServiceProxyFactory((c) =>
            new FabricTransportServiceRemotingClientFactory());
        private static FabricClient fabricClient = new FabricClient();

        //public static async Task<List<Int64RangePartitionInformation>> GetStateServicePartitionInformationsAsync(string serviceName)
        //{
        //    var builder = new ServiceUriBuilder(serviceName);
        //    var serviceUri = builder.ToUri();
        //    var lst = new List<Int64RangePartitionInformation>();
        //    foreach (var p in await fabricClient.QueryManager.GetPartitionListAsync(serviceUri))
        //    {
        //        lst.Add(p.PartitionInformation as Int64RangePartitionInformation);
        //    }
        //    return lst;
        //}

        public IUserRegisterActor CreateUserRegisterActor(string userIdCardNo)
        {
            var builder = new ServiceUriBuilder(Constants.UserRegisterActorServiceName);
            return ActorProxy.Create<IUserRegisterActor>(new ActorId(userIdCardNo), builder.ToUri());
        }

        public async Task<IEnumerable<IUserAppService>> CreateAllUserAppServicesAsync()
        {
            var builder = new ServiceUriBuilder(Constants.ServiceName_ProfileStateService);
            var serviceUri = builder.ToUri();
            var lst = new List<IUserAppService>();
            foreach (var p in await fabricClient.QueryManager.GetPartitionListAsync(serviceUri))
            {
                long minKey = (p.PartitionInformation as Int64RangePartitionInformation).LowKey;
                var appService = proxyFactory.CreateServiceProxy<IUserAppService>(builder.ToUri(),
                    new ServicePartitionKey(minKey), listenerName: Constants.ListenerName_UserAppService);
                lst.Add(appService);
            }
            return lst;
        }

        public async Task<IEnumerable<IUserDataAppService>> CreateAllUserDataAppServicesAsync()
        {
            var builder = new ServiceUriBuilder(Constants.ServiceName_ProfileStateService);
            var serviceUri = builder.ToUri();
            var list = new List<IUserDataAppService>();
            foreach (var p in await fabricClient.QueryManager.GetPartitionListAsync(serviceUri))
            {
                long minKey = (p.PartitionInformation as Int64RangePartitionInformation).LowKey;
                var appService = proxyFactory.CreateServiceProxy<IUserDataAppService>(builder.ToUri(),
                    new ServicePartitionKey(minKey), listenerName: Constants.ListenerName_UserDataAppService);
                list.Add(appService);
            }
            return list;
        }

        public IUserAppService CreateUserAppService(ItemId itemId)
        {
            var builder = new ServiceUriBuilder(Constants.ServiceName_ProfileStateService);
            return proxyFactory.CreateServiceProxy<IUserAppService>(builder.ToUri(), itemId.GetPartitionKey(), listenerName: Constants.ListenerName_UserAppService);
        }

        public IUserDataAppService CreateUserDataAppService(ItemId itemId)
        {
            var buidler = new ServiceUriBuilder(Constants.ServiceName_ProfileStateService);
            return proxyFactory.CreateNonIServiceProxy<IUserDataAppService>(buidler.ToUri(), itemId.GetPartitionKey(), listenerName: Constants.ListenerName_UserDataAppService);
        }

        public IClientAppService CreateClientAppService()
        {
            var builder = new ServiceUriBuilder(Constants.ServiceName_ConfigService);
            return proxyFactory.CreateServiceProxy<IClientAppService>(builder.ToUri(),
                listenerName: Constants.ListenerName_ClientAppService);
        }

        public IResourceAppService CreateResourceAppService()
        {
            var builder = new ServiceUriBuilder(Constants.ServiceName_ConfigService);
            return proxyFactory.CreateServiceProxy<IResourceAppService>(builder.ToUri(),
                listenerName: Constants.ListenerName_ResourceAppService);
        }

        public IPersistedGrantAppService CreatePersistedGrantAppService()
        {
            var builder = new ServiceUriBuilder(Constants.ServiceName_ConfigService);
            return proxyFactory.CreateServiceProxy<IPersistedGrantAppService>(builder.ToUri(),
                listenerName: Constants.ListenerName_PersistedGrantAppService);
        }

        public ISystemRoleAppService CreateSystemRoleAppService()
        {
            var builder = new ServiceUriBuilder(Constants.ServiceName_ConfigService);
            return proxyFactory.CreateServiceProxy<ISystemRoleAppService>(builder.ToUri(),
                listenerName: Constants.ListenerName_SystemRoleAppService);
        }

        public IUserRoleAppService CreateUserRoleAppService()
        {
            var builder = new ServiceUriBuilder(Constants.ServiceName_ConfigService);
            return proxyFactory.CreateServiceProxy<IUserRoleAppService>(builder.ToUri(),
                listenerName: Constants.ListenerName_UserRoleAppService);
        }

        public IAdOperationAppService CreateAdOperationAppService(ItemId itemId)
        {
            var buidler = new ServiceUriBuilder(Constants.ServiceName_ProfileStateService);
            return proxyFactory.CreateNonIServiceProxy<IAdOperationAppService>(buidler.ToUri(), itemId.GetPartitionKey(), listenerName: Constants.ListenerName_AdOperationAppService);
        }

        public IScanLoginNotifyAppService CreateScanLoginNotifyAppService()
        {
            var builder = new ServiceUriBuilder(Constants.ScanLoginServiceName);
            return proxyFactory.CreateServiceProxy<IScanLoginNotifyAppService>(builder.ToUri(),
                listenerName: Constants.ListenerName_ScanLoginNotifyAppService);
        }
    }
}
