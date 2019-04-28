using Hangfire;
using ManageConsoleWeb.HangfireJobs;
using ManageConsoleWeb.InitalData;
using MassTransit;
using AppsOnSF.Common.BaseServices;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using OpenApiClient.MdmDataDistribute;
using ServiceFabricContrib;
using Sso.Remoting;
using Sso.Remoting.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Constants = Sso.Remoting.Constants;

namespace ManageConsoleWeb.Controllers
{
    [Produces("application/json")]
    [Route("api/IntialData")]
    public class IntialDataController : Controller
    {
        private readonly IUserAppServiceClient _userAppServiceClient;
        private readonly ILogger<IntialDataController> _logger;
        private readonly IRemotingClient _remotingClient;
        private readonly ISimpleKeyValueService _keyValueService;
        private readonly IContactsClient _contactsClient;

        public IntialDataController(
            IRemotingClient remotingClient,
            IUserAppServiceClient userAppServiceClient,
            IContactsClient contactsClient,
            ISimpleKeyValueService keyValueService,
            ILogger<IntialDataController> logger)
        {
            _userAppServiceClient = userAppServiceClient;
            _logger = logger;
            _remotingClient = remotingClient;
            _keyValueService = keyValueService;
            _contactsClient = contactsClient;
        }

        private const string tokenStr = "013469bb16a2404889bf3e613e429f06";

        [HttpGet("Seed")]
        public async Task<IActionResult> SeedDataAsync(Guid token, bool prod = false)
        {
            if (token != new Guid(tokenStr)) return BadRequest("token is wrong");

            var createdOrUpdateUsers = false;
            try
            {
                var users = new List<UserItemDto> {
                    new UserItemDto{
                        IdCardNo="",
                        Username="sso_admin",
                        Password="FabricSSO",
                        Name="单点登录后台管理员",
                        Mobile="13388888888",
                        Email="sso_admin@mail.com",
                        Id=new ItemId(NewId.NextGuid())
                    }
                };

                foreach (var user in users)
                {
                    var (existedUser, existedUserAppService) = await _userAppServiceClient.FindByUsernameAsync(user.Username);
                    if (existedUser == null)
                    {
                        var userAppService = _remotingClient.CreateUserAppService(user.Id);
                        await userAppService.CreateUserAsync(user);
                    }
                    else
                    {
                        await existedUserAppService.UpdateUserAsync(existedUser.Id, user);
                    }
                }

                createdOrUpdateUsers = true;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
            }

            var createdClients = -1;
            try
            {
                var clientAppService = _remotingClient.CreateClientAppService();
                createdClients = await clientAppService.CreateClientsAsync(Clients.Get());
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
            }

            var createdIdentityResources = -1;
            try
            {
                var resourceAppService = _remotingClient.CreateResourceAppService();
                createdIdentityResources = await resourceAppService.CreateIdentityResourcesAsync(Resources.GetIdentityResources());
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
            }

            var createdApiResource = -1;
            try
            {
                var resourceAppService = _remotingClient.CreateResourceAppService();
                createdApiResource = await resourceAppService.CreateApiResourcesAsync(Resources.GetApiResources());
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
            }

            return Ok(new { createdOrUpdateUsers, createdClients, createdApiResource, createdIdentityResources });
        }

        [HttpGet("PublishUsers")]
        public IActionResult PublishUsers(Guid token)
        {
            if (token != new Guid(tokenStr)) return BadRequest("token is wrong");

            var id = "1A8E3BE5-4900-4D58-AD4A-EFC03EFD713B";
            RecurringJob.AddOrUpdate<IPublishUsers>(id, u => u.DoAction(), "0 8,20 * * *");
            return Ok("Ok");
        }

        [HttpGet("InitEmployeeMdmIdForUser")]
        public async Task<IActionResult> InitEmployeeMdmIdForUser(Guid token)
        {
            if (token != new Guid(tokenStr)) return BadRequest("token is wrong");

            try
            {
                var contacts = await _contactsClient.GetAllAsync(true);
                var userIdToEmployeeMdmIdMapping = contacts.ToDictionary(o => o.UserId.Value, o => o.Id);
                var tasks = new List<Task>();
                foreach (var appService in await _remotingClient.CreateAllUserAppServicesAsync())
                {
                    tasks.Add(appService.InitEmployeeMdmIdAsync(userIdToEmployeeMdmIdMapping));
                }

                await Task.WhenAll(tasks);
            }
            catch (Exception e)
            {
                return Ok(e.ToString());
            }
            return Ok("Ok");
        }
    }
}