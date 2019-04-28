using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Sso.Remoting.Models;

namespace ProfileStateService.Internal
{
    public interface IUserDataStorageService
    {
        /// <summary>
        /// 保存用户数据接口
        /// </summary>
        /// <param name="file"></param>
        /// <returns></returns>
        Task SaveUserDataAsync(UserDataFileDto file, Stream stream);
    }
}
