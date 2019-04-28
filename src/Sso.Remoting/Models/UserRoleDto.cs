using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Text;

namespace Sso.Remoting.Models
{
    /// <summary>
    /// 角色
    /// </summary>
    public class RoleDto
    {
        [DisplayName("代码名称")]
        public string ID { get; set; }
        [DisplayName("显示名称，可为空")]
        public string Name { get; set; }
        [DisplayName("系统列表")]
        public string ClientIds { get; set; }
    }
    public class UserIdsDto
    {
        [DisplayName("用户ID")]
        public string UserID { get; set; }
    }
}
