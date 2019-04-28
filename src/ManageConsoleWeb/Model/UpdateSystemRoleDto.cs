using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ManageConsoleWeb.Model
{
    public class UpdateAndAddSystemRoleDto
    {
        [DisplayName("代码名称")]
        public string ID { get; set; }
        [DisplayName("显示名称，可为空")]
        public string Name { get; set; }
        /// <summary>
        /// 系统列表使用英文","分隔
        /// </summary>
        [DisplayName("系统列表")]
        public List<string> ClientIds { get; set; }

    }

    
}
