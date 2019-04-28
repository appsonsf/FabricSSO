using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sso.Remoting.ClientParam
{
    public class UserQueryParam
    {
        /// <summary>
        /// 用户的Id
        /// </summary>
        public Guid? UserId { get; set; }

        /// <summary>
        /// 身份证号模糊查询
        /// </summary>
        public string IdCardNo { get; set; }

        /// <summary>
        /// 用户名查询(模糊查询)
        /// </summary>
        public string UserName { get; set; }

        /// <summary>
        /// 用户真实新名查询
        /// </summary>
        public string Name { get; set; }

        /// <summary>
        /// 分页索引
        /// </summary>
        public int? PageIndex { get; set; }

        /// <summary>
        /// 页面大小
        /// </summary>
        public int? PageSize { get; set; }
    }
}
