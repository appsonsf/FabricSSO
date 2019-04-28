using Sso.Remoting.Domains;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sso.Remoting.Models
{
    /// <summary>
    /// 用户查询参数
    /// </summary>
    public class UserQueryInput
    {
        /// <summary>
        /// 用户的Id，为null即不作为查询条件
        /// </summary>
        public Guid? UserId { get; set; }

        /// <summary>
        /// 身份证号模糊查询，为null/empty即不作为查询条件
        /// </summary>
        public string IdCardNo { get; set; }

        /// <summary>
        /// 用户名模糊查询，为null/empty即不作为查询条件
        /// </summary>
        public string Username { get; set; }

        /// <summary>
        /// 用户真实姓名模糊查询，为null/empty即不作为查询条件
        /// </summary>
        public string Name { get; set; }

        /// <summary>
        /// 获取起点的用户创建时间，为空说明截至到EndCreated的数据
        /// </summary>
        public DateTimeOffset? StartCreated { get; set; }

        /// <summary>
        /// 获取终点的用户创建时间，为空说明从StartCreated开始的所有数据，
        /// 如果StartCreated也为空，那么是所有数据，此种情况如果数据量大的话，可能导致性能问题
        /// </summary>
        public DateTimeOffset? EndCreated { get; set; }

        public bool CheckCriteria(UserItem item)
        {
            return CheckUserIdCriteria(item)
                && CheckIdCardNoCriteria(item)
                && CheckUsernameCriteria(item)
                && CheckNameCriteria(item)
                && CheckCreatedCriteria(item);
        }

        private bool CheckUserIdCriteria(UserItem item)
        {
            if (!UserId.HasValue) return true;//不作为查询条件
            return UserId.Value.ToString() == item.Id.ToString();
        }

        private bool CheckIdCardNoCriteria(UserItem item)
        {
            if (string.IsNullOrEmpty(IdCardNo)) return true;//不作为查询条件，成立
            if (string.IsNullOrEmpty(item.IdCardNo)) return false;//无对应数据，不成立
            return item.IdCardNo.IndexOf(IdCardNo, StringComparison.OrdinalIgnoreCase) >= 0;
        }

        private bool CheckUsernameCriteria(UserItem item)
        {
            if (string.IsNullOrEmpty(Username)) return true;//不作为查询条件，成立
            if (string.IsNullOrEmpty(item.Username)) return false;//无对应数据，不成立
            return item.Username.IndexOf(Username, StringComparison.OrdinalIgnoreCase) >= 0;
        }

        private bool CheckNameCriteria(UserItem item)
        {
            if (string.IsNullOrEmpty(Name)) return true;//不作为查询条件，成立
            if (string.IsNullOrEmpty(item.Name)) return false;//无对应数据，不成立
            return item.Name.IndexOf(Name, StringComparison.OrdinalIgnoreCase) >= 0;
        }

        private bool CheckCreatedCriteria(UserItem item)
        {
            if (!StartCreated.HasValue && !EndCreated.HasValue)
            {
                return true;
            }
            else if (StartCreated.HasValue && EndCreated.HasValue
                && (item.Created >= StartCreated.Value && item.Created <= EndCreated.Value))
            {
                return true;
            }
            else if (StartCreated.HasValue && !EndCreated.HasValue
                && item.Created >= StartCreated.Value)
            {
                return true;
            }
            else if (!StartCreated.HasValue && EndCreated.HasValue
                && item.Created <= EndCreated.Value)
            {
                return true;
            }
            return false;
        }
    }
}
