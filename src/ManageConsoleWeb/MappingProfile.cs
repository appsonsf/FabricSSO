using AutoMapper;
using IdentityServer4.Models;
using ManageConsoleWeb.Model;
using OM.Base.Sso.Messages;
using Sso.Remoting.Models;

namespace ManageConsoleWeb
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Client, ClinetInputDto>().ReverseMap();
            CreateMap<ApiResource, ResourceInputDto>().ReverseMap();
            CreateMap<IdentityResource, ResourceInputDto>().ReverseMap();
            CreateMap<IdentityResource, IdentityResourceOutputDto>().ReverseMap();
            CreateMap<ApiResource, ApiResourceOutputDto>().ReverseMap();
            CreateMap<UserItemDto, IUserCreated>().AfterMap(
                (s, d) =>
                {
                    d.UserId = s.Id.ToString();
                });
        }
    }
}
