using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ManageConsoleWeb.Model
{
    public class IdentityResourceOutputDto
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
        //     Specifies whether the user can de-select the scope on the consent screen (if
        //     the consent screen wants to implement such a feature). Defaults to false.
        public bool Required { get; set; }
        //
        // 摘要:
        //     Specifies whether the consent screen will emphasize this scope (if the consent
        //     screen wants to implement such a feature). Use this setting for sensitive or
        //     important scopes. Defaults to false.
        public bool Emphasize { get; set; }
        //
        // 摘要:
        //     Specifies whether this scope is shown in the discovery document. Defaults to
        //     true.
        public bool ShowInDiscoveryDocument { get; set; }
        //
        // 摘要:
        //     List of accociated user claims that should be included when this resource is
        //     requested.
        public ICollection<string> UserClaims { get; set; }
    }
}
