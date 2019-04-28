using System.Runtime.Serialization;
using System.ComponentModel;

namespace Sso.Remoting.Models
{
    [DataContract]
    public class ResponseResult
    {
        [DataMember]
        public bool Success { get; set; }
        [DataMember]
        public string Message { get; set; }
        [DataMember]
        public object Data { get; set; }
        [DataMember]
        public int Code { get; set; }
    }
}
