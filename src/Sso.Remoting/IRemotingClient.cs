using System.Collections.Generic;
using System.Threading.Tasks;
using ServiceFabricContrib;

namespace Sso.Remoting
{
    public interface IRemotingClient
    {
        Task<IEnumerable<IUserAppService>> CreateAllUserAppServicesAsync();
        Task<IEnumerable<IUserDataAppService>> CreateAllUserDataAppServicesAsync();
        IClientAppService CreateClientAppService();
        IPersistedGrantAppService CreatePersistedGrantAppService();
        IResourceAppService CreateResourceAppService();
        IScanLoginNotifyAppService CreateScanLoginNotifyAppService();
        ISystemRoleAppService CreateSystemRoleAppService();
        IUserAppService CreateUserAppService(ItemId itemId);
        IUserDataAppService CreateUserDataAppService(ItemId itemId);
        IUserRoleAppService CreateUserRoleAppService();
        IAdOperationAppService CreateAdOperationAppService(ItemId itemId);

    }
}