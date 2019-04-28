using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ManageConsoleWeb.Model
{
    public class EmpInfoOutputDto
    {
        [Key]
        public int IDKey { get; set; }

        public string UserId { get; set; }

        public string Action { get; set; }

        public string Id { get; set; }

        public string Number { get; set; }

        public string Name { get; set; }

        public string Sorgid { get; set; }

        public string Orgid { get; set; }

        public string IdCardNo { get; set; }

        public string Phone { get; set; }

        public string Mobile { get; set; }

        public string Deptid { get; set; }

        public string DeptName { get; set; }

        public string HeadUrl { get; set; }

        public string Gender { get; set; }

        public string PositionId { get; set; }

        public string PositionName { get; set; }

        public string SrcOrgid { get; set; }

        public string SrcOrgName { get; set; }

        public string DestorgName { get; set; }

        public string DestOrgId { get; set; }

        public string SrcPositionId { get; set; }

        public string SrcPositionName { get; set; }

        public string DestpositionId { get; set; }

        public string DestPositionName { get; set; }

        public string StartDate { get; set; }

        public string EndDate { get; set; }

        public string EffectDate { get; set; }

        public string Status { get; set; }

        public string FRelationStatusId { get; set; }

        public string FRelationStatus { get; set; }

        public string DRelationStatusId { get; set; }

        public string DRelationStatus { get; set; }

        public string FLastUpdateTime { get; set; }

        public DateTime? BatchWriteTime { get; set; }

        //是否已经注册成用户了
        public bool HaveRegisteUser { get; set; }
    }
}
