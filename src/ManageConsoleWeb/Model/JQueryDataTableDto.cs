using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ManageConsoleWeb.Model
{
    public class JQueryDataTableDto
    {
        public class r_search
        {
            public string value { get; set; }
            public string regex { get; set; }
        }

        public class r_order
        {
            public string column { get; set; }
            public string dir { get; set; }
        }

        public int draw { get; set; }
        public int start { get; set; }
        public int length { get; set; }
        public r_search search { get; set; }
        public r_order order { get; set; }
        public object columns { get; set; }
    }
}
