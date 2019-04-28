using System;
using System.Collections.Generic;
using System.Text;

namespace OM.Base.Sso.Messages
{
    public interface IUserBatchSync
    {
        ICollection<IUserCreated> Users { get; set; }
        Guid CommandId { get; set; }
    }
}
