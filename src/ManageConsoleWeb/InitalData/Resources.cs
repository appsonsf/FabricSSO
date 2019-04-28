// Copyright (c) Brock Allen & Dominick Baier. All rights reserved.
// Licensed under the Apache License, Version 2.0. See LICENSE in the project root for license information.


using IdentityModel;
using IdentityServer4.Models;
using System.Collections.Generic;

namespace ManageConsoleWeb.InitalData
{
    public static class Resources
    {
        public static List<IdentityResource> GetIdentityResources()
        {
            return new List<IdentityResource>()
            {
                // some standard scopes from the OIDC spec
                new IdentityResources.OpenId(),
                new IdentityResources.Profile(),
                new IdentityResources.Email(),
                new IdentityResources.Phone(),
                new IdentityResources.Address(),
                // custom identity resource with some consolidated claims
                new IdentityResource("profile.ext", new[] { "idcard_number","employee_number", "employee_mdmid", "role" })
                {
                    DisplayName ="用户额外信息",
                    Description ="如果需要获取身份证、员工号、员工主数据ID、角色，必须包含此资源"
                }
            };
        }

        public static List<ApiResource> GetApiResources()
        {
            return new List<ApiResource>()
            {
                new ApiResource("sso.sts","单点登录安全令牌服务")
            };
        }
    }
}