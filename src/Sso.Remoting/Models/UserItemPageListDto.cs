using System;
using System.Collections.Generic;
using System.Text;

namespace Sso.Remoting.Models
{
    public class UserItemPageListDto
    {
        public List<UserItemDto> Data { get; set; }
        public int Total { get; set; }
    }
}
