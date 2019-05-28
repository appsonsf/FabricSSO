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
            var openid =new IdentityResources.OpenId();
            var profile = new IdentityResources.Profile();
            var email = new IdentityResources.Email();
            var phone = new IdentityResources.Phone();
            var address = new IdentityResources.Address();
            return new List<IdentityResource>()
            {
                new IdentityResource(openid.Name, openid.UserClaims)
                {
                    DisplayName ="用户Id",
                },
                new IdentityResource(profile.Name, profile.UserClaims)
                {
                    DisplayName ="用户信息",
                },
                new IdentityResource(email.Name, email.UserClaims)
                {
                    DisplayName ="用户Email信息",
                },
                new IdentityResource(phone.Name, phone.UserClaims)
                {
                    DisplayName ="用户电话信息",
                },
                new IdentityResource(address.Name, address.UserClaims)
                {
                    DisplayName ="用户地址信息",
                },
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