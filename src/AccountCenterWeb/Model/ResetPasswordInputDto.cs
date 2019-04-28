using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AccountCenterWeb.Model
{
    public class ResetPasswordInputDto
    {
        public string Name { get; set; }

        public string IdCardNo { get; set; }

        public string Password1 { get; set; }

        public string Password2 { get; set; }
    }
}
