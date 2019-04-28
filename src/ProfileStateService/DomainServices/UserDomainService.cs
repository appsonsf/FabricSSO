using System;
using System.Collections.Generic;
using System.Fabric;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.ServiceFabric.Data;
using Microsoft.ServiceFabric.Data.Collections;
using ServiceFabricContrib;
using Sso.Remoting.Domains;
using Sso.Remoting.Domains.Services;
using Sso.Remoting.Models;

namespace ProfileStateService.DomainServices
{

    /// <summary>
    /// 用户相关的DomainService
    /// </summary>
    public class UserDomainService : IUserDomainService
    {
        private const string DictionaryName = "Users";
        private readonly StatefulServiceContext _serviceContext;
        private readonly IReliableStateManager _stateManager;

        public UserDomainService(IReliableStateManager stateManager, StatefulServiceContext serviceContext)
        {
            _stateManager = stateManager;
            _serviceContext = serviceContext;
        }

        public async Task<IList<UserItem>> GetAllUsersAsync()
        {
            var users = await _stateManager.GetOrAddAsync<IReliableDictionary<ItemId, UserItem>>(DictionaryName);
            var list = new List<UserItem>();
            using (var tx = _stateManager.CreateTransaction())
            {
                var enumerator = (await users.CreateEnumerableAsync(tx)).GetAsyncEnumerator();
                CancellationToken ct = default(CancellationToken);
                while (await enumerator.MoveNextAsync(ct))
                {
                    list.Add(enumerator.Current.Value);
                }
            }
            return list;
        }
    }
}
