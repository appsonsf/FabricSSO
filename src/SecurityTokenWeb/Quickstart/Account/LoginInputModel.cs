// Copyright (c) Brock Allen & Dominick Baier. All rights reserved.
// Licensed under the Apache License, Version 2.0. See LICENSE in the project root for license information.


using System.ComponentModel.DataAnnotations;

namespace IdentityServer4.Quickstart.UI
{
    public class LoginInputModel
    {
        [Required]
        public string Username { get; set; }
        [Required]
        public string Password { get; set; }
        public bool RememberLogin { get; set; }
        public string ReturnUrl { get; set; }
        /// <summary>
        /// 登录类型，
        /// 1 账号密码登录
        /// 2 手机短信验证码登录
        /// 3 临时密码
        /// </summary>
        public Sso.Remoting.LoginType LoginType { get; set; }
    }
}