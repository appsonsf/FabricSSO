using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ManageConsoleWeb.Model
{
    public class UserRemoveRolesInputDto
    {
        public string UserId { get; set; }

        public List<string> RoleIds { get; set; }
    }
}
