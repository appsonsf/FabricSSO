import ActionTypes from "../../ActionTypes";

//引入http
import http from "../../_shared/http";
import urls from "../../_shared/urls";
import msg from "../../_shared/msg";
import confirm from "../../_shared/confirm";

//加载一个角色下面的用户,id 角色的id
export function load(cb) {
    cb = cb || function () { };
    return (dispatch) => {
        http.get("/api/roleuser", {}, function (result) {
            if (result.success) {
                dispatch({ type: ActionTypes.UserRole.LOAD, datas: result.data });
                cb(result);
            } else {
                msg("失败", result.message, "error");
                cb(result);
            }
        });
    }
}


//删除角色用户
export function del(userId, roleId) {
    return (dispatch) => {
        http.post("", { userId, roleId }, function (result) {
            if (result.success) {
                dispatch({ type: ActionTypes.UserRole.DELETE, id: userId });
                msg("成功", "删除角色用户成功", "success");
            } else {
                msg("失败", result.message, "error");
            }
        });
    }
}

export function removeRole(userId, roleIds) {
    return (dispatch) => {
        //dispatch({ type: ActionTypes.UserRole.USERREMOVEROLES, data: { userId, roleIds } });
        confirm(function () {
            http.delete("/api/roleuser/removeroles", { userId, roleIds },
                function (result) {
                    if (result.success) {
                        dispatch({ type: ActionTypes.UserRole.USERREMOVEROLES, data: { userId, roleIds } });
                        msg("成功", "移除角色成功", "success");
                    } else {
                        msg("失败", result.message, "error");
                    }
                });
        },
            "是否要删除该用户下所有的角色?");
    }
}

export function updateRoles(userId, roles) {
    return (dispatch) => {
        //dispatch({ type: ActionTypes.UserRole.UPDATEUSERROLES, data: { userId, roles } });
        var roleIds = [];
        for (let i = 0; i < roles.length; i++) {
            roleIds.push(roles[i].id);
        }
        http.put("/api/roleuser", { userId, roleIds }, function (result) {
            if (result.success) {
                dispatch({ type: ActionTypes.UserRole.UPDATEUSERROLES, data: { userId, roles } });
                msg("成功", "更新用户角色成功!", "success");
            } else {
                msg("失败", result.message, "error");
            }
        });
    }
}