using System.ComponentModel;

namespace ConfigService.Entities
{
    /// <summary>
    /// 系统角色表
    /// </summary>
    public class SystemRole
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
