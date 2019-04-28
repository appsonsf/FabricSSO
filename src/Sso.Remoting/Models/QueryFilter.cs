using System;
using System.Collections.Generic;
using System.Text;

namespace Sso.Remoting.Models
{
    public class QueryFilter
    {
        public int PageIndex { get; set; }
         
        public int PageSize { get; set; }
         
        public string SortFields { get; set; }
        /// <summary>
        /// 是否倒叙排列，默认true 是
        /// </summary>
        public bool IsSortDesc { get; set; } = true;

        public int draw { get; set; }

    }
}
