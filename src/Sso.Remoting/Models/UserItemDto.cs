using ServiceFabricContrib;
using System;
using System.Collections.Generic;
using System.Runtime.Serialization;
using System.Security.Claims;
using System.Text;

namespace Sso.Remoting.Models
{
    [Serializable]
    public class UserItemDto
    {
        /// <summary>
        /// 用户ID
        /// </summary>
        public ItemId Id { get; set; }

        public string Name { get; set; }

        public string Mobile { get; set; }

        public bool? MobileConfirmed { get; set; }

        public string IdCardNo { get; set; }

        public string EmployeeNumber { get; set; }

        public Guid? EmployeeMdmId { get; set; }

        //
        // Summary:
        //     Gets or sets the username.
        public string Username { get; set; }
        public string Password { get; set; }

        /// <summary>
        /// Summary:
        ///     Ad will need
        /// </summary>

        public bool? HasAdUser { get; set; }

        public string DepartmentId { get; set; }

        public Guid? DepartmentMdmId { get; set; }

        //
        // Summary:
        //     Gets or sets if the user is active.
        public bool? IsActive { get; set; }

        public string Email { get; set; }
        public bool? EmailConfirmed { get; set; }

        public DateTimeOffset? Created { get; set; }

        public DateTimeOffset? Modified { get; set; }

        public string Avatar { get; set; }

        public int AccessFailedCount { get; set; }

        public DateTimeOffset? LastLoginTime { get; set; }

        public DateTimeOffset? LockoutEnd { get; set; }

        public bool? IsLockoutEnabled { get; set; }
    }
}
