using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
namespace AccountCenterWeb.Model
{
    /// <summary>
    /// 自注册，页面操作对象
    /// </summary>
    public class RegisterInputDto
    {
        public const string UserNameRegexRule = @"^[a-zA-Z][a-zA-Z0-9-_]{5,}$";

        [Required(ErrorMessage = ErrorMessages.IdMust)]
        public string IdCardNo { get; set; }

        [Required(ErrorMessage = ErrorMessages.IdNameMust)]
        public string Name { get; set; }

        [Required(ErrorMessage = ErrorMessages.MobileMust)]
        public string Mobile { get; set; }

        [Required(ErrorMessage = ErrorMessages.CodeMust)]
        public string Code { get; set; }

        [Required(ErrorMessage = ErrorMessages.UsernameMust)]
        [RegularExpression(UserNameRegexRule, ErrorMessage = ErrorMessages.UserName_RuleError)]
        public string UserName { get; set; }

        [Required(ErrorMessage = ErrorMessages.PasswordMust)]
        [StringLength(19, MinimumLength = 6, ErrorMessage = ErrorMessages.Password_LengthError)]
        public string Password1 { get; set; }

        public string Password2 { get; set; }


        public string ErrorMessage1 { get; set; }

        public RegisterInputDto AddMessage(string message)
        {
            this.ErrorMessage1 = message;
            return this;
        }
    }
}
