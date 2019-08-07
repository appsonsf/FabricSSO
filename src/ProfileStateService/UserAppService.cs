using AutoMapper;
using MassTransit;
using Microsoft.ServiceFabric.Data;
using Microsoft.ServiceFabric.Data.Collections;
using OM.Base.Sso.Messages;
using ServiceFabricContrib;
using Sso.Remoting;
using Sso.Remoting.Domains;
using Sso.Remoting.Models;
using System;
using System.Collections.Generic;
using System.Fabric;
using System.Threading;
using System.Threading.Tasks;

namespace ProfileStateService
{
    public class UserAppService : IUserAppService
    {
        private const string DictionaryName = "Users";
        private readonly IEnumerable<IBusControl> _buses;
        private readonly IMapper _mapper;
        private readonly StatefulServiceContext _serviceContext;
        private readonly IReliableStateManager _stateManager;

        public UserAppService(StatefulServiceContext serviceContext,
            IReliableStateManager stateManager,
            IEnumerable<IBusControl> buses, IMapper mapper)
        {
            _buses = buses;
            _mapper = mapper;
            _serviceContext = serviceContext;
            _stateManager = stateManager;
        }

        public async Task<UserItemDto> FindByIdAsync(ItemId id)
        {
            var users = await _stateManager.GetOrAddAsync<IReliableDictionary<ItemId, UserItem>>(DictionaryName);
            using (var tx = _stateManager.CreateTransaction())
            {
                var currentUser = await users.TryGetValueAsync(tx, id);

                if (currentUser.HasValue)
                {
                    return _mapper.Map<UserItemDto>(currentUser.Value);
                }
            }
            return null;
        }

        public async Task<UserItemDto> FindByUsernameAsync(string userName, CancellationToken ct = default(CancellationToken))
        {
            if (string.IsNullOrEmpty(userName))
                return null;
            var users = await _stateManager.GetOrAddAsync<IReliableDictionary<ItemId, UserItem>>(DictionaryName);
            using (var tx = _stateManager.CreateTransaction())
            {
                var enumerator = (await users.CreateEnumerableAsync(tx)).GetAsyncEnumerator();
                while (await enumerator.MoveNextAsync(ct))
                {
                    if (enumerator.Current.Value.Username.ToLower() == userName.ToLower())
                    {
                        return _mapper.Map<UserItemDto>(enumerator.Current.Value);
                    }
                }
            }
            return null;
        }

        public async Task<UserItemDto> FindByUsernameOrEmployeeNumberAsync(string userNameNumber, CancellationToken ct = default(CancellationToken))
        {
            if (string.IsNullOrEmpty(userNameNumber))
                return null;
            var users = await _stateManager.GetOrAddAsync<IReliableDictionary<ItemId, UserItem>>(DictionaryName);
            using (var tx = _stateManager.CreateTransaction())
            {
                var enumerator = (await users.CreateEnumerableAsync(tx)).GetAsyncEnumerator();
                while (await enumerator.MoveNextAsync(ct))
                {
                    if (enumerator.Current.Value.Username.ToLower() == userNameNumber.ToLower() || enumerator.Current.Value.EmployeeNumber == userNameNumber)
                    {
                        return _mapper.Map<UserItemDto>(enumerator.Current.Value);
                    }
                }
            }
            return null;
        }

        public async Task<UserItemDto> FindByMobileAsync(string mobile, CancellationToken ct = default(CancellationToken))
        {
            var users = await _stateManager.GetOrAddAsync<IReliableDictionary<ItemId, UserItem>>(DictionaryName);
            using (var tx = _stateManager.CreateTransaction())
            {
                var enumerator = (await users.CreateEnumerableAsync(tx)).GetAsyncEnumerator();
                while (await enumerator.MoveNextAsync(ct))
                {
                    if (enumerator.Current.Value.Mobile == mobile)
                    {
                        return _mapper.Map<UserItemDto>(enumerator.Current.Value);
                    }
                }
            }
            return null;
        }

        public async Task<UserItemDto> FindByIdCardNoAsync(string idCardNo, CancellationToken ct = default(CancellationToken))
        {
            var users = await _stateManager.GetOrAddAsync<IReliableDictionary<ItemId, UserItem>>(DictionaryName);
            using (var tx = _stateManager.CreateTransaction())
            {
                var enumerator = (await users.CreateEnumerableAsync(tx)).GetAsyncEnumerator();
                while (await enumerator.MoveNextAsync(ct))
                {
                    if (enumerator.Current.Value.IdCardNo == idCardNo)
                    {
                        return _mapper.Map<UserItemDto>(enumerator.Current.Value);
                    }
                }
            }
            return null;
        }

