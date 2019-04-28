using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;

namespace ManageConsoleWeb.Tools
{
    public static class FormFileExtension
    {
        public static bool IsCSVFile(this IFormFile file)
        {
            if (file == null) return false;
            var ext = Path.GetExtension(file.FileName);
            return ext.Equals(".csv", StringComparison.InvariantCultureIgnoreCase);
        }
    }
}
