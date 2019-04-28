using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using IdentityServer4.Models;
using ManageConsoleWeb.Model;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Sso.Remoting;

namespace ManageConsoleWeb.Pages.ResourcesManager
{
    [Authorize(Policy = "Admin")]
    public class IndexModel : PageModel
    {
        private readonly IRemotingClient _remoteServiceClient;
        private readonly IMapper _mapper;

        public IndexModel(
            IRemotingClient remoteServiceClient, IMapper mapper)
        {
            _remoteServiceClient = remoteServiceClient;
            _mapper = mapper;
        }

        public void OnGet()
        {

        }

        public async Task<IActionResult> OnGetGetAllResourcesAsync()
        {
            var manager = _remoteServiceClient.CreateResourceAppService();
            var resource = await manager.GetAllResourcesAsync();
            var identityResourceList = _mapper.Map<List<IdentityResourceOutputDto>>(resource.IdentityResources.ToList());
            var apiResourceList = _mapper.Map<List<ApiResourceOutputDto>>(resource.ApiResources.ToList());
            return new JsonResult(new AjaxResult() { Success = true, Message = "", Data = new ResourceOutputDto(identityResourceList, apiResourceList) });
        }


        public async Task<IActionResult> OnPostGetByNameAsync([FromBody]ResourceInputDto InputHrModel)
        {
            if (!string.IsNullOrEmpty(InputHrModel.Name) || !string.IsNullOrEmpty(InputHrModel.IdentityName))
            {
                var manager = _remoteServiceClient.CreateResourceAppService();
                if (!string.IsNullOrEmpty(InputHrModel.Name))
                {
                    var resource = await manager.FindApiResourceAsync(InputHrModel.Name);
                    if (resource != null)
                    {
                        var apiResource = _mapper.Map<ApiResourceOutputDto>(resource);
                        return new JsonResult(new AjaxResult() { Success = true, Message = "", Data = apiResource });
                    }
                }
                if (!string.IsNullOrEmpty(InputHrModel.IdentityName))
                {
                    var resource = await manager.FindIdentityResourcesByScopeAsync(new List<string> { InputHrModel.IdentityName });
                    if (resource != null)
                    {
                        var apiResource = _mapper.Map<IdentityResourceOutputDto>(resource.FirstOrDefault());
                        return new JsonResult(new AjaxResult() { Success = true, Message = "", Data = apiResource });
                    }
                }


            }
            return new JsonResult(new AjaxResult() { Success = false, Message = "未解析出操作参数" });
        }

        /// <summary>
        /// 操作客户端，有修改和添加
        /// </summary>
        /// <param name="InputHrModel"></param>
        /// <returns></returns>
        public async Task<IActionResult> OnPostActionClientAsync([FromBody]ResourceInputDto InputHrModel)
        {
            if (!string.IsNullOrWhiteSpace(InputHrModel.action))
            {
                var manager = _remoteServiceClient.CreateResourceAppService();
                var result = false;
                switch (InputHrModel.action)
                {
                    case "add":
                        if (!string.IsNullOrEmpty(InputHrModel.Name) && string.IsNullOrEmpty(InputHrModel.IdentityName))
                        {
                            var model1 = _mapper.Map<ApiResource>(InputHrModel);
                            result = await manager.CreateApiResourcesAsync(new List<ApiResource>() { model1 }) > 0;
                        }
                        else if (string.IsNullOrEmpty(InputHrModel.Name) && !string.IsNullOrEmpty(InputHrModel.IdentityName))
                        {
                            InputHrModel.Name = InputHrModel.IdentityName;
                            var Identity_model = _mapper.Map<IdentityResource>(InputHrModel);
                            result = await manager.CreateIdentityResourcesAsync(new List<IdentityResource>() { Identity_model }) > 0;
                        }
                        break;
                    case "update":
                        if (!string.IsNullOrEmpty(InputHrModel.Name) && string.IsNullOrEmpty(InputHrModel.IdentityName))
                        {
                            var model = _mapper.Map<ApiResource>(InputHrModel);
                            result = await manager.UpdateApiResourcesAsync(new List<ApiResource>() { model }) > 0;
                        }
                        else if (string.IsNullOrEmpty(InputHrModel.Name) && !string.IsNullOrEmpty(InputHrModel.IdentityName))
                        {
                            InputHrModel.Name = InputHrModel.IdentityName;
                            var Identity_model = _mapper.Map<IdentityResource>(InputHrModel);
                            result = await manager.UpdateIdentityResourcesAsync(new List<IdentityResource>() { Identity_model }) > 0;
                        }
                        break;
                    case "del":
                        if (!string.IsNullOrEmpty(InputHrModel.Name) && string.IsNullOrEmpty(InputHrModel.IdentityName))
                        {
                            result = await manager.DeleteApiResourceAsync(InputHrModel.Name);
                        }
                        else if (string.IsNullOrEmpty(InputHrModel.Name) && !string.IsNullOrEmpty(InputHrModel.IdentityName))
                        {
                            InputHrModel.Name = InputHrModel.IdentityName;
                            result = await manager.DeleteIdentityResourceAsync(InputHrModel.Name);
                        }
                        break;
                    default:
                        break;
                }

                if (result)
                {
                    return new JsonResult(new AjaxResult() { Success = result, Message = "操作成功" });
                }

                if (InputHrModel.action == "GetByName" && !string.IsNullOrEmpty(InputHrModel.Name))
                {
                    var resources = await manager.FindApiResourceAsync(InputHrModel.Name);
                    var apiResource = _mapper.Map<List<ResourceInputDto>>(resources);
                    return new JsonResult(new AjaxResult() { Success = true, Message = "", Data = apiResource });
                }
            }
            return new JsonResult(new AjaxResult() { Success = false, Message = "操作失败" });
        }




    }
}