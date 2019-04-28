using System;
using System.Collections.Generic;
using System.Runtime.Serialization;

namespace Sso.Remoting.Models
{
    /// <summary>
    /// 用户的搜索查询分页参数对象
    /// QueryFilter_UserItemDto
    /// </summary>
    public class QF_UserItemDto:QueryFilter
    {
      
        public string id { get; set; }

        [DataMember]
        public string Name { get; set; }

        [DataMember]
        public string Mobile { get; set; }

        [DataMember]
        public string IdCardNo { get; set; }

        [DataMember]
        public string Username { get; set; } 


    }
}
