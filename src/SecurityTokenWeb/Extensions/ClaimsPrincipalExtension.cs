using IdentityModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace SecurityTokenWeb.Extensions
{
    public static class ClaimsPrincipalExtension
    {
        public static string GetSubId(this ClaimsPrincipal principal)
        {
            var subId = principal.FindFirstValue(JwtClaimTypes.Subject);
            if (string.IsNullOrEmpty(subId))
                subId = principal.FindFirstValue(ClaimTypes.NameIdentifier);
            return subId;
        }

        public static string GetUserName(this ClaimsPrincipal principal)
        {
            return principal.FindFirstValue(JwtClaimTypes.PreferredUserName);
        }
    }
}