        public async Task<UserItemDto> FindByEmployeeNumberAsync(string employeeNumber, CancellationToken ct = default(CancellationToken))
        {
            var users = await _stateManager.GetOrAddAsync<IReliableDictionary<ItemId, UserItem>>(DictionaryName);
            using (var tx = _stateManager.CreateTransaction())
            {
                var enumerator = (await users.CreateEnumerableAsync(tx)).GetAsyncEnumerator();
                while (await enumerator.MoveNextAsync(ct))
                {
                    if (enumerator.Current.Value.EmployeeNumber == employeeNumber)
                    {
                        return _mapper.Map<UserItemDto>(enumerator.Current.Value);
                    }
                }
            }
            return null;
        }

        public async Task<bool> DeleteByIdAsync(ItemId id)
        {
            var users = await _stateManager.GetOrAddAsync<IReliableDictionary<ItemId, UserItem>>(DictionaryName);
            using (var tx = _stateManager.CreateTransaction())
            {
                await users.TryRemoveAsync(tx, id);
                await tx.CommitAsync();
                return true;
            }
        }

        public async Task EnableOrDisableUserAsync(ItemId id, bool active)
        {
            var users = await _stateManager.GetOrAddAsync<IReliableDictionary<ItemId, UserItem>>(DictionaryName);
            using (var tx = _stateManager.CreateTransaction())
            {
                var value = await users.TryGetValueAsync(tx, id);
                var currentValue = value.Value.UpdateIsActive(active);
                await users.SetAsync(tx, id, currentValue);
                await tx.CommitAsync();
            }
        }

        /// <summary>
        /// 获取用户的总数数量
        /// </summary>
        /// <returns></returns>
        public async Task<long> GetUsersCountAsync()
        {
            var users = await _stateManager.GetOrAddAsync<IReliableDictionary<ItemId, UserItem>>(DictionaryName);
            using (var tx = _stateManager.CreateTransaction())
            {
                return await users.GetCountAsync(tx);
            }
        }

        public async Task<UserItemDto> CreateUserAsync(UserItemDto dto)
        {
            var users = await _stateManager.GetOrAddAsync<IReliableDictionary<ItemId, UserItem>>(DictionaryName);
            using (var tx = _stateManager.CreateTransaction())
            {
                var item = new UserItem(dto.IdCardNo, dto.Username, dto.Password,
                    dto.Name, dto.Mobile, dto.Email, dto.Avatar,
                    dto.EmployeeNumber, dto.EmployeeMdmId,
                    dto.DepartmentId, dto.DepartmentMdmId,
                    dto.Id);
                await users.AddAsync(tx, item.Id, item);
                await tx.CommitAsync();
                ServiceEventSource.Current.ServiceMessage(_serviceContext, "Created user item, userid: {0}, username: {1}", item.Id, item.Username);

                //await _bus.Publish(_mapper.Map<IUserCreated>(item));
                await PublishAsync<IUserCreated>(_mapper.Map<IUserCreated>(item));

                return _mapper.Map<UserItemDto>(item);
            }
        }

        public async Task<UserItemDto> CreateUserByImportAsync(UserItemDto dto)
        {
            var users = await _stateManager.GetOrAddAsync<IReliableDictionary<ItemId, UserItem>>(DictionaryName);
            using (var tx = _stateManager.CreateTransaction())
            {
                var item = new UserItem(dto.IdCardNo, dto.Username, dto.Password,
                    dto.Name, dto.Mobile, dto.Email, dto.Avatar,
                    dto.EmployeeNumber, dto.EmployeeMdmId,
                    dto.DepartmentId, dto.DepartmentMdmId,
                    dto.Id);
                item = item.UpdateHashedPassword(dto.Password);
                await users.AddAsync(tx, item.Id, item);
                await tx.CommitAsync();
                ServiceEventSource.Current.ServiceMessage(_serviceContext, "Created user item, userid: {0}, username: {1}", item.Id, item.Username);

                return _mapper.Map<UserItemDto>(item);
            }
        }



