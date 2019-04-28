using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ManageConsoleWeb.Model
{
    public class SystemRoleOutPutDto
    {
        public string ID { get; set; }

        public string Name { get; set; }

        public IList<SimpeClientInfoOutPutDot> ClientIds { get; set; }
    }

    public class SimpeClientInfoOutPutDot
    {
        public string ClientId { get; set; }

        public string ClientName { get; set; }
    }
}
