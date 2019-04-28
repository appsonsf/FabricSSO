using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Threading.Tasks;

namespace ManageConsoleWeb.Model
{
    public class RoleDto
    {
        [DataMember]
        public string ID { get; set; }

        [DataMember]
        public string Name { get; set; }
    }
}
