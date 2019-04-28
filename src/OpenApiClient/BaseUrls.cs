using System;
using System.Collections.Generic;
using System.Text;

namespace OpenApiClient
{
    //ref: https://www.talkingdotnet.com/3-ways-to-use-httpclientfactory-in-asp-net-core-2-1/
    public static class BaseUrls
    {
#if DEBUG
        public const string MdmDataDistribute = "http://localhost:10152";
#else
        public const string MdmDataDistribute = "http://datadistributeapi.mdm:10152";
#endif
    }
}
