using IdentityServer4.Models;
using IdentityServer4.Stores;
using ServiceFabricContrib;
using Sso.Remoting;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AppsOnSF.Common.Utilities;

namespace SecurityTokenWeb.Services
{
    public class PersistedGrantStore : IPersistedGrantStore
    {
        private readonly IRemotingClient _remoteServiceClient;

        public PersistedGrantStore(
            IRemotingClient remoteServiceClient)
        {
            _remoteServiceClient = remoteServiceClient;
        }

        public async Task<IEnumerable<PersistedGrant>> GetAllAsync(string subjectId)
        {
            using (StopwatchLog.Track())
            {
                var appService = _remoteServiceClient.CreatePersistedGrantAppService();

                return await appService.GetAllAsync(subjectId);
            }
        }

        public async Task<PersistedGrant> GetAsync(string key)
        {
            using (StopwatchLog.Track())
            {
                var appService = _remoteServiceClient.CreatePersistedGrantAppService();

                return await appService.GetAsync(key);
            }
        }

        public async Task RemoveAllAsync(string subjectId, string clientId)
        {
            var appService = _remoteServiceClient.CreatePersistedGrantAppService();

            await appService.RemoveAllAsync(subjectId, clientId);
        }

        public async Task RemoveAllAsync(string subjectId, string clientId, string type)
        {
            var appService = _remoteServiceClient.CreatePersistedGrantAppService();

            await appService.RemoveAllByTypeAsync(subjectId, clientId, type);
        }

        public async Task RemoveAsync(string key)
        {
            var appService = _remoteServiceClient.CreatePersistedGrantAppService();

            await appService.RemoveAsync(key);
        }

        public async Task StoreAsync(PersistedGrant grant)
        {
            var appService = _remoteServiceClient.CreatePersistedGrantAppService();

            await appService.StoreAsync(grant);
        }
    }
}
