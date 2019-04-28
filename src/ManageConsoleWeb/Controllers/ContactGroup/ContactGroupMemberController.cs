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
    [Route("api/contactgroupmember")]
    public class ContactGroupMemberController : BaseController
    {
        private readonly IContactGroupMemberAppService _contactGroupMemberAppService;
        private readonly IContactInfoAppService _contactInfoAppService;

        public ContactGroupMemberController(IContactGroupMemberAppService contactGroupMemberAppService, IContactInfoAppService contactInfoAppService)
        {
            _contactGroupMemberAppService = contactGroupMemberAppService;
            _contactInfoAppService = contactInfoAppService;
        }

        [HttpPost("AddMembers")]
        public async Task<IActionResult> AddMembers([FromBody]AddMembersInput input)
        {
            if (input == null || input.MemberIds == null)
                return Json(false, null, "请输入正确的数据");
            await this._contactGroupMemberAppService.AddMembersAsync(input.GroupId, input.MemberIds);
            return Json(true, null, "加入成功");
        }

        [HttpPost("DeleteMembers")]
        public async Task<IActionResult> DeleteMembers([FromBody] DeleteMembersInput input)
        {
             if (input == null || input.MemberIds == null)
                return Json(false, null, "请输入正确的数据");
            await this._contactGroupMemberAppService.RemoveMembersAsync(input.GroupId, input.MemberIds);
            return Json(true, null, "删除成功");
        }

        [HttpPost("GetGroupmembers")]
        public async Task<IActionResult> GetGroupMembers(int groupId)
        {
            var members = await this._contactGroupMemberAppService.GetMembersByGroupIdAsync(new List<int>() { groupId });
            if (members == null || !members.ContainsKey(groupId))
                return Json(false, null, "没有找到数据");
            var memberIds = members.SelectMany(u => u.Value).Select(u => u.MemberId).ToList();
            var contactes = await this._contactInfoAppService.GetContactInfoByHrIdsAsync(memberIds);
            //var positions = await this._contactInfoAppService.GetContactPositionsAsync(memberIds);
            var list = new List<object>();
            foreach (var contactGroupMember in members[groupId])
            {
                var contact = contactes.FirstOrDefault(u => u.HrId == contactGroupMember.MemberId);
                list.Add(new { Id = contactGroupMember.MemberId, Name = contact?.Name, Gender = contact?.Gender });
            }
            return Json(true, list);
        }
    }
}
