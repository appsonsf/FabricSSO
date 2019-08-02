using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Base.Mdm.Org.MsgContracts;
using MassTransit;
using ServiceFabricContrib;
using Sso.Remoting;
using Sso.Remoting.Models;

namespace ManageConsoleWeb.MessageConsumers
{
    /// <summary>
    /// 接收从MDM中的人员变更事件,目前只处理人员的删除
    /// </summary>
    public class OrgDataEvenConsumer : IConsumer<OrgDataEvent>
    {
        private readonly IUserAppServiceClient _userAppServiceClient;

        public OrgDataEvenConsumer(IUserAppServiceClient userAppServiceClient)
        {
            _userAppServiceClient = userAppServiceClient;
        }

        public async Task Consume(ConsumeContext<OrgDataEvent> context)
        {
            var message = context.Message;
            if (message.ContactDeleteds.Count == 0)
                return;
            foreach (var contactDeleted in message.ContactDeleteds.Select(u => u.OldData))
            {
                if (!contactDeleted.UserId.HasValue)
                    continue;
                var (user, appService) = await this._userAppServiceClient.FindByUserIdAsync(contactDeleted.UserId.ToString());
                if (user.IsActive.HasValue && !user.IsActive.Value)
                    continue;
                await appService.EnableOrDisableUserAsync(user.Id, false);
            }

            foreach (var update in message.ContactUpdateds.Where(u => u.OldData.Number != u.NewData.Number && u.NewData.UserId.HasValue).ToList())
            {
                var (user, appService) = await this._userAppServiceClient.FindByUserIdAsync(update.NewData.UserId.ToString());
                if (user.IsActive.HasValue && !user.IsActive.Value)
                    continue;
                await appService.UpdateUserAsync(new ItemId(update.NewData.UserId.Value), new UserItemDto()
                {
                    Id = new ItemId(update.NewData.UserId.Value),
                    EmployeeNumber = update.NewData.Number
                });
            }
        }
    }
}
