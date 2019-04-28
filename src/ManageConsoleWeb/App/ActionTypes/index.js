const ActionTypes = {
    Role: {
        LOADALL: "ROLE.LOADAA",    //加载所有的角色
        ADD: "ROLE.ADD",           //添加一个角色
        DELETE: "ROLE.DELETE",     //删除一个角色
        UPDATE: "ROLE.UPDATE",     //更新一个角色
        SELECT: "ROLE.SELECT",      //选中一个角色 important
        LOADALLCLIENT: "ROLE.LOADALLCLIENT", //获取所有的客户端
        LOADALLUSERS: "ROLE.LOADALLUSERS",
        LOADROLEUSERS: "ROLE.LOADROLEUSERS",  //获取角色下面的多个用户
        REMOVEUSERS: "ROLE.REMOVEUSERS",      //移除一个角色下面多个用户
    },
    UserRole: {
        LOAD: "USERROlE.LOAD",            //加载一个角色下面的用户
        ADD: "USERROLE.ADD",              //角色下加入一个用户
        DELETE: "USERROLE.DELETE",        //删除一个用户
        USERREMOVEROLES: "USERROLE.USERREMOVEROLES",
        UPDATEUSERROLES: "USERROLE.UPDATEUSERROLES",
    },
    Client: {
        ADD: "CLIENT.ADD",                 //添加一个客户端
        LOAD: "CLIENT.LOAD",                 //加载一个所有的客户端
        UPDATE: "CLIENT.UPDATE",
        DELETE: "CLIENT.DELETE"              //删除一个客户端
    },
    Resouces: {
        LOAD: "RESOUCES.LOAD",             //加载所有的资源
        ADD: "RESOUCES.ADD",               //添加一个资源
        UPDATE: "RESOUCES.UPDATE",         //更新一个资源
        DELETE: "RESOUCES.DELETE"           //删除一个资源
    },
    User: {
        LOAD: "USER.LOAD",
        DELETE: "USER.DELETE",                //删除一个用户
        SEARCH: "USER.SEARCH",
        EDITMOBILE: "USER.EDITMOBILE",           //修改手机号码
        EDITPASSWORD: "USER.EDITPASSWORD",
        UPDATESTATE: "USER.UPDATESTATE",          //修改状态
        ADD: "USER.ADD",
        EDITUSERNAME: "USER.EDITUSERNAME"
    },
    EMP: {
        LOAD: "EMP.LOAD",                       //加载所有的
        CREATEUSER: "EMP.CREATEUSER"             //创建用户
    }
}

export default ActionTypes;