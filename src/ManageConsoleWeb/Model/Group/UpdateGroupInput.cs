using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ManageConsoleWeb.Model.Group
{
    public class UpdateGroupInput
    {
        public int GroupId { get; set; }

        public string Name { get; set; }

        public string Remark { get; set; }
    }
}
