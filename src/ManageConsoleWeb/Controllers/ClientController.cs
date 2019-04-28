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
    [Route("api/client")]
    public class ClientController : BaseController
    {
        private readonly IRemotingClient _remoteServiceClient;
        private readonly IMapper _mapper;

        public ClientController(IRemotingClient remoteServiceClient, IMapper mapper)
        {
            _remoteServiceClient = remoteServiceClient;
            _mapper = mapper;
        }

        [HttpPost]
        public async Task<IActionResult> AddAsync([FromBody]ClinetInputDto InputHrModel)
        {
            string message = string.Empty;
            var success = DataModelValidate.AddOrUpdateClientValidate(InputHrModel, ref message);
            if (!success)
            {
                return Json(success, null, message);
            }
            var manager = _remoteServiceClient.CreateClientAppService();
            var model = default(Client);
            model = _mapper.Map<Client>(InputHrModel);
            var clients = new List<Client>();
            clients.Add(model);
            var result = false;
            foreach (var item in clients[0].ClientSecrets)
            {
                item.Value = item.Value.Sha256();
            }
            result = await manager.CreateClientsAsync(clients) > 0;
            return Json(result, InputHrModel, result ? "操作成功" : "操作失败");
        }


        /// <summary>
        /// 获取所有的客户端
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public async Task<IActionResult> AllClientsAsync()
        {
            var manager = _remoteServiceClient.CreateClientAppService();
            var client = await manager.GetAllClientAsync();
            var list = _mapper.Map<List<ClinetInputDto>>(client.ToList());
            return Json(true, list, "");
        }

        [HttpPut]
        public async Task<IActionResult> UpdateClient([FromBody]ClinetInputDto InputHrModel)
        {
            string message = string.Empty;
            var success = DataModelValidate.AddOrUpdateClientValidate(InputHrModel, ref message,true);
            if (!success)
            {
                return Json(success, null, message);
            }
            var manager = _remoteServiceClient.CreateClientAppService();
            var client = await manager.FindClientByIdAsync(InputHrModel.ClientId);
            client.AllowedGrantTypes = InputHrModel.AllowedGrantTypes;
            client.AllowedScopes = InputHrModel.AllowedScopes;
            client.ClientName = InputHrModel.ClientName;
            if (InputHrModel.ClientSecrets != null && InputHrModel.ClientSecrets.Count > 0)
            {
                client.ClientSecrets = InputHrModel.ClientSecrets;
                foreach (Secret secret in client.ClientSecrets)
                {
                    secret.Value = secret.Value.Sha256();
                }
            }

            client.PostLogoutRedirectUris = InputHrModel.PostLogoutRedirectUris;
            client.RedirectUris = InputHrModel.RedirectUris;
            var result = await manager.UpdateClientsAsync(new List<Client>() { client }) > 0;
            return Json(result, client, result ? "操作成功" : "操作失败");
        }

        [HttpDelete]
        public async Task<IActionResult> DelClient([FromBody] ClinetInputDto InputHrModel)
        {
            var manager = _remoteServiceClient.CreateClientAppService();
            var result = await manager.DeleteClientsAsync(InputHrModel.ClientId);
            return Json(result, null, result ? "删除成功" : "删除失败");
        }

        /// <summary>
        /// 生成密钥
        /// </summary>
        /// <returns></returns>
        [HttpPost(template: "CreateSecrt")]
        public IActionResult CreateSecrt()
        {
            var guid = Guid.NewGuid().ToString();
            return Json(true, guid, "");
        }
    }
}
