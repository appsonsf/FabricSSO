using IdentityServer4.Models;
using Microsoft.ServiceFabric.Services.Remoting;
using Sso.Remoting.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Sso.Remoting
{
    public interface IClientAppService : IService
    {
        Task<Client> FindClientByIdAsync(string clientId);
        Task<Client> FindClientByNameAsync(string name);
        Task<int> CreateClientsAsync(List<Client> input);
        Task<int> UpdateClientsAsync(List<Client> input);
        Task<List<Client>> GetAllClientAsync();
        Task<int> GetClientCountAsync();
        Task<bool> DeleteClientsAsync(string clientId);
    }
}
