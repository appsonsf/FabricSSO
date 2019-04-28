using IdentityServer4.Models;
using IdentityServer4.Stores;
using ServiceFabricContrib;
using Sso.Remoting;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using AppsOnSF.Common.Utilities;

namespace SecurityTokenWeb.Services
{
    public class ResourceStore : IResourceStore
    {
        private readonly IRemotingClient _remoteServiceClient;

        public ResourceStore(
            IRemotingClient remoteServiceClient)
        {
            _remoteServiceClient = remoteServiceClient;
        }

        public async Task<ApiResource> FindApiResourceAsync(string name)
        {
            using (StopwatchLog.Track())
            {
                var appService = _remoteServiceClient.CreateResourceAppService();

                return await appService.FindApiResourceAsync(name);
            }
        }

        public async Task<IEnumerable<ApiResource>> FindApiResourcesByScopeAsync(IEnumerable<string> scopeNames)
        {
            using (StopwatchLog.Track())
            {
                var appService = _remoteServiceClient.CreateResourceAppService();

                return await appService.FindApiResourcesByScopeAsync(scopeNames.ToList());
            }
        }

        public async Task<IEnumerable<IdentityResource>> FindIdentityResourcesByScopeAsync(IEnumerable<string> scopeNames)
        {
            using (StopwatchLog.Track())
            {
                var appService = _remoteServiceClient.CreateResourceAppService();

                return await appService.FindIdentityResourcesByScopeAsync(scopeNames.ToList());
            }
        }

        public async Task<Resources> GetAllResourcesAsync()
        {
            using (StopwatchLog.Track())
            {
                var appService = _remoteServiceClient.CreateResourceAppService();
                return await appService.GetAllResourcesAsync();
            }
        }
    }
}
