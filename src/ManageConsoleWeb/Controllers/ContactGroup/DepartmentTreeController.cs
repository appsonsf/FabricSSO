using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using EnterpriseContact.Interfaces.AppServices;
using EnterpriseContact.Interfaces.Dtos;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Sso.Remoting.Contact;

namespace ManageConsoleWeb.Controllers.ContactGroup
{
    [Authorize(Policy = "Admin")]
    [Route("api/orgtree/")]
    public class DepartmentTreeController : BaseController
    {
        private readonly IContactService _contactService;
        private readonly IOrganizationInfoAppService _organizationInfoAppService;

        public DepartmentTreeController(IOrganizationInfoAppService organizationInfoAppService, IContactService contactService)
        {
            _organizationInfoAppService = organizationInfoAppService;
            _contactService = contactService;
        }

        [HttpGet("load")]
        public async Task<IActionResult> Load(string id)
        {
            if (id == "#")
                id = "";
            try
            {
                //TODO:补充完整
                var (contactInfos, departmetDtos) = await this.GetDepartmentsAndEmpInfosByParentDepartmentIdAsync(id);
                var employees = new List<ContactInfoDto>();
                var departments = new List<DepartmentDto>();
                if (contactInfos != null && departmetDtos != null)
                {
                    foreach (var item in contactInfos)
                    {
                        if (item != null)
                            employees.Add(item);
                    }
                    foreach (var item in departmetDtos)
                    {
                        if (item != null)
                            departments.Add(item);
                    }
                }
                var result = new
                {
                    EmployeeList = employees,
                    SubDepartmentList = departments
                };
                var list = new List<object>();
                foreach (var department in result.SubDepartmentList)
                {
                    list.Add(new { id = department.HrId, text = department.Name, children = true, state = new { disabled = true } });
                }

                foreach (var emp in result.EmployeeList)
                {
                    list.Add(new { id = emp.HrId, text = emp.Name, children = false });
                }
                return Json(list);
            }
            catch (Exception e)
            {
                return null;
            }
        }

        [Route("search")]
        public async Task<IActionResult> Search(string keyword)
        {
            if (string.IsNullOrEmpty(keyword))
                return Json(false, "查询参数不能够为空!");
            var result = await this._contactService.GetContactAsync(new SearchParam()
            {
                Keyword = keyword.Trim()
            });
            var ls = new List<Object>();
            foreach (var contactInfoDto in result)
            {
                ls.Add(new { empId = contactInfoDto.HrId, Name = contactInfoDto.Name, Gender = contactInfoDto.Gender });
            }
            return Json(true, ls, "");
        }


        public async Task<(List<ContactInfoDto>, List<DepartmentDto>)> GetDepartmentsAndEmpInfosByParentDepartmentIdAsync(string partentId)
        {
            if (string.IsNullOrWhiteSpace(partentId) || partentId == "0" || partentId == "00000000-0000-0000-0000-000000000000CCE7AED4")
                partentId = "00000000-0000-0000-0000-000000000000CCE7AED4";
            var employeeModels = new List<ContactInfoDto>();
            var orgInfoModels = new List<DepartmentDto>();
            var employees = await this._contactService.GetContactAsync(new SearchParam()
            {
                DepartmentHrId = partentId
            });
            var orgInfos = await this._organizationInfoAppService.GetOrgizationByParentHrIdsAsync(new List<string> { partentId });

            foreach (var employee in employees)
            {
                employeeModels.Add(new ContactInfoDto
                {
                    //Id = employee.HrId,
                    HrId = employee.HrId,
                    //DepartmentId = employee.DepartmentHrId,
                    Name = employee.Name,
                    Mobile = employee.Mobile,
                });
            }
            foreach (var info in orgInfos)
            {
                orgInfoModels.Add(new DepartmentDto() { HrId = info.HrId, Name = info.Name });
            }

            return (employeeModels, orgInfoModels);
        }
    }
}
