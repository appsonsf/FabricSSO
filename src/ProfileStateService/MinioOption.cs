using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProfileStateService
{
    /// <summary>
    /// Minio相关的配置
    /// </summary>
    public class MinioOption
    {
        public string Endpoint { get; set; }

        public string AccessKey { get; set; }

        public string SecretKey { get; set; }
    }
}
