using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ManageConsoleWeb.Model
{
    public class ResourceOutputDto
    {       
        public ResourceOutputDto(ICollection<IdentityResourceOutputDto> identityResources, ICollection<ApiResourceOutputDto> apiResources)
        {
            IdentityResources = identityResources;
            ApiResources = apiResources;
        }

        //
        // 摘要:
        //     Gets or sets the identity resources.
        public ICollection<IdentityResourceOutputDto> IdentityResources { get; set; }
        //
        // 摘要:
        //     Gets or sets the API resources.
        public ICollection<ApiResourceOutputDto> ApiResources { get; set; }
    }
}
