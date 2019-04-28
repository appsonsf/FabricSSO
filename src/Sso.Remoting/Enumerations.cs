using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sso.Remoting
{
    [Flags]
    public enum UserRegisterStatus
    {
        //status: 1=not register, 2=registering, 3=registered waiting approved, 4=registered completly
        NotRegister = 1,
        Registering = 2,
        WaitingApprove = 3,
        Registered = 4
    }

    //用户注册流程记录
    [Flags]
    public enum UserRegisterProcess
    {
        CheckedIDAndName = 1,
        SendedSms = 2,
        VerifiedSmsCode = 3,
        CreatedAccount = 4
    }

    [Flags]
    public enum UserChangePasswordProcess
    {
        ChekcIDAndName = 1,
        ChekcUserPassword = 2,
        
        SendedSms = 3,
        VerifiedSmsCode = 4,
    }

    [Flags]
    public enum UserFindPasswordProcess
    {
        CheckedIdAndName = 1,
        CheckedUser = 2,
        SendedSms = 3,
        VerifiedSmsCode = 4
    }

    [Flags]
    public enum UserChangePhoneProcess
    {
        CheckedUser = 1,
        CheckedIdAndName = 2,
        SendedSms = 3,
        VerifiedSmsCode = 4
    }
}
