using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using AutoMapper;
using CsvHelper;
using ManageConsoleWeb.Model;
using ManageConsoleWeb.Services;
using ManageConsoleWeb.Tools;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using OM.Base.Sso.Messages;
using ServiceFabricContrib;
using Sso.Remoting;
using Sso.Remoting.ClientParam;
using Sso.Remoting.Domains;
using Sso.Remoting.Events;
using Sso.Remoting.Models;

namespace ManageConsoleWeb.Controllers
{
    [Authorize(Policy = "Admin")]
    [Route("/api/user")]
    public class UserController : BaseController
    {
        private readonly IRemotingClient _remotingClient;
        private readonly IMapper _mapper;
        private readonly IUserService _userService;
        private readonly IUserAppServiceClient _userAppServiceClient;

        public UserController(
            IRemotingClient remotingClient,
            IUserAppServiceClient userAppServiceClient,
            IMapper mapper,
            IUserService userService)
        {
            _remotingClient = remotingClient;
            _mapper = mapper;
            _userService = userService;
            _userAppServiceClient = userAppServiceClient;

        }

        /// <summary>
        /// 获取所有的用户
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public async Task<IActionResult> AllUsers()
        {
            var users = await _userAppServiceClient.GetAllUsersAsync(new UserQueryParam());
            return Json(true, users, "");
        }

        /// <summary>
        /// 删除一个用户
        /// </summary>
        /// <returns></returns>
        [HttpDelete]
        public async Task<IActionResult> DelUser([FromBody]UserIdDto input)
        {
            ItemId id = new ItemId(new Guid(input.Id));
            var manager = this._remotingClient.CreateUserAppService(id);
            var result = await manager.DeleteByIdAsync(id);
            return Json(result, null, result ? "删除成功" : "删除失败");
        }

        [HttpPut]
        public async Task<IActionResult> UpdateUserMobile([FromBody] UserUpdateInputDto input)
        {
            if (!string.IsNullOrEmpty(input.Id) && !string.IsNullOrEmpty(input.Mobile))
            {
                var (user, appService) = _userAppServiceClient.FindByUserIdAsync(input.Id).Result;
                if (user != null)
                {
                    if (user.Mobile == input.Mobile)
                    {
                        return Json(false, null, "新手机号码不能和原手机号码相同");
                    }
                    if (await _userAppServiceClient.IsMobileExistedAsync(input.Mobile))
                    {
                        return Json(false, null, "手机号码已经存在");
                    }
                    if (await appService.UpdateUserAsync(user.Id, new UserItemDto { Mobile = input.Mobile }) != null)
                    {
                        user.Mobile = input.Mobile;
                        return Json(true, user, "操作成功");
                    }
                }
            }
            return Json(false, null, "未找到相关的用户信息");
        }

        [HttpPut(template: "updatepassword")]
        public async Task<IActionResult> UpdateUserPassword([FromBody] UserUpdateInputDto input)
        {
            if (!string.IsNullOrEmpty(input.Id) && !string.IsNullOrEmpty(input.RePassword) &&
                !string.IsNullOrEmpty(input.Password) && input.Password == input.RePassword)
            {
                var (user, appService) = _userAppServiceClient.FindByUserIdAsync(input.Id).Result;
                if (user != null)
                {
                    if (await appService.UpdateUserAsync(user.Id, new UserItemDto { Password = input.Password }) != null)
                    {
                        return new JsonResult(new AjaxResult() { Success = true, Message = "操作成功" });
                    }


                    return new JsonResult(new AjaxResult() { Success = false, Message = "操作失败" });
                }
            }
            return new JsonResult(new AjaxResult() { Success = false, Message = "操作失败:未找到用户|密码不一致|密码不能为空" });
        }


        /// <summary>
        /// 重新设置用户名
        /// </summary>
        /// <returns></returns>
        [Route("rename")]
        [HttpPost]
        public async Task<IActionResult> ReNameUserName([FromBody]ReNameInputDto input)
        {
            if (input == null)
                return Json(false, null, "数据不能够为空");
            var (user, service) = await this._userAppServiceClient.FindByUserIdAsync(input.Id);
            if (user == null)
                return Json(false, null, "未能找到该用户");
            var regex = new Regex(@"^[a-zA-Z][a-zA-Z0-9]{1,14}$");
            if (string.IsNullOrEmpty(input.UserName) || !regex.IsMatch(input.UserName))
                return Json(false, null, "用户名不能够为空或者用户名不符合规则(以字母开头的字母或数字组合6-15的组合)");
            var (user1, _) = await this._userAppServiceClient.FindByUserNameOrEmployeeNumberAsync(input.UserName);
            if (user1 != null)
                return Json(false, null, "用户名已经被使用了！");
            await service.UpdateUserAsync(user.Id, new UserItemDto() { Id = user.Id, Username = input.UserName });
            return Json(true, null, "修改用户名完成");
        }



