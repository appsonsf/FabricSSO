using IdentityServer4.EntityFramework.Interfaces;
using IdentityServer4.EntityFramework.Mappers;
using IdentityServer4.Models;
using AppsOnSF.Common.Utilities;
using Microsoft.EntityFrameworkCore;
using Serilog;
using ServiceFabricContrib;
using Sso.Remoting;
using Sso.Remoting.Models;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ConfigService
{
    public class ClientAppService : IClientAppService
    {
        private readonly Func<ServiceDbContext> _contextFactory;

        #region Client
        public ClientAppService(
            Func<ServiceDbContext> contextFactory)
        {
            _contextFactory = contextFactory;
        }

        public async Task<int> CreateClientsAsync(List<Client> input)
        {
            using (var db = _contextFactory())
            {
                try
                {
                    foreach (var dto in input)
                    {
                        if (!await db.Clients.AnyAsync(o => o.ClientId == dto.ClientId))
                            db.Clients.Add(dto.ToEntity());
                    }
                    return await db.SaveChangesAsync();
                }
                catch (Exception ex)
                {
                    //Trace.TraceWarning(ex.Message);
                    Log.Warning(ex, "CreateClientsAsync Error");
                    return -1;
                }
            }
        }

        public async Task<int> UpdateClientsAsync(List<Client> input)
        {
            using (var db = _contextFactory())
            {
                foreach (var dto in input)
                {
                    IdentityServer4.EntityFramework.Entities.Client entity = null;
                    if (dto.ClientSecrets != null && dto.ClientSecrets.Count >= 1 && !string.IsNullOrEmpty(dto.ClientSecrets.First().Value))
                    {
                        entity = db.Clients
                            .Include(x => x.AllowedGrantTypes)
                            .Include(x => x.RedirectUris)
                            .Include(x => x.PostLogoutRedirectUris)
                            .Include(x => x.AllowedScopes)
                            .Include(x => x.ClientSecrets)
                            .Where(s => s.ClientId == dto.ClientId).FirstOrDefault();
                    }
                    else
                    {
                        entity = db.Clients
                            .Include(x => x.AllowedGrantTypes)
                            .Include(x => x.RedirectUris)
                            .Include(x => x.PostLogoutRedirectUris)
                            .Include(x => x.AllowedScopes)
                            .Where(s => s.ClientId == dto.ClientId).FirstOrDefault();
                    }


                    db.ClientGrantType.RemoveRange(entity.AllowedGrantTypes);
                    db.ClientPostLogoutRedirectUri.RemoveRange(entity.PostLogoutRedirectUris);
                    db.ClientRedirectUri.RemoveRange(entity.RedirectUris);
                    if (entity.ClientSecrets != null)
                        db.ClientSecret.RemoveRange(entity.ClientSecrets);
                    db.ClientScope.RemoveRange(entity.AllowedScopes);
                    var inputEntity = dto.ToEntity();
                    entity.ClientName = inputEntity.ClientName;
                    var FirstSecrts = inputEntity.ClientSecrets.FirstOrDefault();
                    if (FirstSecrts != null && !string.IsNullOrEmpty(FirstSecrts.Value))
                    {
                        entity.ClientSecrets = inputEntity.ClientSecrets;
                    }
                    // else entity.ClientSecrets = entity.ClientSecrets;
                    entity.AllowedGrantTypes = inputEntity.AllowedGrantTypes;
                    entity.AllowedScopes = inputEntity.AllowedScopes;
                    entity.RedirectUris = inputEntity.RedirectUris;
                    entity.PostLogoutRedirectUris = inputEntity.PostLogoutRedirectUris;
                    db.Clients.Update(entity);
                }
                return await db.SaveChangesAsync();
            }
        }

        public async Task<bool> DeleteClientsAsync(string clientId)
        {
            using (var db = _contextFactory())
            {
                var client = await db.Clients.Where(x => x.ClientId == clientId).FirstOrDefaultAsync();

                //_logger.LogDebug("removing {persistedGrantCount} persisted grants from database for subject {subjectId}, clientId {clientId}", persistedGrants.Count, subjectId, clientId);

                db.Clients.Remove(client);

                try
                {
                    return db.SaveChanges() > 0;
                }
                catch (DbUpdateConcurrencyException ex)
                {
                    //_logger.LogInformation("removing {persistedGrantCount} persisted grants from database for subject {subjectId}, clientId {clientId}: {error}", persistedGrants.Count, subjectId, clientId, ex.Message);
                    return false;
                }
            }
        }

        public async Task<Client> FindClientByIdAsync(string clientId)
        {
            using (var db = _contextFactory())
            {
                using (StopwatchLog.Track())
                {
                    var client = await db.Clients
                   .Include(x => x.AllowedGrantTypes)
                   .Include(x => x.RedirectUris)
                   .Include(x => x.PostLogoutRedirectUris)
                   .Include(x => x.AllowedScopes)
                   .Include(x => x.ClientSecrets)
                   .Include(x => x.Claims)
                   .Include(x => x.IdentityProviderRestrictions)
                   .Include(x => x.AllowedCorsOrigins)
                   .Include(x => x.Properties)
                   .FirstOrDefaultAsync(x => x.ClientId == clientId);

                    return client?.ToModel();
                }
            }
        }

        public async Task<Client> FindClientByNameAsync(string name)
        {
            using (var db = _contextFactory())
            {
                var client = await db.Clients
                    .Include(x => x.AllowedGrantTypes)
                    .Include(x => x.RedirectUris)
                    .Include(x => x.PostLogoutRedirectUris)
                    .Include(x => x.AllowedScopes)
                    .Include(x => x.ClientSecrets)
                    .Include(x => x.Claims)
                    .Include(x => x.IdentityProviderRestrictions)
                    .Include(x => x.AllowedCorsOrigins)
                    .Include(x => x.Properties)
                    .FirstOrDefaultAsync(x => x.ClientName == name);

                return client?.ToModel();
            }
        }

        public async Task<List<Client>> GetAllClientAsync()
        {
            using (var db = _contextFactory())
            {
                var client = await db.Clients
                   .Include(x => x.AllowedGrantTypes)
                   .Include(x => x.RedirectUris)
                   .Include(x => x.PostLogoutRedirectUris)
                   .Include(x => x.AllowedScopes)
                   .Include(x => x.ClientSecrets)
                   .Include(x => x.Claims)
                   .Include(x => x.IdentityProviderRestrictions)
                   .Include(x => x.AllowedCorsOrigins)
                   .Include(x => x.Properties).ToListAsync();
                return client?.Select(x => x.ToModel()).ToList();
            }
        }

        public async Task<int> GetClientCountAsync()
        {
            using (var db = _contextFactory())
            {
                return await db.Clients.CountAsync();
            }
        }
        #endregion
    }
}
