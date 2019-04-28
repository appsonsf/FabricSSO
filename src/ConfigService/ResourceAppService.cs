using IdentityServer4.Models;
using Sso.Remoting;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using IdentityServer4.EntityFramework.Mappers;
using System.Diagnostics;
using Serilog;

namespace ConfigService
{
    public class ResourceAppService : IResourceAppService
    {
        private readonly Func<ServiceDbContext> _contextFactory;

        public ResourceAppService(
            Func<ServiceDbContext> contextFactory)
        {
            _contextFactory = contextFactory;
        }

        public async Task<int> CreateApiResourcesAsync(List<ApiResource> resources)
        {
            using (var db = _contextFactory())
            {
                try
                {
                    foreach (var dto in resources)
                    {
                        if (!await db.ApiResources.AnyAsync(o => o.Name == dto.Name))
                            db.ApiResources.Add(dto.ToEntity());
                    }
                    return await db.SaveChangesAsync();
                }
                catch (Exception ex)
                {
                    Log.Warning(ex, "CreateApiResourcesAsync Error");
                    //Trace.TraceWarning(ex.Message);
                    return -1;
                }
            }
        }

        public async Task<int> UpdateApiResourcesAsync(List<ApiResource> resources)
        {
            try
            {
                using (var db = _contextFactory())
                {
                    foreach (var dto in resources)
                    {
                        var entity = db.ApiResources
                            .Include(x => x.Secrets)
                            .Include(x => x.Scopes)
                            .Include(x => x.UserClaims)
                            .Where(s => s.Name == dto.Name).FirstOrDefault();
                        db.ApiResourceClaim.RemoveRange(entity.UserClaims);
                        db.ApiScope.RemoveRange(entity.Scopes);
                        db.ApiSecret.RemoveRange(entity.Secrets);
                        var input = dto.ToEntity();
                        entity.Name = input.Name;
                        entity.Description = input.Description;
                        entity.DisplayName = input.DisplayName;
                        entity.Scopes = input.Scopes;
                        entity.Secrets = input.Secrets;
                        entity.UserClaims = input.UserClaims;
                        db.ApiResources.Update(entity);
                    }
                    return await db.SaveChangesAsync();
                }
            }
            catch (Exception ex)
            {
                Log.Warning(ex, "UpdateApiResourcesAsync Error");
                //Trace.TraceWarning(ex.Message);
                return -1;
            }

        }

        public async Task<int> CreateIdentityResourcesAsync(List<IdentityResource> resources)
        {
            using (var db = _contextFactory())
            {
                try
                {
                    foreach (var dto in resources)
                    {
                        if (!await db.IdentityResources.AnyAsync(o => o.Name == dto.Name))
                            db.IdentityResources.Add(dto.ToEntity());
                    }
                    return await db.SaveChangesAsync();
                }
                catch (Exception ex)
                {
                    Log.Warning(ex, "CreateApiResourcesAsync Error");
                    //Trace.TraceWarning(ex.Message);
                    return -1;
                }
            }
        }

        public async Task<int> UpdateIdentityResourcesAsync(List<IdentityResource> resources)
        {
            using (var db = _contextFactory())
            {
                foreach (var dto in resources)
                {
                    var entity = db.IdentityResources
                        .Include(x => x.UserClaims)
                        .Where(s => s.Name == dto.Name).FirstOrDefault();
                    db.IdentityClaims.RemoveRange(entity.UserClaims);
                    var input = dto.ToEntity();
                    entity.Description = input.Description;
                    entity.DisplayName = input.DisplayName;
                    entity.UserClaims = input.UserClaims;
                    db.IdentityResources.Update(entity);
                }
                return await db.SaveChangesAsync();
            }
        }

        public async Task<ApiResource> FindApiResourceAsync(string name)
        {
            using (var db = _contextFactory())
            {
                var query = from apiResource in db.ApiResources
                            where apiResource.Name == name
                            select apiResource;

                var apis = query?
                    .Include(x => x.Secrets)
                    .Include(x => x.Scopes)
                        .ThenInclude(s => s.UserClaims)
                    .Include(x => x.UserClaims);

                var api = await apis.FirstOrDefaultAsync();

                return api?.ToModel();
            }
        }

        public async Task<List<ApiResource>> FindApiResourcesByScopeAsync(List<string> scopeNames)
        {
            using (var db = _contextFactory())
            {
                var names = scopeNames.ToArray();

                var query =
                    from api in db.ApiResources
                    where api.Scopes.Where(x => names.Contains(x.Name)).Any()
                    select api;

                var apis = query?
                    .Include(x => x.Secrets)
                    .Include(x => x.Scopes)
                        .ThenInclude(s => s.UserClaims)
                    .Include(x => x.UserClaims);

                var results = await apis.ToArrayAsync();
                var models = results.Select(x => x.ToModel()).ToList();
                return models;
                //_logger.LogDebug("Found {scopes} API scopes in database", models.SelectMany(x => x.Scopes).Select(x => x.Name));
            }
        }

        public async Task<bool> DeleteApiResourceAsync(string name)
        {
            using (var db = _contextFactory())
            {
                var api = await db.ApiResources.Where(x =>
                  x.Name == name).FirstOrDefaultAsync();

                //_logger.LogDebug("removing {persistedGrantCount} persisted grants from database for subject {subjectId}, clientId {clientId}", persistedGrants.Count, subjectId, clientId);

                db.ApiResources.Remove(api);

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

        public async Task<bool> DeleteIdentityResourceAsync(string name)
        {
            using (var db = _contextFactory())
            {
                var api = await db.IdentityResources.Where(x =>
                  x.Name == name).FirstOrDefaultAsync();
                //_logger.LogDebug("removing {persistedGrantCount} persisted grants from database for subject {subjectId}, clientId {clientId}", persistedGrants.Count, subjectId, clientId);

                db.IdentityResources.Remove(api);
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

        public async Task<List<IdentityResource>> FindIdentityResourcesByScopeAsync(List<string> scopeNames)
        {
            using (var db = _contextFactory())
            {
                var scopes = scopeNames.ToArray();

                var query =
                    from identityResource in db.IdentityResources
                    where scopes.Contains(identityResource.Name)
                    select identityResource;

                var resources = query
                    .Include(x => x.UserClaims);

                var results = await resources.ToArrayAsync();
                var models = results.Select(x => x.ToModel()).ToList();
                return models;
                //_logger.LogDebug("Found {scopes} identity scopes in database", results.Select(x => x.Name));
            }
        }

        public async Task<Resources> GetAllResourcesAsync()
        {
            using (var db = _contextFactory())
            {
                var identity = db.IdentityResources
                    .Include(x => x.UserClaims);

                var apis = db.ApiResources
                    .Include(x => x.Secrets)
                    .Include(x => x.Scopes)
                        .ThenInclude(s => s.UserClaims)
                    .Include(x => x.UserClaims);


                var result = new Resources(
                    (await identity.ToArrayAsync()).Select(x => x.ToModel()).AsEnumerable(),
                    (await apis.ToArrayAsync()).Select(x => x.ToModel()).AsEnumerable());

                //_logger.LogDebug("Found {scopes} as all scopes in database", result.IdentityResources.Select(x => x.Name).Union(result.ApiResources.SelectMany(x => x.Scopes).Select(x => x.Name)));

                return result;
            }
        }
    }
}
