using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ManageConsoleWeb.Model
{
    public class UserUpdateInputDto
    {
        public string Id { get; set; }

        public string Mobile { get; set; }

        public string Password { get; set; }

        public string RePassword { get; set; }
    }
}
