using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;
using ServiceFabricContrib;

namespace Sso.Remoting.Domains
{
    /// <summary>
    /// 用户Ad事件记录
    /// </summary>
    [DataContract]
    [Serializable]
    public class UserAdEventLog
    {
        public UserAdEventLog(ItemId userId, UserAdEventType eventType, DateTimeOffset sendedTime)
        {
            this._userId = userId;
            this._eventType = eventType;
            this._sendedTime = sendedTime;
        }

        [DataMember]
        private ItemId _userId;
        [DataMember]
        private bool _recived;
        [DataMember]
        private UserAdEventType _eventType;
        [DataMember]
        private DateTimeOffset _sendedTime;
        [DataMember]
        private DateTimeOffset? _recivedTime;

        /// <summary>
        ///用户Id
        /// </summary>
        public ItemId UserId
        {
            get { return this._userId; }
        }

        public bool Recived
        {
            get { return this._recived; }
        }

        /// <summary>
        /// 事件类型
        /// </summary>
        public UserAdEventType EventType
        {
            get { return this._eventType; }
        }

        /// <summary>
        /// 发送时间
        /// </summary>
        public DateTimeOffset SendedTime
        {
            get { return this._sendedTime; }
        }

        public DateTimeOffset? RecivedTime
        {
            get { return this._recivedTime; }
        }

        public UserAdEventLog UpdateRecived(bool recived, DateTimeOffset recivedTime)
        {
            return this.CloneAndUpdate(u =>
            {
                u._recived = recived;
                u._recivedTime = recivedTime;
            });
        }

        private UserAdEventLog CloneAndUpdate(Action<UserAdEventLog> updateAction)
        {
            var clone = this.DeepCopy();
            updateAction(clone);
            return clone;
        }

    }

    public enum UserAdEventType
    {
        /// <summary>
        /// 添加Ad用户事件
        /// </summary>
        AdUserAdded = 0
    }
}
