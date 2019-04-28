using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ManageConsoleWeb.Model
{
    public class ApiResourceOutputDto
    {
        //
        // 摘要:
        //     Indicates if this resource is enabled. Defaults to true.
        public bool Enabled { get; set; }
        //
        // 摘要:
        //     The unique name of the resource.
        public string Name { get; set; }
        //
        // 摘要:
        //     Display name of the resource.
        public string DisplayName { get; set; }
        //
        // 摘要:
        //     Description of the resource.
        public string Description { get; set; }
        //
        // 摘要:
        //     List of accociated user claims that should be included when this resource is
        //     requested.
        public ICollection<string> UserClaims { get; set; }
    }
}
