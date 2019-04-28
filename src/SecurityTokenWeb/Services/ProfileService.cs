using IdentityModel;
using IdentityServer4.Extensions;
using IdentityServer4.Models;
using IdentityServer4.Services;
using AppsOnSF.Common.Utilities;
using ServiceFabricContrib;
using Sso.Remoting;
using Sso.Remoting.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace SecurityTokenWeb.Services
{
    public class ProfileService : IProfileService
    {
        private readonly IRemotingClient _remoteServiceClient;

        public ProfileService(
            IRemotingClient remoteServiceClient)
        {
            _remoteServiceClient = remoteServiceClient;
        }

        private async Task TryGetUser(ClaimsPrincipal subject, Func<UserItemDto, Task> process)
        {
            var sub = subject?.GetSubjectId();
            if (sub == null) throw new Exception("No sub claim present");

            var builder = new ServiceUriBuilder(Sso.Remoting.Constants.ServiceName_ProfileStateService);

            var itemId = new ItemId(new Guid(sub));

            UserItemDto user = null;
            await StopwatchLog.TrackFuncAsync(async () => user = await _remoteServiceClient.CreateUserAppService(itemId).FindByIdAsync(itemId));
            if (user == null)
            {
                ServiceEventSource.Current.Message("No user found matching subject Id: {0}", sub);
            }
            else
            {
                await process(user);
            }
        }

        private async Task<string> GetRoles(ItemId userId)
        {
            List<RoleDto> _userRoles = null;
            await StopwatchLog.TrackFuncAsync(async () => _userRoles = await _remoteServiceClient.CreateUserRoleAppService().FindRolesByUserIdAsync(userId.ToString()));
            if (_userRoles.Count > 0)
            {
                return string.Join(",", _userRoles.Select(p => p.ID));
            }
            return null;
        }

        public async Task GetProfileDataAsync(ProfileDataRequestContext context)
        {
            await TryGetUser(context.Subject, async (user) =>
             {
                 var claims = new List<Claim>();
                 foreach (var res in context.RequestedResources.IdentityResources)
                 {
                     foreach (var claim in res.UserClaims)
                     {
                         switch (claim)
                         {
                             case JwtClaimTypes.Id:
                                 claims.Add(new Claim(JwtClaimTypes.Id, user.Id.ToString()));
                                 break;
                             case JwtClaimTypes.Subject:
                                 claims.Add(new Claim(JwtClaimTypes.Subject, user.Id.ToString()));
                                 break;
                             case JwtClaimTypes.Name:
                                 claims.Add(new Claim(JwtClaimTypes.Name, user.Name ?? ""));
                                 break;
                             case JwtClaimTypes.PhoneNumber:
                                 claims.Add(new Claim(JwtClaimTypes.PhoneNumber, user.Mobile ?? ""));
                                 break;
                             case JwtClaimTypes.PhoneNumberVerified:
                                 claims.Add(new Claim(JwtClaimTypes.PhoneNumberVerified, "true"));
                                 break;
                             case "idcard_number":
                                 claims.Add(new Claim("idcard_number", user.IdCardNo ?? ""));
                                 break;
                             case "employee_number":
                                 claims.Add(new Claim("employee_number", user.EmployeeNumber ?? ""));
                                 break;
                             case "employee_mdmid":
                                 claims.Add(new Claim("employee_mdmid", user.EmployeeMdmId.HasValue ? user.EmployeeMdmId.Value.ToString() : ""));
                                 break;
                             case JwtClaimTypes.PreferredUserName:
                                 claims.Add(new Claim(JwtClaimTypes.PreferredUserName, user.Username));
                                 break;
                             case JwtClaimTypes.Email:
                                 claims.Add(new Claim(JwtClaimTypes.Email, user.Email ?? ""));
                                 break;
                             case JwtClaimTypes.EmailVerified:
                                 claims.Add(new Claim(JwtClaimTypes.EmailVerified, "true"));
                                 break;
                             case JwtClaimTypes.Picture:
                                 claims.Add(new Claim(JwtClaimTypes.Picture, user.Avatar ?? ""));
                                 break;
                             case JwtClaimTypes.Role:
                                 var roles = await GetRoles(user.Id);
                                 if (roles != null) claims.Add(new Claim(JwtClaimTypes.Role, roles));
                                 break;
                             default:
                                 break;
                         }
                     }

                 }
                 //context.AddRequestedClaims(claims);
                 context.IssuedClaims.AddRange(claims);
             });
        }

        public async Task IsActiveAsync(IsActiveContext context)
        {
            await TryGetUser(context.Subject, (user) =>
            {
                context.IsActive = user.IsActive ?? false;
                return Task.CompletedTask;
            });
        }
    }
}
