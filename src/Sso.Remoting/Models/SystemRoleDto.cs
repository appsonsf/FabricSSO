using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Text;

namespace Sso.Remoting.Models
{
    /// <summary>
    /// 系统角色表
    /// </summary>
    public class SystemRoleDto
    {
        [DisplayName("代码名称")]
        public string ID { get; set; }
        [DisplayName("显示名称，可为空")]
        public string Name { get; set; }
        /// <summary>
        /// 系统列表使用英文","分隔
        /// </summary>
        [DisplayName("系统列表")]
        public string ClientIds { get; set; }
    }
}
