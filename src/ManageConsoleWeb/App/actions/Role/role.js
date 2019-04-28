import ActionTypes from "../../ActionTypes";

//引入http
import http from "../../_shared/http";
import urls from "../../_shared/urls";
import msg from "../../_shared/msg";
import confirm from "../../_shared/confirm";

//加载所有的角色
export function loadAll(cb) {
    cb = cb || function () { };
    return (dispatch) => {
        http.get("/api/role", {},
            function (result) {
                if (result.success) {
                    cb(result.data);
                    dispatch({ type: ActionTypes.Role.LOADALL, datas: result.data });
                } else {
                    cb(result.data);
                    msg("错误", "获取数据失败", "error");
                }
            });
    }
}

//删除一个角色
export function del(id) {
    return (dispatch) => {
        confirm(function () {
            http.delete("/api/role", { id }, function (result) {
                if (result.success) {
                    dispatch({ type: ActionTypes.Role.DELETE, id: id });
                    msg("成功", "删除角色成功", "success");
                } else {
                    msg("失败", result.message, "error");
                }
            });
        },
            "是否删除该系统角色?");
    }
}

//新增的一个角色
export function add(id, name, clientId, cb) {
    cb = cb || function () { };
    return (dispatch) => {
        http.post("/api/role", { id, name, clientIds: clientId }, function (result) {
            if (result.success) {
                dispatch({ type: ActionTypes.Role.ADD, data: { id, name, clientId: clientId } });
                cb(result.success);
                msg("成功", "添加角色成功", "success");
            } else {
                cb(result.success);
                msg("失败", result.message, "error");
            }
        });
    }
}

export function update(id, name, clientId, cb) {
    cb = cb || function () { };
    return (dispatch) => {
        http.put("/api/role", { id, name, clientIds: clientId }, function (result) {
            if (result.success) {
                dispatch({ type: ActionTypes.Role.UPDATE, data: { id, name, clientId } });
                msg("成功", "更新角色成功", "success");
                cb(result.success);
            } else {
                msg("失败", result.message, "error");
                cb(result.success);
            }
        });
    }
}

//选中一个角色
export function select(id) {
    return (dispatch) => {
        dispatch({ type: ActionTypes.Role.SELECT, id: id });
    }
}

//角色绑定多个用户
export function bindUsers(id, userIds, cb) {
    cb = cb || function () { };
    return (dispatch) => {
        http.post("/api/role/binduser", { roleId: id, userIds }, function (result) {
            if (result.success) {
                msg("成功", "绑定用户成功", "success");
            } else {
                msg("失败", result.message, "error");
            }
            cb(result);
        });
    }
}

//获取所有的客户端资源
export function loadAllClient(cb) {
    cb = cb || function () { };
    return (dispatch) => {
        http.get("/api/client", {}, function (result) {
            if (result.success) {
                dispatch({ type: ActionTypes.Role.LOADALLCLIENT, clients: result.data });
            }
            cb(result);
        });
    }
}

export function loaddAllUsers(cb) {
    cb = cb || function () { };
    return (dispatch) => {
        http.get("/api/role/allroleusers", {}, function (result) {
            if (result.success) {
                dispatch({ type: ActionTypes.Role.LOADALLUSERS, datas: result.data });
            }
            cb(result);
        });
    }
}

//角色下面的多个用户加载
export function loadRoleUsers(Id, cb) {
    cb = cb || function () { };
    return (dispatch) => {
        http.get("/api/role/roleusers", { Id: Id }, function (result) {
            if (result.success) {
                dispatch({ type: ActionTypes.Role.LOADROLEUSERS, datas: result.data });
                cb(result);
                $(".RoleUsersModal").modal("show");
            } else {
                cb(result);
            }
        });
    }
}

//移除一个角色下面的多个用户
export function delRoleUsers(id, userIds) {
    return (dispatch) => {
        http.delete("/api/role/removeroleusers", { RoleId: id, UserIds: userIds }, function (result) {
            if (result.success) {
                dispatch({ type: ActionTypes.Role.REMOVEUSERS, ids: userIds });
                msg("成功", "移除用户成功", "success");
            } else {
                msg("失败", "移除用户失败", "error");
            }
        });
    }
}