        public async Task<bool> CheckUserExists(Employee model)
        {
            var users = await _stateManager.GetOrAddAsync<IReliableDictionary<ItemId, UserItem>>(DictionaryName);
            using (var tx = _stateManager.CreateTransaction())
            {
                var enumerator = (await users.CreateEnumerableAsync(tx)).GetAsyncEnumerator();
                CancellationToken ct = default(CancellationToken);
                while (await enumerator.MoveNextAsync(ct))
                {
                    if (enumerator.Current.Value.Username == model.UserName || enumerator.Current.Value.Mobile == model.PhoneNo || enumerator.Current.Value.IdCardNo == model.IDNo)
                    {
                        return true;
                    }
                }
            }
            return false;
        }

        public async Task<UserItemDto> CheckIdentityVerify(string userName, string password)
        {
            if (string.IsNullOrWhiteSpace(userName))
            {
                throw new ArgumentException("IsNullOrWhiteSpace", nameof(userName));
            }

            var users = await _stateManager.GetOrAddAsync<IReliableDictionary<ItemId, UserItem>>(DictionaryName);
            using (var tx = _stateManager.CreateTransaction())
            {
                var enumerator = (await users.CreateEnumerableAsync(tx)).GetAsyncEnumerator();
                CancellationToken ct = default(CancellationToken);
                while (await enumerator.MoveNextAsync(ct))
                {
                    if (enumerator.Current.Value.Username == userName)
                    {
                        var result = enumerator.Current.Value.VerifyPassword(password);
                        var item = enumerator.Current.Value.UpdateLoginStatus(result);
                        await users.SetAsync(tx, item.Id, item);
                        await tx.CommitAsync();
                        if (!result) return null;
                        return _mapper.Map<UserItemDto>(item);
                    }
                }
            }
            return null;
        }



        /// <summary>
        /// 输入身份证号码和姓名进行验证
        /// </summary>
        /// <param name="idCardNo">身份证号</param>
        /// <param name="name">真实姓名</param>
        /// <returns></returns>
        public async Task<UserItemDto> CheckRealIdentityVerify(string idCardNo, string name)
        {
            var users = await _stateManager.GetOrAddAsync<IReliableDictionary<ItemId, UserItem>>(DictionaryName);
            using (var tx = _stateManager.CreateTransaction())
            {
                var enumerator = (await users.CreateEnumerableAsync(tx)).GetAsyncEnumerator();
                CancellationToken ct = default(CancellationToken);
                while (await enumerator.MoveNextAsync(ct))
                {
                    if (enumerator.Current.Value.Name == name && enumerator.Current.Value.IdCardNo == idCardNo)
                    {
                        return _mapper.Map<UserItemDto>(enumerator.Current.Value);
                    }
                }
            }
            return null;
        }

        /// <summary>
        /// 修改电话
        /// </summary>
        /// <param name="item"></param>
        /// <returns></returns>
        public async Task<UserItemDto> UpdatePhoneAsync(string idCardNo, string phone)
        {
            var users = await _stateManager.GetOrAddAsync<IReliableDictionary<ItemId, UserItem>>(DictionaryName);
            using (var tx = _stateManager.CreateTransaction())
            {
                var enumerator = (await users.CreateEnumerableAsync(tx)).GetAsyncEnumerator();
                CancellationToken ct = default(CancellationToken);
                while (await enumerator.MoveNextAsync(ct))
                {
                    if (enumerator.Current.Value.IdCardNo == idCardNo)
                    {
                        var item = enumerator.Current.Value.UpdateMobile(phone);

                        await users.SetAsync(tx, item.Id, item);
                        await tx.CommitAsync();
                        await LogAndPublishUpdateEvent(item);

                        return _mapper.Map<UserItemDto>(item);
                    }
                }
            }
            return null;
        }

        private async Task LogAndPublishUpdateEvent(UserItem item)
        {
            ServiceEventSource.Current.ServiceMessage(_serviceContext, "Updated user item, userid: {0}, username: {1}", item.Id, item.Username);

            //await _bus.Publish(_mapper.Map<IUserUpdated>(item));
            await PublishAsync<IUserUpdated>(_mapper.Map<IUserUpdated>(item));
        }

        /// <summary>
        /// 修改密码
        /// </summary>
        /// <param name="oldPwd"></param>
        /// <param name="newPwd"></param>
        /// <returns></returns>
        public async Task<UserItemDto> UpdatePasswordAsync(string idCardNo, string newPwd)
        {
            var users = await _stateManager.GetOrAddAsync<IReliableDictionary<ItemId, UserItem>>(DictionaryName);
            using (var tx = _stateManager.CreateTransaction())
            {
                var enumerator = (await users.CreateEnumerableAsync(tx)).GetAsyncEnumerator();
                CancellationToken ct = default(CancellationToken);
                while (await enumerator.MoveNextAsync(ct))
                {
                    if (enumerator.Current.Value.IdCardNo == idCardNo)
                    {
                        var item = enumerator.Current.Value.UpdatePassword(newPwd);

                        await users.SetAsync(tx, item.Id, item);
                        await tx.CommitAsync();
                        await LogAndPublishUpdateEvent(item);

                        return _mapper.Map<UserItemDto>(item);
                    }
                }
            }
            return null;
        }

