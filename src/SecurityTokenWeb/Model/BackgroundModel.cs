using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SecurityTokenWeb.Model
{
    public class BackgroundModel
    {
        public string Title { get; set; }

        public string Description { get; set; }

        public string Image { get; set; }

        private static IList<BackgroundModel> List=new List<BackgroundModel>()
        {
            new BackgroundModel()
            {
                Title = "浙江西堠门跨海大桥",
                Description = "浙江西堠门跨海大桥 全长5452米，主桥长2588米，主跨1650米，两跨连续钢箱悬索桥，2009年12月建成通车，主跨居世界第二、国内第一。",
                Image = "/Images/login-bg-1.jpg"
            },
            new BackgroundModel()
            {
                Title = "湖北宜昌长江公路大桥",
                Image = "/Images/login-bg-3.jpg",
            },
            new BackgroundModel()
            {
                Title = "宁波外滩大桥",
                Image = "/Images/login-bg-4.jpg",
            },
            new BackgroundModel()
            {
                Title = "都汶路庙子坪岷江特大桥",
                Image = "/Images/login-bg-6.jpg"
            }
        };

        public static BackgroundModel GetRandomBackground()
        {
            var length = List.Count;
            var random = (new Random()).Next(0, length - 1);
            return List[random];
        }
    }
}
