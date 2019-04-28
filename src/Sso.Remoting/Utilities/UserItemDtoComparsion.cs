using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Sso.Remoting.Models;

namespace Sso.Remoting.Utilities
{
    public class UserItemDtoComparer : IComparer<UserItemDto>
    {
        public int Compare(UserItemDto x, UserItemDto y)
        {
            if (x.Created.HasValue && y.Created.HasValue && x.Created.Value > y.Created.Value)
                return 1;
            return -1;
        }
    }
}
