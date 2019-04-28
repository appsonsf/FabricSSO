using System;
using System.Collections.Generic;
using System.Fabric;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.ServiceFabric.Data;
using Microsoft.ServiceFabric.Data.Collections;
using ServiceFabricContrib;
using Sso.Remoting;
using Sso.Remoting.Domains;
using Sso.Remoting.Models;

namespace ProfileStateService
{
    public class AdOperationAppService : IAdOperationAppService
    {
        private const string DictionaryName = "UserAdOperation";
        private const string UserDictionaryName = "Users";
        private readonly StatefulServiceContext _serviceContext;
        private readonly IReliableStateManager _stateManager;
        private readonly IMapper _mapper;

        public AdOperationAppService(StatefulServiceContext serviceContext, IReliableStateManager stateManager, IMapper mapper)
        {
            _serviceContext = serviceContext;
            _stateManager = stateManager;
            _mapper = mapper;
        }

        public async Task<UserAdEventLogDto> GetUserAdEventLogAsync(ItemId Id, UserAdEventType type)
        {
            var eventLogs = await _stateManager.GetOrAddAsync<IReliableDictionary<ItemId, List<UserAdEventLog>>>(DictionaryName);
            using (var tx = _stateManager.CreateTransaction())
            {
                var logs = await eventLogs.TryGetValueAsync(tx, Id);
                if (!logs.HasValue)
                    return null;
                var log = logs.Value.FirstOrDefault(u => u.EventType == type);
                if (log == null) return null;
                return this._mapper.Map<UserAdEventLogDto>(log);
            }
        }

        public async Task AddOrUpdateUserAdEventLogAsync(UserAdEventLogDto log)
        {
            if (log == null)
                throw new ArgumentNullException(nameof(log));
            var eventLogs = await _stateManager.GetOrAddAsync<IReliableDictionary<ItemId, List<UserAdEventLog>>>(DictionaryName);
            var item = new UserAdEventLog(log.UserId, log.EventType, log.SendedTime);
            var key = log.UserId;
            using (var tx = _stateManager.CreateTransaction())
            {
                var logs = await eventLogs.TryGetValueAsync(tx, key);
                if (!logs.HasValue)
                {
                    await eventLogs.SetAsync(tx, key, new List<UserAdEventLog>() { item });
                }
                else
                {
                    var oldLog = logs.Value.FirstOrDefault(u => u.UserId.Equals(key) && u.EventType == log.EventType);
                    if (oldLog != null)
                        logs.Value.Remove(oldLog);
                    logs.Value.Add(item);
                    await eventLogs.SetAsync(tx, key, logs.Value);
                }
                await tx.CommitAsync();
                ServiceEventSource.Current.ServiceMessage(_serviceContext, "Created user Ad Operation,UserId:{0},Type:{1}", item.UserId.ToString(), item.EventType.ToString());
            }
        }

        public async Task CompleteAdEventAsync(ItemId userId, UserAdEventType type)
        {
            var logDto = await this.GetUserAdEventLogAsync(userId, type);
            if (logDto == null)
                return;
            var eventLogs = await _stateManager.GetOrAddAsync<IReliableDictionary<ItemId, List<UserAdEventLog>>>(DictionaryName);
            var users = await _stateManager.GetOrAddAsync<IReliableDictionary<ItemId, UserItem>>(UserDictionaryName);
            using (var tx = _stateManager.CreateTransaction())
            {
                var user = await users.TryGetValueAsync(tx, userId);
                var logs = await eventLogs.TryGetValueAsync(tx, userId);
                var log = logs.HasValue ? logs.Value.FirstOrDefault(u => u.EventType == type) : null;
                if (!user.HasValue || log == null)
                    return;
                var itemUser = user.Value.UpdateHasAdUser(true);
                var itemLog = log.UpdateRecived(true, DateTimeOffset.Now);
                logs.Value.Remove(log);
                logs.Value.Add(itemLog);
                await users.SetAsync(tx, userId, itemUser);
                await eventLogs.SetAsync(tx, userId, logs.Value);
                await tx.CommitAsync();
            }
        }
    }
}
