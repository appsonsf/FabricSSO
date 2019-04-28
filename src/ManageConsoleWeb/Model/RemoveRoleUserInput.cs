using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ManageConsoleWeb.Model
{
    public class RemoveRoleUserInput
    {
        public string RoleId { get; set; }

        public List<string> UserIds { get; set; }
    }
}
