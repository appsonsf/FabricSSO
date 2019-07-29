using OpenApiClient.MdmDataDistribute;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AccountCenterWeb.Extension
{
    public static class ContactServiceExtension
    {
        public static async Task<ContactInfo> GetContactByIdAsync(this IContactsClient contactsClient, Guid id)
        {
            try
            {
                var contact = await contactsClient.GetByIdAsync(id);
                return contact;
            }
            catch (Exception e)
            {
                ServiceEventSource.Current.Message("调用MDM_API接口失败:{0}", e.ToString());
                return null;
            }
        }
    }
}
