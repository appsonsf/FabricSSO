using System;

namespace OM.Base.Sso.Messages
{
    /// <summary>
    /// 系统用户创建事件
    /// </summary>
    public interface IUserCreated
    {
        /// <summary>
        /// 系统用户ID
        /// </summary>
        string UserId { get; set; }

        /// <summary>
        /// 系统用户登录名
        /// </summary>
        string Username { get; set; }

        /// <summary>
        /// 系统用户全名
        /// </summary>
        string Name { get; set; }

        /// <summary>
        /// 对应员工身份证号码，如果为空说明并非员工用户
        /// </summary>
        string IdCardNo { get; set; }

        /// <summary>
        /// 对应的员工工号，如果为空说明并非员工用户
        /// </summary>
        string EmployeeNumber { get; set; }

        /// <summary>
        /// 对应的员工主数据Id，如果为空说明并非员工用户
        /// </summary>
        Guid? EmployeeMdmId { get; set; }

        /// <summary>
        /// 用户手机号码
        /// </summary>
        string Mobile { get; set; }

        /// <summary>
        /// 用户邮箱地址
        /// </summary>
        string Email { get; set; }

        /// <summary>
        /// 用户注册/创建时间
        /// </summary>
        DateTimeOffset Created { get; set; }

        /// <summary>
        /// 用户头像的Url
        /// </summary>
        string Avatar { get; set; }
    }
}
