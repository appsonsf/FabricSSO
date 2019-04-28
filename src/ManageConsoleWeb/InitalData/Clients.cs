// Copyright (c) Brock Allen & Dominick Baier. All rights reserved.
// Licensed under the Apache License, Version 2.0. See LICENSE in the project root for license information.


using IdentityServer4;
using IdentityServer4.Models;
using System.Collections.Generic;

namespace ManageConsoleWeb.InitalData
{
    public static class Clients
    {
        public static List<Client> Get()
        {
            var clients = new List<Client>
            {
                new Client
                {
                    ClientId = "sso.mc",
                    ClientName = "SSO Management Console Client (Don't Delete)",
                    ClientSecrets =
                    {
                        new Secret("sso_mc".Sha256())
                    },
                    RequireConsent = false,
                    AllowedGrantTypes = GrantTypes.Hybrid,
                    AllowedScopes =
                    {
                        IdentityServerConstants.StandardScopes.OpenId,
                        IdentityServerConstants.StandardScopes.Profile,
                        "profile.ext"
                    },
                    RedirectUris =
                    {
                        "http://localhost:10102/signin-oidc",
                    },
                },
            };

            return clients;
        }
    }
}