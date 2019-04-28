using AutoMapper;
using OM.Base.Sso.Messages;
using Sso.Remoting.Domains;
using Sso.Remoting.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace ProfileStateService
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<UserItem, UserItemDto>();//.ReverseMap();
            CreateMap<UserItem, IUserCreated>().AfterMap(
                (s, d) =>
                {
                    d.UserId = s.Id.ToString();
                });
            CreateMap<UserItem, IUserUpdated>().AfterMap(
               (s, d) =>
               {
                   d.UserId = s.Id.ToString();
               });
            CreateMap<UserAdEventLog, UserAdEventLogDto>();
        }
    }
}
