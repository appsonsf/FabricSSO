using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ManageConsoleWeb.Model
{
    /// <summary>
    /// 通过职员创建用户实体
    /// </summary>
    public class CreateUserByEmpInputDto
    {
        /// <summary>
        /// 身份证号码
        /// </summary>
        public string IdCardNo { get; set; }

        /// <summary>
        /// 员工编码
        /// </summary>
        public string EmployeeNumber { get; set; }

        /// <summary>
        /// 性别
        /// </summary>
        public int Gender { get; set; }

        /// <summary>
        /// 身份证相关的姓名
        /// </summary>
        public string Name { get; set; }

        /// <summary>
        /// 注册的时候使用的手机号码
        /// </summary>
        public string Phone { get; set; }

        /// <summary>
        /// 登录的相关用户名
        /// </summary>
        public string UserName { get; set; }

        /// <summary>
        /// 登录的密码
        /// </summary>
        public string Password { get; set; }
    }
}
