using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Threading.Tasks;

namespace ManageConsoleWeb.Model
{
    /// <summary>
    /// 用户输出页面显示对象
    /// </summary>
    public class UserItemOutputDto
    {
        [DataMember]
        public string Name { get; set; }

        [DataMember]
        public string Mobile { get; set; }

        [DataMember]
        public string IdCardNo { get; set; }
        //
        // Summary:
        //     Gets or sets the username.
        [DataMember]
        public string Username { get; set; }



    }
}
