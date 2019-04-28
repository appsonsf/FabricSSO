using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using EnterpriseContact.Interfaces.AppServices;
using EnterpriseContact.Interfaces.Dtos;
using ManageConsoleWeb.Model.Group;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ManageConsoleWeb.Controllers.ContactGroup
{
    [Authorize(Policy = "Admin")]
    [Route("api/contactgroup")]
    public class ContactGroupController : BaseController
    {
        private readonly IContactGroupAppService _contactGroupAppService;

        public ContactGroupController(IContactGroupAppService contactGroupAppService)
        {
            _contactGroupAppService = contactGroupAppService;
        }

        /// <summary>
        /// 获取所有的员工组信息
        /// </summary>
        /// <returns></returns>
        [HttpPost("GetGroups")]
        public async Task<IActionResult> GetContactGroup(int? groupId)
        {
            var groups = await this._contactGroupAppService.GetGroupsAsync(groupId);
            return Json(true, groups, null);
        }

        [HttpPost("AddGroup")]
        public async Task<IActionResult> AddGroup([FromBody]AddGroupInput input)
        {
            if (string.IsNullOrEmpty(input.Name))
                return Json(false, "联系人组名称不能为空!");
            var name = input.Name.Trim();
            var remark = input.Remark == null ? "" : input.Remark.Trim();
            if (input.Name.Length > 15 || (!string.IsNullOrEmpty(input.Remark) && input.Remark.Length > 15))
                return Json(false, "名称和备注不能超过15个字符!");
            var groups = await this._contactGroupAppService.GetGroupsAsync(null);
            if (groups.Count(u => u.Name == name) > 0)
                return Json(false, "联系人群组名称已经被占用了,请更换名称!");
            await this._contactGroupAppService.AddGroupAsync(new ContactGroupDto()
            {
                Name = name,
                Remark = remark,
                Created = DateTimeOffset.Now,
                Updated = DateTimeOffset.Now,
            });
            return Json(true, "", "添加联系人组成功");
        }

        [HttpPost("DeleteGroup")]
        public async Task<IActionResult> DeleteGroup(int groupId)
        {
            await this._contactGroupAppService.DeleteGroupAsync(groupId);
            return Json(true, null, "删除组成功");
        }

        [HttpPost("UpdateGroup")]
        public async Task<IActionResult> UpdateGroup([FromBody] UpdateGroupInput input)
        {
            if (input == null || string.IsNullOrEmpty(input.Name))
                return Json(false, null, "新的组名称不能为空");
            var name = input.Name.Trim();
            var remark = input.Remark == null ? "" : input.Remark.Trim();
            var groups = await this._contactGroupAppService.GetGroupsAsync(null);
            if (groups == null || groups.Count == 0)
                return Json(false, null, "未找到组相关的信息");
            var group = groups.FirstOrDefault(u => u.Id == input.GroupId);
            if (group == null)
                return Json(false, null, "未找到该组的任何信息");
            groups.Remove(group);
            if (groups.Count(u => u.Name == name) > 0)
                return Json(false, null, "命名重复!");
            group.Name = name;
            group.Remark = remark;
            group.ContactGroupMembers = null;
            group.Updated = DateTimeOffset.Now;
            await this._contactGroupAppService.UpdateGroupAsync(group);
            return Json(true, null, "更新员工组成功!");
        }
    }
}
