using IdentityServer4.Models;
using ServiceFabricContrib;
using System;
using System.Runtime.Serialization;

namespace Sso.Remoting.Domains

{
    [DataContract]
    [Serializable]
    public class UserItem
    {
        [DataMember]
        private ItemId _id;
        [DataMember]
        private string _idCardNo;
        [DataMember]
        private string _employeeNumber;
        [DataMember]
        private Guid? _employeeMdmId;
        [DataMember]
        private string _username;
        [DataMember]
        private string _salt;
        [DataMember]
        private string _passwordHash;
        [DataMember]
        private bool _isActive;
        [DataMember]
        private string _name;
        [DataMember]
        private string _mobile;
        [DataMember]
        private string _email;
        [DataMember]
        private bool _hasAdUser;
        [DataMember]
        private string _departmentId;
        [DataMember]
        private Guid? _departmentMdmId;
        [DataMember]
        private string _avatar;
        [DataMember]
        private DateTimeOffset _created;
        [DataMember]
        private DateTimeOffset? _modified;
        [DataMember]
        private bool _emailConfirmed;
        [DataMember]
        private bool _mobileConfirmed;
        [DataMember]
        private int _accessFailedCount;
        [DataMember]
        private bool _isLockoutEnabled;
        [DataMember]
        private DateTimeOffset? _lockoutEnd;
        [DataMember]
        private DateTimeOffset? _lastLoginTime;

        //NOTE 此构造器的参数必须包含所有需要反序列化时候赋值的属性，且名称一样
        public UserItem(string idcardNo, string username, string password, string name,
            string mobile, string email, string avatar, string employeeNumber,Guid? employeeMdmId,
            string departmentSrcId,Guid? departmentMdmId,
            ItemId id = null)
        {
            _id = id ?? new ItemId();
            _idCardNo = idcardNo;
            _username = username;
            _passwordHash = password.Sha256();//暂时使用Sha256
            _name = name;
            _mobile = mobile;
            _mobileConfirmed = true;//暂时默认为true
            _email = email;
            _emailConfirmed = true;//暂时默认为true
            _avatar = avatar;
            _employeeNumber = employeeNumber;
            _employeeMdmId = employeeMdmId;
            _departmentId = departmentSrcId;
            _departmentMdmId = departmentMdmId;

            _isActive = true;
            _isLockoutEnabled = true;
            _created = DateTimeOffset.UtcNow;
        }

        public ItemId Id
        {
            get { return _id; }
        }

        public string IdCardNo
        {
            get { return _idCardNo; }
        }
        public UserItem UpdateIdCardNo(string value)
        {
            return CloneAndUpdate(o =>
            {
                o._idCardNo = value;
            });
        }

        public string EmployeeNumber
        {
            get { return _employeeNumber; }
        }
        public UserItem UpdateEmployeeNumber(string value)
        {
            return CloneAndUpdate(o =>
            {
                o._employeeNumber = value;
            });
        }

        public Guid? EmployeeMdmId
        {
            get { return _employeeMdmId; }
        }
        public UserItem UpdateEmployeeMdmId(Guid? value)
        {
            return CloneAndUpdate(o =>
            {
                o._employeeMdmId = value;
            });
        }


        //
        // Summary:
        //     Gets or sets the username.
        public string Username
        {
            get { return _username; }
        }
        public UserItem UpdateUsername(string value)
        {
            return CloneAndUpdate(o => o._username = value);
        }

        private UserItem CloneAndUpdate(Action<UserItem> updateAction)
        {
            var clone = this.DeepCopy();
            updateAction(clone);
            clone.SetModified();
            return clone;
        }

        public bool VerifyPassword(string value)
        {
            return (_lockoutEnd == null || _lockoutEnd < DateTimeOffset.UtcNow)
                && _passwordHash == value.Sha256();
        }

        public string GetHashedPassword()
        {
            return this._passwordHash;
        }

        public UserItem UpdateHashedPassword(string value)
        {
            return CloneAndUpdate(o => o._passwordHash = value);
        }

        public UserItem UpdatePassword(string value)
        {
            return CloneAndUpdate(o => o._passwordHash = value.Sha256());
        }

