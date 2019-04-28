using Microsoft.AspNetCore.Mvc.Rendering;
using System;
using System.Collections.Generic;

namespace WebCommon
{
    public static class HtmlHelperExtensions
    {
        public static string StaticFileHost { get; set; }

        private static Dictionary<string, string> UrlDic { get; set; } = new Dictionary<string, string>();

        public static string GenerateStaticUrl(this IHtmlHelper url, string path)
        {
            if (string.IsNullOrEmpty(path))
                return string.Empty;
            if (!UrlDic.ContainsKey(path))
                UrlDic[path] = StaticFileHost + path;
            return UrlDic[path];
        }
    }
}
