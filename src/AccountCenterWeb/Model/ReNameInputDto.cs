using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AccountCenterWeb.Model
{
    public class ReNameInputDto
    {
        [Required(ErrorMessage = ErrorMessages.UsernameMust)]
        [RegularExpression(RegisterInputDto.UserNameRegexRule, ErrorMessage = ErrorMessages.UserName_RuleError)]
        public string UserName { get; set; }


        [Required(ErrorMessage = ErrorMessages.CodeMust)]
        public string Code { get; set; }

        public string Mobile { get; set; }
    }
}