        [HttpPut(template: "updatestate")]
        public async Task<IActionResult> UpdateUserState([FromBody] UserUpdateInputDto input)
        {
            if (!string.IsNullOrEmpty(input.Id))
            {
                var (user, appService) = await _userAppServiceClient.FindByUserIdAsync(input.Id);
                if (user != null)
                {
                    if (await appService.UpdateUserAsync(user.Id, new UserItemDto { IsActive = !user.IsActive }) != null)
                    {
                        return Json(true, null, "修改成功");
                    }
                }
            }
            return Json(false, null, "未找到当前用户");
        }

        /// <summary>
        /// 添加用户
        /// </summary>
        /// <param name="InputHrModel"></param>
        /// <returns></returns>
        [HttpPost]
        public async Task<IActionResult> CreateUserAsync([FromBody]UserItemInputDto InputHrModel)
        {
            var result = await this._userService.CreateUserAsync(InputHrModel);
            return Json(result.Success, null, result.Message);
        }


        //导出所有的用户数据
        [HttpPost("ExportUserData")]
        public async Task<IActionResult> ExportUserData()
        {
            var appServices = await _remotingClient.CreateAllUserDataAppServicesAsync();
            var tasks = new List<Task>();
            //精确到毫秒数级别
            var timeStamp = DateTime.Now.ToString("yyyy-MM-dd-HH-mm-ss");
            foreach (var appService in appServices)
            {
                tasks.Add(appService.ExportUserDataAsync(timeStamp));
            }
            await Task.WhenAll(tasks);
            return Json(true, null, "导出用户数据完成!用户数据已经进入到Minio中");
        }

        [HttpPost("ImportUserData")]
        public async Task<IActionResult> ImportUserData()
        {
            var files = this.HttpContext.Request.Form.Files;
            foreach (var file in files)
            {
                if (!file.IsCSVFile())
                    return Json(false, null, "上传文件中存在非.csv结尾的文件,请重新选择上传");
            }
            var tasks = new List<Task>();
            foreach (var file in files)
            {
                var item = new UserDataFileDto();
                var splited = Path.GetFileNameWithoutExtension(file.FileName).Split("_");
                item.Timestamp = splited[0];
                item.PartitionId = splited[1];
                tasks.Add(this.ImportUserDataAsync(item, file.OpenReadStream()));
            }
            //这里要进行并行进行
            await Task.WhenAll(tasks);
            return Json(true, null, "上传成功");
        }

        [HttpPost("unlockUser")]
        public async Task<IActionResult> UnLockUser(string userId)
        {
            var (user, _) = await this._userAppServiceClient.UnlockUserAsync(userId);
            if (user != null)
                return Json(true, null, "解锁成功");
            return Json(false, null, "解锁失败");
        }


        public async Task ImportUserDataAsync(UserDataFileDto file, Stream stream)
        {
            var userItems = await this.ImportCsvUserDataAsync(file, stream);
            foreach (var item in userItems)
            {
                var (user, appService) = await _userAppServiceClient.FindByUserIdAsync(item.Id.ToString());
                if (user != null) continue;
                var result = await _userAppServiceClient.CreateUserAsync(item, true);
                if (result != null)
                {
                    ServiceEventSource.Current.Message("用户数据还原:用户Id:{0}", result.Id.ToString("N"));
                }
                else
                {
                    ServiceEventSource.Current.Message("用户数据还原失败:用户Id:{0}", item.Id.ToString("N"));
                }

            }
        }

        /// <summary>
        /// 序列化.csv文件的内容
        /// </summary>
        /// <param name="file"></param>
        /// <param name="stream"></param>
        /// <returns></returns>
        private async Task<IEnumerable<UserItemDto>> ImportCsvUserDataAsync(UserDataFileDto file, Stream stream)
        {
            using (TextReader tr = new StreamReader(stream))
            {
                try
                {
                    var csv = new CsvReader(tr);
                    csv.Configuration.RegisterClassMap<CsvUserItemDtoMapper>();
                    var result = csv.GetRecords<UserItemDto>().ToList();
                    var resultCount = result?.LongCount() ?? 0;
                    ServiceEventSource.Current.Message("用户数据导入(解析阶段):" + "导入用户数据文件{0}.csv,用户数量:{1}", file.FileName, resultCount);
                    return await Task.FromResult(_mapper.Map<IEnumerable<UserItemDto>>(result));
                }
                catch (Exception e)
                {
                    ServiceEventSource.Current.Message("用户数据导入(解析阶段)发生错误:" + "导入用户数据文件{0},错误信息:{1}", file.FileName, e.ToString());
                    return null;
                }

            }
        }
    }
}
