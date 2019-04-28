using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using ManageConsoleWeb.Model;
using ManageConsoleWeb.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using OpenApiClient.MdmDataDistribute;

namespace ManageConsoleWeb.Controllers
{
    //逻辑暂时写在Controller中间
    [Authorize(Policy = "Admin")]
    [Route("/api/empinfo/")]
    public class EmpInfoController : BaseController
    {
        private readonly IUserService _userService;
        private readonly IContactsClient _contactService;

        public EmpInfoController(IUserService userService, 
            IContactsClient contactService)
        {
            _userService = userService;
            _contactService = contactService;
        }

        /// <summary>
        /// 获取所有的员工数据
        /// </summary>
        /// <returns></returns>
        //TODO 此接口应该避免使用，在SSO管理后台不用查看所有员工
        [HttpPost]
        [Obsolete]
        public async Task<IActionResult> GetAllEmployeeInfo([FromBody] EmployeeSearchDto input)
        {
            if (input == null) input = new EmployeeSearchDto();
            var contactes = new List<ContactInfo>(); //await this._contactService.GetAllAsync();
            var pageIndex = input?.PageIndex ?? 1;
            var pageSize = input?.PageSize ?? 20;
            if (!string.IsNullOrEmpty(input.Name))
                contactes = contactes.Where(u => u.Name.Contains(input.Name)).ToList();
            if (!string.IsNullOrEmpty(input.IdCardNo))
                contactes = contactes.Where(u => u.IdCardNo.Contains(input.IdCardNo)).ToList();
            if (!string.IsNullOrEmpty(input.Number))
                contactes = contactes.Where(u => u.Number.Contains(input.Number)).ToList();
            contactes = contactes.OrderBy(u => u.SrcId).Skip((pageIndex - 1) * pageSize).Take(pageSize).ToList();
            return Json(true, new { pageCount = 1000, data = contactes }, "获取数据成功!");
        }

        /// <summary>
        /// 根据职员相关的信息创建用户
        /// </summary>
        /// <returns></returns>
        [HttpPost("CreateUser")]
        [Obsolete]
        public async Task<IActionResult> CreateUserByEmpInfo([FromBody] CreateUserByEmpInputDto input)
        {
            throw new NotSupportedException("此处代码需要重构，暂时禁用");

            var contactInfo = await this._contactService.GetByIdCardNoAsync(input.IdCardNo.Trim());
            if (contactInfo == null)
                return Json(false, null, "没有找到职员信息");
            var result = await this._userService.CreateUserAsync(new UserItemInputDto()
            {
                Id = string.Empty,
                IdCardNo = contactInfo.IdCardNo,
                EmployeeNumber = contactInfo.Number,
                Avatar = contactInfo.Gender == 1 ? "local://male" : "local://female",
                Mobile = input.Phone,//这里稍微注意一下
                Name = contactInfo.Name,
                UserPwd = input.Password,
                ReUserPwd = input.Password,
                Username = input.UserName
            });
            return Json(result.Success, null, result.Message);
        }
    }
}