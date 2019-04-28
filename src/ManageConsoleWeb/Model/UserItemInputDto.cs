using System.Runtime.Serialization;

namespace ManageConsoleWeb.Model
{
    public class UserItemInputDto
    {
        public string Id { get; set; }

        [DataMember]
        public string Name { get; set; }

        [DataMember]
        public string Mobile { get; set; }

        [DataMember]
        public string EmployeeNumber { get; set; }

        [DataMember]
        public string Avatar { get; set; }

        [DataMember]
        public string IdCardNo { get; set; }

        [DataMember]
        public string Username { get; set; }

        [DataMember]
        public string UserPwd { get; set; }

        [DataMember]
        public string ReUserPwd { get; set; }

    }
}
