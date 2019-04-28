using System;
using System.Collections.Generic; 
using System.Text;

namespace Sso.Remoting.Models
{
    [Serializable] 
    public class QueryResult<T> : QueryFilter
    {
        public int recordsTotal { get; set; }
        public int recordsFiltered { get { return recordsTotal; } }
        
        public List<T> data { get; set; }

        public string Summary { get; set; }

    }

    [Serializable] 
    public class QueryResult : QueryFilter
    {
        public int recordsTotal { get; set; }
        public int recordsFiltered { get { return recordsTotal; } }
     
        public object data { get; set; }
    }
}
