using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SecurityTokenWeb.Model
{
    /// <summary>
    /// 接口响应数据模型
    /// </summary>
    /// <typeparam name="T"></typeparam>
    public class ResponseModel<T>
    {
        private const int CODE_SUCCESS = 0;

        public int Status { get; set; }

        public string Message { get; set; }

        public string TimeStamp { get; set; }

        public T Data { get; set; }

        public bool IsSuccess()
        {
            return IsSuccess(Status);
        }

        public static bool IsSuccess(int status)
        {
            return CODE_SUCCESS == status;
        }
    }
    public class WsModel
    {
        public int Status { get; set; }
        public string Usr { get; set; }
        public string SId { get; set; }
    }
}
