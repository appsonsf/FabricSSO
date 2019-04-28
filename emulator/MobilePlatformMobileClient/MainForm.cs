using IdentityModel.Client;
using RestSharp;
using RestSharp.Authenticators;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace MobilePlatformMobileClient
{
    public partial class MainForm : Form
    {
        public MainForm()
        {
            InitializeComponent();
        }

        private string accessToken;
        private async void btnLogin_ClickAsync(object sender, EventArgs e)
        {
            var response = await RequestTokenAsync(txtAuthority.Text, txtUsername.Text, txtPassword.Text);
            response.Show();
            if (!response.IsError)
            {
                accessToken = response.AccessToken;
                MessageBox.Show("登录成功");
            }
            else
                MessageBox.Show("登录失败： " + response.Error);
        }

        #region Utility
        static async Task<TokenResponse> RequestTokenAsync(string authority, string username, string pwd)
        {
            var discoClient = new DiscoveryClient(authority)
            {
                Policy = new DiscoveryPolicy
                {
                    RequireHttps = false
                }
            };
            var disco = await discoClient.GetAsync();// await DiscoveryClient.GetAsync(Authority);
            if (disco.IsError) throw new Exception(disco.Error);

            var client = new TokenClient(
                disco.TokenEndpoint,
                "OM_IM_Mobile_001",
                "OMIMMobile001");
            return await client.RequestResourceOwnerPasswordAsync(username, pwd,
                "openid profile profile.ext sso.sts");
        }
        #endregion

        private async void btnRequestScanLogin_ClickAsync(object sender, EventArgs e)
        {
            var client = CreateRestClient();

            var request = new RestRequest("api/ScanLogin", Method.GET);
            request.AddParameter("connectionId", txtQrCode.Text.Split(':')[1]);

            var response = await client.ExecuteTaskAsync(request);
            if (response.IsSuccessful)
                MessageBox.Show("请求成功");
            else
                MessageBox.Show($"请求失败： {response.ErrorMessage}, HttpStatusCode: {response.StatusCode} ");
        }

        private RestClient CreateRestClient()
        {
            var client = new RestClient(txtAuthority.Text);
            client.Authenticator = new OAuth2AuthorizationRequestHeaderAuthenticator(accessToken, "Bearer");
            return client;
        }

        private async void btnTempToken_Click(object sender, EventArgs e)
        {
            var client = CreateRestClient();

            var request = new RestRequest("api/TempToken", Method.GET);

            var response = await client.ExecuteTaskAsync<string>(request);
            if (response.IsSuccessful)
            { MessageBox.Show("请求成功");
                txtTempToken.Text = response.Data;
            }
            else
                MessageBox.Show($"请求失败： {response.ErrorMessage}, HttpStatusCode: {response.StatusCode} ");
        }
    }
}
