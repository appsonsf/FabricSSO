using IdentityServer4.EntityFramework.Mappers;
using IdentityServer4.Models;
using Microsoft.EntityFrameworkCore;
using Sso.Remoting;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ConfigService
{
    public class PersistedGrantAppService : IPersistedGrantAppService
    {
        private readonly Func<ServiceDbContext> _contextFactory;

        public PersistedGrantAppService(
            Func<ServiceDbContext> contextFactory)
        {
            _contextFactory = contextFactory;
        }

        public async Task<List<PersistedGrant>> GetAllAsync(string subjectId)
        {
            using (var db = _contextFactory())
            {
                var persistedGrants = await db.PersistedGrants.Where(x => x.SubjectId == subjectId).ToListAsync();
                var model = persistedGrants?.Select(x => x.ToModel()).ToList();

                //_logger.LogDebug("{persistedGrantCount} persisted grants found for {subjectId}", persistedGrants.Count, subjectId);

                return model;
            }
        }

        public async Task<PersistedGrant> GetAsync(string key)
        {
            using (var db = _contextFactory())
            {
                var persistedGrant = await db.PersistedGrants.FirstOrDefaultAsync(x => x.Key == key);
                var model = persistedGrant?.ToModel();

                //_logger.LogDebug("{persistedGrantKey} found in database: {persistedGrantKeyFound}", key, model != null);

                return model;
            }
        }

        public async Task RemoveAllAsync(string subjectId, string clientId)
        {
            using (var db = _contextFactory())
            {
                var persistedGrants = await db.PersistedGrants.
                    Where(x => x.SubjectId == subjectId && x.ClientId == clientId).ToListAsync();

                //_logger.LogDebug("removing {persistedGrantCount} persisted grants from database for subject {subjectId}, clientId {clientId}", persistedGrants.Count, subjectId, clientId);

                db.PersistedGrants.RemoveRange(persistedGrants);

                try
                {
                    db.SaveChanges();
                }
                catch (DbUpdateConcurrencyException ex)
                {
                    //_logger.LogInformation("removing {persistedGrantCount} persisted grants from database for subject {subjectId}, clientId {clientId}: {error}", persistedGrants.Count, subjectId, clientId, ex.Message);
                }
            }
        }

        public async Task RemoveAllByTypeAsync(string subjectId, string clientId, string type)
        {
            using (var db = _contextFactory())
            {
                var persistedGrants = await db.PersistedGrants.Where(x =>
                  x.SubjectId == subjectId &&
                  x.ClientId == clientId &&
                  x.Type == type).ToListAsync();

                //_logger.LogDebug("removing {persistedGrantCount} persisted grants from database for subject {subjectId}, clientId {clientId}, grantType {persistedGrantType}", persistedGrants.Count, subjectId, clientId, type);

                db.PersistedGrants.RemoveRange(persistedGrants);

                try
                {
                    db.SaveChanges();
                }
                catch (DbUpdateConcurrencyException ex)
                {
                    //_logger.LogInformation("exception removing {persistedGrantCount} persisted grants from database for subject {subjectId}, clientId {clientId}, grantType {persistedGrantType}: {error}", persistedGrants.Count, subjectId, clientId, type, ex.Message);
                }
            }
        }

        public async Task RemoveAsync(string key)
        {
            using (var db = _contextFactory())
            {
                var persistedGrant = await db.PersistedGrants.FirstOrDefaultAsync(x => x.Key == key);
                if (persistedGrant != null)
                {
                    //_logger.LogDebug("removing {persistedGrantKey} persisted grant from database", key);

                    db.PersistedGrants.Remove(persistedGrant);

                    try
                    {
                        db.SaveChanges();
                    }
                    catch (DbUpdateConcurrencyException ex)
                    {
                        //_logger.LogInformation("exception removing {persistedGrantKey} persisted grant from database: {error}", key, ex.Message);
                    }
                }
                else
                {
                    //_logger.LogDebug("no {persistedGrantKey} persisted grant found in database", key);
                }
            }
        }

        public async Task StoreAsync(PersistedGrant token)
        {
            using (var db = _contextFactory())
            {
                var existing = await db.PersistedGrants.SingleOrDefaultAsync(x => x.Key == token.Key);
                if (existing == null)
                {
                    //_logger.LogDebug("{persistedGrantKey} not found in database", token.Key);

                    var persistedGrant = token.ToEntity();
                    db.PersistedGrants.Add(persistedGrant);
                }
                else
                {
                    //_logger.LogDebug("{persistedGrantKey} found in database", token.Key);

                    token.UpdateEntity(existing);
                }

                try
                {
                    db.SaveChanges();
                }
                catch (DbUpdateConcurrencyException ex)
                {
                    //_logger.LogWarning("exception updating {persistedGrantKey} persisted grant in database: {error}", token.Key, ex.Message);
                }
            }
        }
    }
}
