using IdentityServer4.Models;
using Microsoft.ServiceFabric.Services.Remoting;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Sso.Remoting
{
    public interface IResourceAppService : IService
    {
        Task<ApiResource> FindApiResourceAsync(string name);
        Task<List<ApiResource>> FindApiResourcesByScopeAsync(List<string> scopeNames);
        Task<List<IdentityResource>> FindIdentityResourcesByScopeAsync(List<string> scopeNames);
        Task<Resources> GetAllResourcesAsync();
        Task<int> CreateApiResourcesAsync(List<ApiResource> resources);
        Task<int> CreateIdentityResourcesAsync(List<IdentityResource> resources);
        Task<int> UpdateIdentityResourcesAsync(List<IdentityResource> resources);
        Task<int> UpdateApiResourcesAsync(List<ApiResource> resources);
        Task<bool> DeleteApiResourceAsync(string name);

        Task<bool> DeleteIdentityResourceAsync(string name);
    }
}
