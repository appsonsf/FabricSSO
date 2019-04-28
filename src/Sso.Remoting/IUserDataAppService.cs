using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.ServiceFabric.Services.Remoting;
using Sso.Remoting.Models;

namespace Sso.Remoting
{
    public interface IUserDataAppService: IService
    {
        //导出用户数据
        Task ExportUserDataAsync(string timeStamp);

    }
}
