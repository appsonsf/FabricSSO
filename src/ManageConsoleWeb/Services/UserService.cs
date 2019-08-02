using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using ManageConsoleWeb.Model;
using ManageConsoleWeb.Services.Model;
using ManageConsoleWeb.Tools;
using Microsoft.ServiceFabric.Actors;
using Microsoft.ServiceFabric.Actors.Client;
using ServiceFabricContrib;
using Sso.Remoting;
using Sso.Remoting.Models;

namespace ManageConsoleWeb.Services
{
    public class UserService : IUserService
    {
        private readonly IUserAppServiceClient _userAppServiceClient;

        public UserService(IUserAppServiceClient userAppServiceClient)
        {
            _userAppServiceClient = userAppServiceClient;
        }

        public async Task<CreateUserResult> CreateUserAsync(UserItemInputDto input)
        {

            var result = new CreateUserResult();
            if (await _userAppServiceClient.IsMobileExistedAsync(input.Mobile))
            {
                result.Success = false;
                result.Message = "手机号码已经存在";
                return result;
            }
            var (findByNumber, _) = await _userAppServiceClient.FindByEmployeeNumberAsync(input.EmployeeNumber.Trim());
            if (findByNumber != null)
            {
                result.Success = false;
                result.Message = "员工号已经存在!";
            }

            var (findByIdCardNo, _) = await _userAppServiceClient.FindByIdCardNoAsync(input.IdCardNo.Trim());
            if (findByIdCardNo != null)
            {
                result.Success = false;
                result.Message = "此身份证号已经存在用户使用!";
            }

            var userResult = await _userAppServiceClient.FindByUsernameAsync(input.Username);
            if (userResult.Item1 != null)
            {
                result.Success = false;
                result.Message = "用户名存在";
                return result;
            }

            //通过，开始创建用户
            var dto = new UserItemDto
            {
                IdCardNo = input.IdCardNo,
                Username = input.Username,
                Password = input.UserPwd,
                Name = input.Name,
                EmployeeNumber = input.EmployeeNumber,
                EmployeeMdmId = input.MdmId,
                Avatar = input.Avatar,
                Mobile = input.Mobile,
                IsActive = true
            };
            var returnDto = await _userAppServiceClient.CreateUserAsync(dto);
            if (returnDto == null)
            {
                result.Success = false;
                result.Message = "创建用户失败,请重新尝试";
                return result;
            }
            //记录Id
            input.Id = returnDto.Id.ToString();
            result.Success = true;
            result.Message = "创建用户成功!";
            return result;
        }
    }
}
