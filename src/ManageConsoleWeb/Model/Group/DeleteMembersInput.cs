using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ManageConsoleWeb.Model.Group
{
    public class DeleteMembersInput
    {
        public int GroupId { get; set; }

        public List<string> MemberIds { get; set; }
    }
}
