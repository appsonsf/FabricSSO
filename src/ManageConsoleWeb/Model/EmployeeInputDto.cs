using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ManageConsoleWeb.Model
{
    public class EmployeeSearchDto
    {

        public string Name { get; set; }

        public string Number { get; set; }

        public string IdCardNo { get; set; }

        public int? PageIndex { get; set; }

        public int? PageSize { get; set; }
    }
}
