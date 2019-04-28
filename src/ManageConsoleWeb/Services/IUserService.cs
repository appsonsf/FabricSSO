using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ManageConsoleWeb.Model;
using ManageConsoleWeb.Services.Model;

namespace ManageConsoleWeb.Services
{
    public interface IUserService
    {
        Task<CreateUserResult> CreateUserAsync(UserItemInputDto input);
    }
}