        public async Task<bool> IsUsernameExistedAsync(string username, CancellationToken ct = default(CancellationToken))
        {
            var users = await _stateManager.GetOrAddAsync<IReliableDictionary<ItemId, UserItem>>(DictionaryName);
            using (var tx = _stateManager.CreateTransaction())
            {
                var enumerator = (await users.CreateEnumerableAsync(tx)).GetAsyncEnumerator();
                while (await enumerator.MoveNextAsync(ct))
                {
                    if (enumerator.Current.Value.Username == username) return true;
                }
            }
            return false;
        }

        public async Task<bool> IsMobileExistedAsync(string mobile, CancellationToken ct = default(CancellationToken))
        {
            var users = await _stateManager.GetOrAddAsync<IReliableDictionary<ItemId, UserItem>>(DictionaryName);
            using (var tx = _stateManager.CreateTransaction())
            {
                var enumerator = (await users.CreateEnumerableAsync(tx)).GetAsyncEnumerator();
                while (await enumerator.MoveNextAsync(ct))
                {
                    if (enumerator.Current.Value.Mobile == mobile) return true;
                }
            }
            return false;
        }

        public async Task<bool> IsIDCardNoExistedAsync(string idCardNo, CancellationToken ct = default(CancellationToken))
        {
            var users = await _stateManager.GetOrAddAsync<IReliableDictionary<ItemId, UserItem>>(DictionaryName);
            using (var tx = _stateManager.CreateTransaction())
            {
                var enumerator = (await users.CreateEnumerableAsync(tx)).GetAsyncEnumerator();
                while (await enumerator.MoveNextAsync(ct))
                {
                    if (enumerator.Current.Value.IdCardNo == idCardNo) return true;
                }
            }
            return false;
        }

        public async Task<bool> CheckPasswordAsync(ItemId itemId, string password)
        {
            var users = await _stateManager.GetOrAddAsync<IReliableDictionary<ItemId, UserItem>>(DictionaryName);
            using (var tx = _stateManager.CreateTransaction())
            {
                var current = await users.TryGetValueAsync(tx, itemId);
                if (current.HasValue)
                {
                    var result = current.Value.VerifyPassword(password);
                    var item = current.Value.UpdateLoginStatus(result);
                    await users.SetAsync(tx, itemId, item);
                    await tx.CommitAsync();
                    return result;
                }
            }
            return false;
        }

        public async Task<UserItemDto> UnlockUserAsync(ItemId itemId)
        {
            var users = await _stateManager.GetOrAddAsync<IReliableDictionary<ItemId, UserItem>>(DictionaryName);
            using (var tx = _stateManager.CreateTransaction())
            {
                var current = await users.TryGetValueAsync(tx, itemId);
                if (current.HasValue)
                {
                    var item = current.Value.UnlockUser();
                    if (item != null)
                    {
                        await users.SetAsync(tx, itemId, item);
                        await tx.CommitAsync();
                        await LogAndPublishUpdateEvent(item);
                        return _mapper.Map<UserItemDto>(item);
                    }
                }
                return null;
            }
        }

