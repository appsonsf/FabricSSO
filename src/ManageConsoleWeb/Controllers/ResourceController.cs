using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using IdentityServer4.Models;
using ManageConsoleWeb.Model;
using ManageConsoleWeb.Tools;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Sso.Remoting;

namespace ManageConsoleWeb.Controllers
{
    [Authorize(Policy = "Admin")]
    [Route("/api/resource")]
    public class ResourceController : BaseController
    {
        private readonly IRemotingClient _remoteServiceClient;
        private readonly IMapper _mapper;

        public ResourceController(IRemotingClient remoteServiceClient, IMapper mapper)
        {
            _remoteServiceClient = remoteServiceClient;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<IActionResult> AllResources()
        {
            var manager = _remoteServiceClient.CreateResourceAppService();
            var resource = await manager.GetAllResourcesAsync();
            var identityResourceList = _mapper.Map<List<IdentityResourceOutputDto>>(resource.IdentityResources.ToList());
            var apiResourceList = _mapper.Map<List<ApiResourceOutputDto>>(resource.ApiResources.ToList());
            return Json(true, new ResourceOutputDto(identityResourceList, apiResourceList), "");
        }

        [HttpPost]
        public async Task<IActionResult> AddResource([FromBody] ResourceInputDto InputHrModel)
        {
            var message = string.Empty;
            var success = DataModelValidate.AddOrUpdateResourceValidate(InputHrModel, ref message);
            if (!success)
            {
                return Json(success, null, message);
            }
            var manager = _remoteServiceClient.CreateResourceAppService();
            var result = false;
            ApiResource apiResource = null;
            IdentityResource identityResource = null;
            if (!string.IsNullOrEmpty(InputHrModel.Name) && string.IsNullOrEmpty(InputHrModel.IdentityName))
            {
                apiResource = _mapper.Map<ApiResource>(InputHrModel);
                result = await manager.CreateApiResourcesAsync(new List<ApiResource>() { apiResource }) > 0;
            }
            else if (string.IsNullOrEmpty(InputHrModel.Name) && !string.IsNullOrEmpty(InputHrModel.IdentityName))
            {
                InputHrModel.Name = InputHrModel.IdentityName;
                identityResource = _mapper.Map<IdentityResource>(InputHrModel);
                result = await manager.CreateIdentityResourcesAsync(new List<IdentityResource>() { identityResource }) > 0;
            }

            return Json(result, apiResource != null ? (object)apiResource : identityResource, "");
        }

        [HttpPut]
        public async Task<IActionResult> UpdateResource([FromBody] ResourceInputDto InputHrModel)
        {
            var message = string.Empty;
            var success = DataModelValidate.AddOrUpdateResourceValidate(InputHrModel, ref message);
            if (!success)
            {
                return Json(success, null, message);
            }
            var manager = _remoteServiceClient.CreateResourceAppService();
            var result = false;
            ApiResource apiResource = null;
            IdentityResource identityResource = null;
            if (!string.IsNullOrEmpty(InputHrModel.Name) && string.IsNullOrEmpty(InputHrModel.IdentityName))
            {
                apiResource = _mapper.Map<ApiResource>(InputHrModel);
                result = await manager.UpdateApiResourcesAsync(new List<ApiResource>() { apiResource }) > 0;
            }
            else if (string.IsNullOrEmpty(InputHrModel.Name) && !string.IsNullOrEmpty(InputHrModel.IdentityName))
            {
                InputHrModel.Name = InputHrModel.IdentityName;
                identityResource = _mapper.Map<IdentityResource>(InputHrModel);
                result = await manager.UpdateIdentityResourcesAsync(new List<IdentityResource>() { identityResource }) > 0;
            }

            return Json(result, apiResource != null ? (object)apiResource : identityResource,
                result ? "操作成功" : "操作失败");
        }

        [HttpDelete]
        public async Task<IActionResult> DelResource([FromBody] ResourceInputDto InputHrModel)
        {
            var manager = _remoteServiceClient.CreateResourceAppService();
            var result = false;
            if (!string.IsNullOrEmpty(InputHrModel.Name) && string.IsNullOrEmpty(InputHrModel.IdentityName))
            {
                result = await manager.DeleteApiResourceAsync(InputHrModel.Name);
            }
            else if (string.IsNullOrEmpty(InputHrModel.Name) && !string.IsNullOrEmpty(InputHrModel.IdentityName))
            {
                InputHrModel.Name = InputHrModel.IdentityName;
                result = await manager.DeleteIdentityResourceAsync(InputHrModel.Name);
            }
            return Json(result, null, result ? "操作成功" : "操作失败");
        }
    }
}
