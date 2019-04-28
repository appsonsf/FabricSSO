using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.ServiceFabric.Services.Remoting;
using ServiceFabricContrib;

namespace Sso.Remoting.Domains.Services
{
    public interface IUserDomainService : IService
    {
        /// <summary>
        /// 获取分区内部所有的用户数据
        /// </summary>
        /// <returns></returns>
        Task<IList<UserItem>> GetAllUsersAsync();

    }
}