        public UserItem UnlockUser()
        {
            return CloneAndUpdate(o =>
            {
                o._lockoutEnd = null;
                o._accessFailedCount = 0;
            });
        }

        //
        // Summary:
        //     Gets or sets if the user is active.
        public bool IsActive
        {
            get { return _isActive; }
        }
        public UserItem UpdateIsActive(bool value)
        {
            return CloneAndUpdate(o => o._isActive = value);
        }

        public string Name
        {
            get { return _name; }
        }
        public UserItem UpdateName(string value)
        {
            return CloneAndUpdate(o => o._name = value);
        }

        public string Mobile
        {
            get { return _mobile; }
        }
        public UserItem UpdateMobile(string value, bool confirmed = false)
        {
            return CloneAndUpdate(o =>
            {
                o._mobile = value;
                o._mobileConfirmed = confirmed;
            });
        }

        public bool MobileConfirmed
        {
            get { return _mobileConfirmed; }
        }
        public UserItem UpdateMobileConfirmed(bool value)
        {
            return CloneAndUpdate(o => o._mobileConfirmed = value);
        }

        public string Email
        {
            get { return _email; }
        }

        public bool HasAdUser
        {
            get { return _hasAdUser; }
        }

        public string DepartmentId
        {
            get { return _departmentId; }
        }

        public UserItem UpdateEmail(string value, bool confirmed = false)
        {
            return CloneAndUpdate(o =>
            {
                o._email = value;
                o._emailConfirmed = confirmed;
            });
        }

        public bool EmailConfirmed
        {
            get { return _emailConfirmed; }
        }
        public UserItem UpdateEmailConfirmed(bool value)
        {
            return CloneAndUpdate(o => o._emailConfirmed = value);
        }

        public string Avatar
        {
            get { return _avatar; }
        }
        public UserItem UpdateAvatar(string value)
        {
            return CloneAndUpdate(o => o._avatar = value);
        }

        public bool IsLockoutEnabled
        {
            get { return _isLockoutEnabled; }
        }
        public UserItem UpdateIsLockoutEnabled(bool value)
        {
            return CloneAndUpdate(o => o._isLockoutEnabled = value);
        }

        public DateTimeOffset? LockoutEnd
        {
            get { return _lockoutEnd; }
            private set { _lockoutEnd = value; }
        }
        public int AccessFailedCount
        {
            get { return _accessFailedCount; }
        }
        public DateTimeOffset? LastLoginTime
        {
            get { return _lastLoginTime; }
        }
        public static int LockoutLimite = 5;
        public static int LockoutHours = 3;
        /// <summary>
        /// 更新登录状态相关的属性
        /// </summary>
        /// <param name="value">是否登录成功</param>
        /// <returns></returns>
        public UserItem UpdateLoginStatus(bool value)
        {
            return CloneAndUpdate(o =>
            {
                if (value)
                {
                    o._lockoutEnd = null;
                    o._accessFailedCount = 0;
                }
                else if (o._lockoutEnd == null)
                {
                    o._accessFailedCount++;
                    if (o._isLockoutEnabled && o._accessFailedCount >= LockoutLimite)
                        o._lockoutEnd = DateTimeOffset.UtcNow.AddHours(LockoutHours);
                }
                o._lastLoginTime = DateTimeOffset.UtcNow;
            });
        }

        public DateTimeOffset Created
        {
            get { return _created; }
        }
        /// <summary>
        /// 此方法仅用于Unit Test
        /// </summary>
        /// <param name="created"></param>
        public void SetCreated(DateTimeOffset created)
        {
            _created = created;
        }

        public DateTimeOffset? Modified
        {
            get { return _modified; }
        }
        private void SetModified()
        {
            _modified = DateTimeOffset.UtcNow;
        }

        public UserItem UpdateHasAdUser(bool value)
        {
            return CloneAndUpdate(o => o._hasAdUser = value);
        }

        public UserItem UpdateDepartmentId(string departmentId)
        {
            return CloneAndUpdate(o => o._departmentId = departmentId);
        }

        public UserItem UpdateDepartmentMdmId(Guid? value)
        {
            return CloneAndUpdate(o => o._departmentMdmId = value);
        }
    }
}
