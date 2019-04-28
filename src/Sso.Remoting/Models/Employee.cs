using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace Sso.Remoting.Models
{
    [DataContract]
    public class Employee
    {
        [DataMember]
        public string HR_ID { get; set; }
        [DataMember]
        public string IDNo { get; set; }
        [DataMember]
        public string IDName { get; set; }
        [DataMember]
        public string Number { get; set; }
        [DataMember]
        public int Gender { get; set; }
        [DataMember]
        public string PhoneNo { get; set; }
        [DataMember]
        public string UserName { get; set; }
        [DataMember]
        public string Pwd { get; set; }
        [DataMember]
        public string ValidatePhoneCode { get; set; }
    }
}
