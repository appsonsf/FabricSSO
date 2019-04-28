using System.Collections.Generic;
using System.Fabric;
using System.IO;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using CsvHelper;
using ProfileStateService.Internal;
using Sso.Remoting;
using Sso.Remoting.Domains.Services;
using Sso.Remoting.Models;

namespace ProfileStateService
{
    public class UserDataAppService : IUserDataAppService
    {
        private readonly IMapper _mapper;
        private readonly StatefulServiceContext _serviceContext;
        private readonly IUserDomainService _userDomainService;
        private readonly IUserDataStorageService _userDataStorageService;

        public UserDataAppService(StatefulServiceContext serviceContext,
            IUserDomainService userDomainService,
            IMapper mapper, IUserDataStorageService userDataStorageService)
        {
            _mapper = mapper;
            _userDataStorageService = userDataStorageService;
            _serviceContext = serviceContext;
            _userDomainService = userDomainService;
        }

        public async Task ExportUserDataAsync(string timeStamp)
        {
            //分区的PartionKey,序列化处理本分区的数据
            var partionId = this._serviceContext.PartitionId.ToString("N");
            var userDataFile = new UserDataFileDto()
            {
                Timestamp = timeStamp,
                PartitionId = partionId
            };
            var users = await this._userDomainService.GetAllUsersAsync();
            var mappedUsers = new List<UserItemDto>();
            foreach (var user in users)
            {
                var item = _mapper.Map<UserItemDto>(user);
                item.Password = user.GetHashedPassword();
                mappedUsers.Add(item);
            }
            using (var ms = new MemoryStream())
            using (var tw = new StreamWriter(ms, Encoding.UTF8))
            using (var csv = new CsvWriter(tw))
            {
                csv.Configuration.RegisterClassMap<CsvUserItemDtoMapper>();
                csv.WriteRecords(mappedUsers);
                tw.Flush();
                ms.Position = 0;
                await _userDataStorageService.SaveUserDataAsync(userDataFile, ms);
            }

            ServiceEventSource.Current.Message("用户数据导出:导出数据文件{0}.csv,用户数量:{1}", userDataFile.FileName, mappedUsers.Count);
        }
    }
}
