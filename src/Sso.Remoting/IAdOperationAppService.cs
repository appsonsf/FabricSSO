using System.Threading.Tasks;
using Microsoft.ServiceFabric.Services.Remoting;
using ServiceFabricContrib;
using Sso.Remoting.Domains;
using Sso.Remoting.Models;

namespace Sso.Remoting
{
    public interface IAdOperationAppService : IService
    {
        /// <summary>
        /// 查询Ad操作记录
        /// </summary>
        /// <param name="Id"></param>
        /// <param name="type"></param>
        /// <returns></returns>
        Task<UserAdEventLogDto> GetUserAdEventLogAsync(ItemId Id, UserAdEventType type);

        /// <summary>
        /// 添加Ad操作记录
        /// </summary>
        /// <param name="log"></param>
        /// <returns></returns>
        Task AddOrUpdateUserAdEventLogAsync(UserAdEventLogDto log);

        /// <summary>
        /// 完成ad事件
        /// </summary>
        /// <param name="userId"></param>
        /// <param name="type"></param>
        /// <returns></returns>
        Task CompleteAdEventAsync(ItemId userId, UserAdEventType type);
    }
}