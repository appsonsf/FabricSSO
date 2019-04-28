using IdentityServer4.Services;
using IdentityServer4.Stores;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;
using SecurityTokenWeb.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SecurityTokenWeb.Extensions
{
    public static class IdentityServerBuilderExtensions
    {
        public static IIdentityServerBuilder AddConfigurationStore(this IIdentityServerBuilder builder)
        {
            builder.AddClientStoreCache<ClientStore>();
            builder.AddResourceStoreCache<ResourceStore>();
            //builder.Services.AddTransient<IPersistedGrantStore, PersistedGrantStore>();
            return builder;
        }
    }
}
