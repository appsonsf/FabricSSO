using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Sso.Remoting;
using Sso.Remoting.Models;

namespace SecurityTokenWeb.Services
{
    public interface IHandleLoginService
    {
        Task<(UserItemDto, IUserAppService)> RetrieveUserAsync(string identity);

        Task<bool> CheckTempPasswordLoginAsync(UserItemDto user, string password);

        Task<bool> CheckMobileLoginAsync(UserItemDto user, string password);

        Task<bool> CheckNormalPasswordLoginAsync(UserItemDto user, IUserAppService appService, string password);
    }
}
