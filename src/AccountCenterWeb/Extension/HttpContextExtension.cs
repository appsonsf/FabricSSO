using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;

namespace AccountCenterWeb.Extension
{
    public static class HttpContextExtension
    {

        public static string GetIdCardNo(this HttpContext context)
        {
            var User = context.User;
            if (!User.Identity.IsAuthenticated)
                return string.Empty;
            var claim = User.Claims.FirstOrDefault(u => u.Type == "IdCardNo");
            if (claim == null)
                return string.Empty;
            return claim.Value;
        }

        public static string GetUserName(this HttpContext context)
        {
            var User = context.User;
            if (!User.Identity.IsAuthenticated)
                return string.Empty;
            var claim = User.Claims.FirstOrDefault(u => u.Type == ClaimTypes.Name);
            if (claim == null)
                return string.Empty;
            return claim.Value;
        }

        /// <summary>
        /// 获取当前用户的UserId
        /// </summary>
        /// <returns></returns>
        public static string GetUserId(this HttpContext context)
        {
            var User = context.User;
            if (!User.Identity.IsAuthenticated)
                return string.Empty;
            var claim = User.Claims.FirstOrDefault(u => u.Type == ClaimTypes.NameIdentifier);
            if (claim == null)
                return string.Empty;
            return claim.Value;
        }

        public static string GetMobile(this HttpContext context)
        {
            var User = context.User;
            if (!User.Identity.IsAuthenticated)
                return string.Empty;
            var claim = User.Claims.FirstOrDefault(u => u.Type == ClaimTypes.MobilePhone);
            if (claim == null)
                return string.Empty;
            return claim.Value;
        }
    }
}
