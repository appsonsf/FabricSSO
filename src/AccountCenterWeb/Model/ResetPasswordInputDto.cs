using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AccountCenterWeb.Model
{
    public class ResetPasswordInputDto
    {
        [Required(ErrorMessage = ErrorMessages.IdNameMust)]
        public string Name { get; set; }

        [Required(ErrorMessage = ErrorMessages.IdMust)]
        public string IdCardNo { get; set; }

        [Required(ErrorMessage = ErrorMessages.MobileMust)]
        public string Mobile { get; set; }

        [Required(ErrorMessage = ErrorMessages.CodeMust)]
        public string Code { get; set; }

        [Required(ErrorMessage = ErrorMessages.PasswordMust)]
        [StringLength(19, MinimumLength = 6, ErrorMessage = ErrorMessages.Password_LengthError)]
        public string Password1 { get; set; }

        public string Password2 { get; set; }
    }
}
