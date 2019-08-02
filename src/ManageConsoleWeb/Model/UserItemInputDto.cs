using System;
using System.ComponentModel.DataAnnotations;
using System.Runtime.Serialization;

namespace ManageConsoleWeb.Model
{
    public class UserItemInputDto
    {

        public string Id { get; set; }

        [Required(ErrorMessage = "用户姓名不能够为空")]
        [StringLength(maximumLength: 32, ErrorMessage = "用户姓名不能超过32个字符")]
        public string Name { get; set; }

        [Required(ErrorMessage = "手机号码不能够为空")]
        [StringLength(maximumLength: 11)]
        public string Mobile { get; set; }

        //[Required(ErrorMessage = "必须填写员工号码")]
        public string EmployeeNumber { get; set; }


        public Guid? MdmId { get; set; }


        public string Avatar { get; set; }

        //[Required(ErrorMessage = "必须填写身份证号码")]
        public string IdCardNo { get; set; }


        [Required(ErrorMessage = "必须填写用户名")]
        [RegularExpression(@"^[a-zA-Z][a-zA-Z0-9-_]{5,}$", ErrorMessage = "用户名不符合规则(只能6位以上的字母和数字组合,并且以字母开头)")]
        public string Username { get; set; }

        [Required(ErrorMessage = "必须填写用户密码")]
        public string UserPwd { get; set; }


    }
}
