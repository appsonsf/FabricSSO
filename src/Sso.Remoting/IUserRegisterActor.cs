using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.ServiceFabric.Actors;
using Microsoft.ServiceFabric.Actors.Remoting.FabricTransport;
using Microsoft.ServiceFabric.Services.Remoting;
using Sso.Remoting.Models;

namespace Sso.Remoting
{
    /// <summary>
    /// 用户注册Actor
    /// </summary>
    public interface IUserRegisterActor : IActor
    {
        /// <summary>
        /// 把来自HR的员工消息实体保存到Actor中
        /// </summary>
        /// <param name="model"></param>
        /// <param name="cancellationToken"></param>
        /// <returns></returns>
        Task PrepareAsync(Employee model, CancellationToken cancellationToken = default(CancellationToken));

        /// <summary>
        /// 验证身份证号码是否正确，根据身份证号码获取员工
        /// </summary>
        /// <param name="idNo"></param>
        /// <returns></returns>
        Task<Employee> VerifyIDNoAndGetEmployeeInfoAsync(string idNo);


        #region 用户流程记录

        /// <summary>
        /// 获取用户注册流程所处的状态
        /// </summary>
        /// <returns></returns>
        Task<int?> GetWorkFlowStatusAsync(string flag);

        Task SetWorkFlowStatusAsync(string flag, int status);

        Task<bool> HasRequireStatusAsync(string flag, int status);

        #endregion
    }
}
