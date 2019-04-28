using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Sso.Remoting
{
    public static class Constants
    {
        public const string ServiceName_ProfileStateService = "ProfileStateService";
        public const string ListenerName_UserAppService = "UserAppService";
        public const string ListenerName_UserDataAppService = "UserDataAppService";
        public const string ListenerName_AdOperationAppService = "AdOperationAppService";

        public const string ServiceName_ConfigService = "ConfigService";
        public const string ListenerName_ClientAppService = "ClientAppService";
        public const string ListenerName_PersistedGrantAppService = "PersistedGrantAppService";
        public const string ListenerName_ResourceAppService = "ResourceAppService";
        public const string ListenerName_SystemRoleAppService = "SystemRoleAppService";
        public const string ListenerName_UserRoleAppService = "UserRoleAppService";

        public const string ManageConsoleServiceName = "ManageConsoleWeb";
        public const string ListenerName_EmployeeAppService = "EmployeeAppService";

        public const string UserRegisterActorServiceName = "UserRegisterActorService";

        public const string ScanLoginServiceName = "ScanLoginService";
        public const string ListenerName_ScanLoginNotifyAppService = "ScanLoginNotifyAppService";
    }

    public static class CacheKeyConstants
    {
        /// <summary>
        /// 客户端ID
        /// </summary>
        public const string SLSClientID = "SLS.Client.ID";
        /// <summary>
        /// 服务器ID
        /// </summary>
        public const string STSServerID = "STS.Server.ID";
        /// <summary>
        /// 授权认证服务端登录短信验证码
        /// </summary>
        public const string SMSLoginValidateCode = "STS.SMSLoginCode";
    }

    /// <summary>
    /// 登录方式
    /// </summary>
    public enum LoginType
    {
        /// <summary>
        /// 用户名密码登录（包含手机号码和密码登录）
        /// </summary>
        UserNamePwdLogin = 1,
        /// <summary>
        /// 手机验证码登录
        /// </summary>
        MobileValidateCode = 2,
        /// <summary>
        /// 临时密码登录
        /// </summary>
        TempPassword = 3
    }
}
