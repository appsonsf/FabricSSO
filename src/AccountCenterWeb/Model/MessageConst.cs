using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AccountCenterWeb.Model
{
    public static class ErrorMessages
    {
        public const string PasswordMust = "必须键入密码";
        public const string IdMust = "必须键入身份证号";
        public const string IdNameMust = "必须键入身份证姓名";
        public const string UsernameMust = "必须键入用户名";
        public const string MobileMust = "必须键入手机号";
        public const string MobileNotExist = "手机号码不存在,请联系管理员!";
        public const string CodeMust = "必须键入手机验证码";

        public const string CodeError = "手机验证码错误";
        public const string UsernameExisted = "用户名已经存在";
        public const string UserNotFound = "用户未找到";
        public const string IDRegisted = "此身份证已经被注册";
        public const string IDNameNotMatch = "身份证号和名称不匹配";
        public const string MobileNotMatch = "手机号码不是您注册预留的手机号码";
        public const string IdNotFound = "根据身份证号未能找到用户";

        public const string Password_LengthError = "密码长度必须为6-19位";
        public const string PasswordMustBeEqual = "2次键入密码必须一致";
        public const string UserName_RuleError = "用户名不符合规则(只能6位以上的字母和数字组合,并且以字母开头)";
        public const string Mobile_RuleError = "请输入正确的手机号码";
        public const string OperationFaild = "操作失败,请重新尝试!";
        public const string OperationSuccess = "操作成功!";
        public const string IDError = "身份证信息有误";
    }
}
