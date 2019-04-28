using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ConfigService.Entities
{
    /// <summary>
    /// 用户角色
    /// </summary>
    public class UserRole
    {
        
        [DisplayName("用户SsoID")]
        public string UserID { get; set; }
        
        [DisplayName("系统角色ID")]
        public string RoleID { get; set; }
    }
}
