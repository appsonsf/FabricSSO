using AutoMapper;
using IdentityServer4.Models;
using IdentityServer4.Stores;
using AppsOnSF.Common.Utilities;
using ServiceFabricContrib;
using Sso.Remoting;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SecurityTokenWeb.Services
{
    public class ClientStore : IClientStore
    {
        private readonly IRemotingClient _remoteServiceClient;

        public ClientStore(
            IRemotingClient remoteServiceClient)
        {
            _remoteServiceClient = remoteServiceClient;
        }

        public async Task<Client> FindClientByIdAsync(string clientId)
        {
            using (StopwatchLog.Track())
            {
                var manager = _remoteServiceClient.CreateClientAppService();

                return await manager.FindClientByIdAsync(clientId);
            }
        }
    }
}
