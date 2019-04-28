using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ManageConsoleWeb.Model
{
    public class RoleBindUsersInputDto
    {
        public string RoleId { get; set; }

        public List<string> UserIds { get; set; }
    }
}
