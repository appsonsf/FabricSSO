using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using IdentityServer4;
using ManageConsoleWeb.Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Sso.Remoting;
using IdentityServer4.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Authentication;

namespace ManageConsoleWeb.Pages.ClientManager
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

        public  void OnGet()
        {
        }

        public async Task<IActionResult> OnPostLogOutAsync()
        {
            await HttpContext.SignOutAsync("Cookies");
            await HttpContext.SignOutAsync("oidc");
            return new JsonResult(new AjaxResult() { Success = true, Message = "", Data = null });
        }


        public async Task<IActionResult> OnPostAllClientAsync([FromBody]ClinetInputDto InputHrModel)
        {
            var manager = _remoteServiceClient.CreateClientAppService();
            var client = await manager.GetAllClientAsync();
            var list = _mapper.Map<List<ClinetInputDto>>(client.ToList());
            return new JsonResult( new AjaxResult() { Success = true, Message = "", Data = list });
        }

        public async Task<IActionResult> OnPostSaveClientAsync([FromBody]ClinetInputDto InputHrModel)
        {
            var manager = _remoteServiceClient.CreateClientAppService();
            var client = await manager.GetAllClientAsync();
            var list = _mapper.Map<List<ClinetInputDto>>(client.ToList());
            var temp = InputHrModel;
            return new JsonResult(new AjaxResult() { Success = true, Message = "", Data = "" });
        }

        public async Task<IActionResult> OnPostGetByClientIDAsync([FromBody]ClinetInputDto InputHrModel)
        {
            {
                if (!string.IsNullOrWhiteSpace(InputHrModel.ClientId))
                {
                    var manager = _remoteServiceClient.CreateClientAppService();
                    var client = await manager.FindClientByIdAsync(InputHrModel.ClientId);
                    var model = _mapper.Map<ClinetInputDto>(client);
                    if (model != null)
                    {
                        return new JsonResult(new AjaxResult() { Success = true, Message = "操作成功", Data = model });
                    }
                    else
                    {
                        return new JsonResult(new AjaxResult() { Success = false, Message = "未找到有效信息" });
                    }
                }
            }
            return new JsonResult(new AjaxResult() { Success = false, Message = "未找到有效信息" });
        }

        public async Task<IActionResult> OnPostGetByNameAsync([FromBody]ClinetInputDto InputHrModel)
        {
            if (!string.IsNullOrEmpty(InputHrModel.ClientName))
            {
                var manager = _remoteServiceClient.CreateClientAppService();
                var client = await manager.FindClientByNameAsync(InputHrModel.ClientName);
                if (client!=null)
                {
                    var clientOutput = _mapper.Map<ClinetInputDto>(client);
                    return new JsonResult(new AjaxResult() { Success = true, Message = "", Data = clientOutput });
                }
            }
            return new JsonResult(new AjaxResult() { Success = false, Message = "未找到有效信息" });
        }

        /// <summary>
        /// 操作客户端，有修改和添加
        /// </summary>
        /// <param name="InputHrModel"></param>
        /// <returns></returns>
        public async Task<IActionResult> OnPostActionClientAsync([FromBody]ClinetInputDto InputHrModel)
        {
            if (!string.IsNullOrWhiteSpace(InputHrModel.action))
            {
                var manager = _remoteServiceClient.CreateClientAppService();
                var model = default(Client);
                try
                {
                    model = _mapper.Map<Client>(InputHrModel);
                }
                catch(Exception ex)
                {
                    return new JsonResult(new AjaxResult() { Success = false, Message = "操作失败" });
                }
                var clients = new List<Client>();
                clients.Add(model);
                var result = false;
                if (InputHrModel.action == "add")
                {
                    //clients[0].ClientId = Guid.NewGuid().ToString();
                    foreach (var item in clients[0].ClientSecrets)
                    {
                        item.Value = item.Value.Sha256();
                    }
                    result = await manager.CreateClientsAsync(clients) >0;
                }
                if (InputHrModel.action == "update")
                { 

                    foreach (var item in clients[0].ClientSecrets)
                    {
                        if (!string.IsNullOrEmpty(item.Value)) {
                            item.Value = item.Value.Sha256();
                        }
                    }
                    result = await manager.UpdateClientsAsync(clients) >0;
                }
                if (!string.IsNullOrWhiteSpace(InputHrModel.action) && InputHrModel.action == "del")
                {
                     result = await manager.DeleteClientsAsync(InputHrModel.ClientId);
                }
                if (result)
                    return new JsonResult(new AjaxResult() { Success = result, Message = "操作成功" });
            }
            return new JsonResult(new AjaxResult() { Success = false, Message = "操作失败" });
        }
         

    }
}