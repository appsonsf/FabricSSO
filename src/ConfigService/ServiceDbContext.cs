using ConfigService.Entities;
using IdentityServer4.EntityFramework.Entities;
using IdentityServer4.EntityFramework.Extensions;
using IdentityServer4.EntityFramework.Options;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace ConfigService
{
    public class ServiceDbContext : DbContext
    {
        private readonly string _connectionString;

        public ServiceDbContext()
        {
            _connectionString = @"Data Source=(local)\SQLEXPRESS;Initial Catalog=SsoSfApp_ConfigDb;Integrated Security=True;MultipleActiveResultSets=true";
        }

        public ServiceDbContext(DbContextOptions<ServiceDbContext> options) : base(options)
        {

        }

        public ServiceDbContext(string connectionString)
        {
            _connectionString = connectionString;
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
                optionsBuilder.UseSqlServer(_connectionString);
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            var configStoreOptions = new ConfigurationStoreOptions();
            modelBuilder.ConfigureClientContext(configStoreOptions);
            modelBuilder.ConfigureResourcesContext(configStoreOptions);

            var operaStoreOptions = new OperationalStoreOptions();
            modelBuilder.ConfigurePersistedGrantContext(operaStoreOptions);
            modelBuilder.Entity<UserRole>().HasKey(t => new { t.RoleID, t.UserID });
            base.OnModelCreating(modelBuilder);
        }
        /// <summary>
        /// Gets or sets the clients.
        /// </summary>
        /// <value>
        /// The clients.
        /// </value>
        public DbSet<Client> Clients { get; set; }
        public DbSet<ClientGrantType> ClientGrantType { get; set; }
        public DbSet<ClientRedirectUri> ClientRedirectUri { get; set; }
        public DbSet<ClientPostLogoutRedirectUri> ClientPostLogoutRedirectUri { get; set; }
        public DbSet<ClientScope> ClientScope { get; set; }
        public DbSet<ClientSecret> ClientSecret { get; set; }


        /// <summary>
        /// Gets or sets the identity resources.
        /// </summary>
        /// <value>
        /// The identity resources.
        /// </value>
        public DbSet<IdentityResource> IdentityResources { get; set; }
        /// <summary>
        /// Gets or sets the API resources.
        /// </summary>
        /// <value>
        /// The API resources.
        /// </value>
        public DbSet<ApiResource> ApiResources { get; set; }

        public DbSet<ApiScope> ApiScope { get; set; }
        public DbSet<ApiResourceClaim> ApiResourceClaim { get; set; }
        public DbSet<ApiSecret> ApiSecret { get; set; }
        /// <summary>
        /// Gets or sets the persisted grants.
        /// </summary>
        /// <value>
        /// The persisted grants.
        /// </value>
        public DbSet<PersistedGrant> PersistedGrants { get; set; }

        public DbSet<IdentityClaim> IdentityClaims { get; set; }


        #region 角色
        /// <summary>
        /// 系统角色
        /// </summary>
        public DbSet<SystemRole> SystemRoles { get; set; }
        /// <summary>
        /// 用户角色
        /// </summary>
        public DbSet<UserRole> UserRoles { get; set; }
        #endregion

    }
}
