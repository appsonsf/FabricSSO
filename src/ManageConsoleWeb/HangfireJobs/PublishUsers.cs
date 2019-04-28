using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using MassTransit;
using OM.Base.Sso.Messages;
using Sso.Remoting;
using Sso.Remoting.Models;

namespace ManageConsoleWeb.HangfireJobs
{

    public interface IPublishUsers
    {
        Task DoAction();
    }

    public class PublishUsers : IPublishUsers
    {
        private readonly IRemotingClient _remoteClient;
        private readonly IMapper _mapper;
        private readonly IEnumerable<IBusControl> _buses;

        public PublishUsers(IRemotingClient remoteClient, IMapper mapper, IEnumerable<IBusControl> buses)
        {
            _remoteClient = remoteClient;
            _mapper = mapper;
            _buses = buses;
        }

        public async Task DoAction()
        {
            var tasks = new List<Task<List<UserItemDto>>>();
            foreach (var appService in await _remoteClient.CreateAllUserAppServicesAsync())
            {
                tasks.Add(appService.GetAllUserItem(new UserQueryInput()));
            }

            var dtosArray = await Task.WhenAll(tasks);
            var users = new List<IUserCreated>();
            foreach (var dtos in dtosArray)
            {
                users.AddRange(dtos.Select(o => _mapper.Map<IUserCreated>(o)).ToList());
            }

            foreach (var bus in _buses)
            {
                await bus.Publish<IUserBatchSync>(new
                {
                    CommandId = default(Guid),
                    Users = users
                });
            }

        }
    }
}
