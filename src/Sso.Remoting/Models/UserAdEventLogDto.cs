using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ServiceFabricContrib;
using Sso.Remoting.Domains;

namespace Sso.Remoting.Models
{
    /// <summary>
    /// 用户Ad事件记录
    /// </summary>
    public class UserAdEventLogDto
    {

        /// <summary>
        ///用户Id
        /// </summary>
        public ItemId UserId { get; set; }

        /// <summary>
        /// 事件类型
        /// </summary>
        public UserAdEventType EventType { get; set; }

        /// <summary>
        /// Ad事件是否收到后续消息
        /// </summary>
        public bool Recived { get; set; }

        /// <summary>
        /// 发送时间
        /// </summary>
        public DateTimeOffset SendedTime { get; set; }

        /// <summary>
        /// 接收时间点
        /// </summary>
        public DateTimeOffset? RecivedTime { get; set; }



    }
}
