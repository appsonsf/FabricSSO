using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace AccountCenterWeb.Pages
{
    public class SuccessModel : PageModel
    {
        public string Title { get; set; }
        public string Description { get; set; }

        public void OnGet(string title, string desc)
        {
            this.Title = title;
            this.Description = desc;
        }
    }
}
