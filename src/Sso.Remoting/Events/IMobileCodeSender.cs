using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sso.Remoting.Events
{
    public interface IMobileCodeSender
    {
        Task SendAsync(string[] PhoneNumbers, string code);
    }
}
