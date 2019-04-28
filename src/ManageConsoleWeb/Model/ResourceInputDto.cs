using IdentityServer4.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ManageConsoleWeb.Model
{
    /// <summary>
    /// 资源对象模型--页面输入
    /// </summary>
    public class ResourceInputDto
    {
        /// <summary>
        /// 对客户端的操作类型
        /// </summary>
        public string action { get; set; }
        /// <summary>
        /// 资源名称--修改时默认为ApiName
        /// </summary>
        public string Name { get; set; }

        /// <summary>
        /// IdentityName,区别与Name属性，Name为ApiName
        /// </summary>
        public string IdentityName { get; set; }

        /// <summary>
        /// 显示名称
        /// </summary>
        public string DisplayName { get; set; }
        
        /// <summary>
        /// 资源描述
        /// </summary>
        public string Description { get; set; }

        //
        // 摘要:
        //     Indicates if this resource is enabled. Defaults to true.
        public bool Enabled { get; set; }

        /// <summary>
        /// 用户访问资源 标记
        /// </summary>
        public List<string> UserClaims { get; set; }

        /// <summary>
        /// 客户端的创建时间
        /// </summary>
        public DateTime CreateTime { get; set; }

        //
        // 摘要:
        //     The API secret is used for the introspection endpoint. The API can authenticate
        //     with introspection using the API name and secret.
        public ICollection<Secret> ApiSecrets { get; set; }
        //
        // 摘要:
        //     An API must have at least one scope. Each scope can have different settings.
        public ICollection<Scope> Scopes { get; set; }

         
    }
}