        public async Task<UserItemDto> UpdateUserAsync(ItemId itemId, UserItemDto dto)
        {
            var users = await _stateManager.GetOrAddAsync<IReliableDictionary<ItemId, UserItem>>(DictionaryName);
            using (var tx = _stateManager.CreateTransaction())
            {
                var current = await users.TryGetValueAsync(tx, itemId);
                if (current.HasValue)
                {
                    UserItem item = null;
                    if (dto.Username != null)
                        item = current.Value.UpdateUsername(dto.Username);
                    if (dto.Password != null)
                        item = item == null ? current.Value.UpdatePassword(dto.Password) : item.UpdatePassword(dto.Password);
                    if (dto.Name != null)
                        item = item == null ? current.Value.UpdateName(dto.Name) : item.UpdateName(dto.Name);
                    if (dto.Mobile != null)
                        item = item == null ? current.Value.UpdateMobile(dto.Mobile) : item.UpdateMobile(dto.Mobile);
                    if (dto.MobileConfirmed.HasValue)
                        item = item == null ? current.Value.UpdateMobileConfirmed(dto.MobileConfirmed.Value) : item.UpdateMobileConfirmed(dto.MobileConfirmed.Value);
                    if (dto.Email != null)
                        item = item == null ? current.Value.UpdateEmail(dto.Email) : item.UpdateEmail(dto.Email);
                    if (dto.HasAdUser.HasValue)
                        item = item == null ? current.Value.UpdateHasAdUser(dto.HasAdUser.Value) : item.UpdateHasAdUser(dto.HasAdUser.Value);
                    if (dto.DepartmentId != null)
                        item = item == null ? current.Value.UpdateDepartmentId(dto.DepartmentId) : item.UpdateDepartmentId(dto.DepartmentId);
                    if (dto.EmailConfirmed.HasValue)
                        item = item == null ? current.Value.UpdateEmailConfirmed(dto.EmailConfirmed.Value) : item.UpdateEmailConfirmed(dto.EmailConfirmed.Value);
                    if (dto.Avatar != null)
                        item = item == null ? current.Value.UpdateAvatar(dto.Avatar) : item.UpdateAvatar(dto.Avatar);
                    if (dto.IdCardNo != null)
                        item = item == null ? current.Value.UpdateIdCardNo(dto.IdCardNo) : item.UpdateIdCardNo(dto.IdCardNo);
                    if (dto.EmployeeNumber != null)
                        item = item == null ? current.Value.UpdateEmployeeNumber(dto.EmployeeNumber) : item.UpdateEmployeeNumber(dto.EmployeeNumber);
                    if (dto.IsActive.HasValue)
                        item = item == null ? current.Value.UpdateIsActive(dto.IsActive.Value) : item.UpdateIsActive(dto.IsActive.Value);
                    if (dto.IsLockoutEnabled.HasValue)
                        item = item == null ? current.Value.UpdateIsLockoutEnabled(dto.IsLockoutEnabled.Value) : item.UpdateIsLockoutEnabled(dto.IsLockoutEnabled.Value);
                    if (item != null)
                    {
                        await users.SetAsync(tx, itemId, item);
                        await tx.CommitAsync();
                        await LogAndPublishUpdateEvent(item);

                        return _mapper.Map<UserItemDto>(item);
                    }
                }
            }
            return null;
        }

        public async Task<List<UserItemDto>> GetAllUserItem(UserQueryInput input)
        {
            var users = await _stateManager.GetOrAddAsync<IReliableDictionary<ItemId, UserItem>>(DictionaryName);
            List<UserItemDto> list = new List<UserItemDto>();
            using (var tx = _stateManager.CreateTransaction())
            {
                var enumerator = (await users.CreateEnumerableAsync(tx)).GetAsyncEnumerator();
                CancellationToken ct = default(CancellationToken);
                while (await enumerator.MoveNextAsync(ct))
                {
                    var currentUser = enumerator.Current.Value;
                    if (input.CheckCriteria(currentUser))
                        list.Add(_mapper.Map<UserItemDto>(currentUser));
                }
            }
            return list;
        }

        //NOTE 更好的做法是，是在Client中把待处理的数据和分区AppService对应好，调用远程方法的时候仅传入此分区的数据
        public async Task InitEmployeeMdmIdAsync(Dictionary<Guid, Guid> userIdToEmployeeMdmIdMapping)
        {
            var users = await _stateManager.GetOrAddAsync<IReliableDictionary<ItemId, UserItem>>(DictionaryName);
            using (var tx = _stateManager.CreateTransaction())
            {
                var enumerator = (await users.CreateEnumerableAsync(tx)).GetAsyncEnumerator();
                CancellationToken ct = default(CancellationToken);
                while (await enumerator.MoveNextAsync(ct))
                {
                    var currentUser = enumerator.Current.Value;
                    var userId = currentUser.Id.ToGuid();
                    if (userIdToEmployeeMdmIdMapping.ContainsKey(userId))
                    {
                        var updatedUser = currentUser.UpdateEmployeeMdmId(userIdToEmployeeMdmIdMapping[userId]);
                        await users.SetAsync(tx, currentUser.Id, updatedUser);
                    }
                }
                await tx.CommitAsync();
            }
        }

        private async Task PublishAsync<T>(object obj) where T : class
        {
            foreach (var bus in _buses)
            {
                await bus.Publish<T>(obj);
            }
        }
    }
}
