using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ScanLoginService.Model
{
    public class RedisConfig
    {
        public RedisConfig() { }
        public string Host { get; set; }
        public string EventAppName { get; set; }
        public string EncryptionPassword { get; set; }
    }
}
