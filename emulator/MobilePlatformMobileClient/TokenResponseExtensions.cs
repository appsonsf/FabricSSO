using IdentityModel;
using IdentityModel.Client;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MobilePlatformMobileClient
{
    public static class TokenResponseExtensions
    {
        public static void Show(this TokenResponse response)
        {
            if (!response.IsError)
            {
                Debug.WriteLine("Token response:");
                Debug.WriteLine(response.Json);

                if (response.AccessToken.Contains("."))
                {
                    Debug.WriteLine("\nAccess Token (decoded):");

                    var parts = response.AccessToken.Split('.');
                    var header = parts[0];
                    var claims = parts[1];

                    Debug.WriteLine(JObject.Parse(Encoding.UTF8.GetString(Base64Url.Decode(header))));
                    Debug.WriteLine(JObject.Parse(Encoding.UTF8.GetString(Base64Url.Decode(claims))));
                }
            }
            else
            {
                if (response.ErrorType == ResponseErrorType.Http)
                {
                    Debug.WriteLine("HTTP error: ");
                    Debug.WriteLine(response.Error);
                    Debug.WriteLine("HTTP status code: ");
                    Debug.WriteLine(response.HttpStatusCode);
                }
                else
                {
                    Debug.WriteLine("Protocol error response:");
                    Debug.WriteLine(response.Raw);
                }
            }
        }
    }
}
