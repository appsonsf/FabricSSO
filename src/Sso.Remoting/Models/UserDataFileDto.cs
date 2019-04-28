using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sso.Remoting.Models
{
    /// <summary>
    /// csv文件相关的描述
    /// </summary>
    public class UserDataFileDto
    {
        public string PartitionId { get; set; }

        public string Timestamp { get; set; }

        //文件名称
        public string FileName => this.Timestamp + "_" + PartitionId;

    }
}
