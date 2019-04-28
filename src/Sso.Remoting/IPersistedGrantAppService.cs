using IdentityServer4.Models;
using Microsoft.ServiceFabric.Services.Remoting;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Sso.Remoting
{
    public interface IPersistedGrantAppService : IService
    {
        Task<List<PersistedGrant>> GetAllAsync(string subjectId);
        Task<PersistedGrant> GetAsync(string key);
        Task RemoveAllAsync(string subjectId, string clientId);
        Task RemoveAllByTypeAsync(string subjectId, string clientId, string type);
        Task RemoveAsync(string key);
        Task StoreAsync(PersistedGrant grant);
    }
}
