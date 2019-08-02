using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AccountCenterWeb.Model
{
    public class ModifyPasswordInputDto
    {
        public string Password { get; set; }

        public string RePassword { get; set; }

        public string Mobile { get;set; }

        public string Code { get; set; }
    }
}
