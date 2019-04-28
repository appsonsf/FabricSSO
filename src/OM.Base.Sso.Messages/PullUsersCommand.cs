using System;
using System.Collections.Generic;
using System.Runtime.Serialization;
using System.Text;

namespace OM.Base.Sso.Messages
{
    /// <summary>
    /// 批量拉取用户信息的命令
    /// </summary>
    [Obsolete]
    public class PullUsersCommand
    {
        public Guid CommandId { get; set; } = Guid.NewGuid();

        /// <summary>
        /// 拉取起点的用户创建时间，为空说明截至到EndCreated的数据
        /// </summary>
        public DateTimeOffset? StartCreated { get; set; }

        /// <summary>
        /// 拉取终点的用户创建时间，为空说明从StartCreated开始的所有数据，
        /// 如果StartCreated也为空，那么是所有数据，此种情况如果数据量大的话，可能导致性能问题
        /// </summary>
        public DateTimeOffset? EndCreated { get; set; }
    }
}
