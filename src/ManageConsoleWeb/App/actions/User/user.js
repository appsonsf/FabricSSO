import ActionTypes from "../../ActionTypes";

//引入http
import http from "../../_shared/http";
import urls from "../../_shared/urls";
import msg from "../../_shared/msg";
import confirm from "../../_shared/confirm";

export function load(cb) {
    cb = cb || function () { };
    return (dispatch) => {
        http.get("/api/user", {}, x => {
            if (x.success) {
                dispatch({ type: ActionTypes.User.LOAD, datas: x.data });
                cb(x);
            } else {
                cb(x);
            }
        });
    }
}

export function editUserName(id, userName, cb) {
    cb = cb || function () { };
    return (dispatch) => {
        http.post("/api/user/rename", { id, userName }, x => {
            if (x.success) {
                dispatch({ type: ActionTypes.User.EDITUSERNAME, data: x.data });
            }
            cb(x);
        });
    }
}

export function del(id, cb) {
    cb = cb || function () { };
    return (dispatch) => {
        confirm(_ => {
            http.delete("/api/user", { id }, x => {
                if (x.success) {
                    dispatch({ type: ActionTypes.User.DELETE, id });
                }
                cb(x);
            });
        },
            "确定要删除该用户");
    }
}

export function editMobile(id, Mobile, cb) {
    cb = cb || function () { };
    return (dispatch) => {
        http.put("/api/user", { id, Mobile }, x => {
            if (x.success) {
                dispatch({ type: ActionTypes.User.EDITMOBILE, data: x.data });
            }
            cb(x);
        });
    }
}

export function editPassword(id, password1, pasword2, cb) {
    cb = cb || function () { };
    return (dispatch) => {
        http.put("/api/user/updatepassword", { id, password: password1, repassword: pasword2 }, x => {
            cb(x);
        });
    }
}

//修改状态
export function editState(id, cb) {
    cb = cb || function () { }
    return (dispatch) => {
        http.put("/api/user/updatestate", { id }, x => {
            if (x.success) {
                dispatch({ type: ActionTypes.User.UPDATESTATE, id });
            }
            cb(x);
        });
    }
}

export function unLockUser(id, cb) {
    cb = cb || function () { };
    return (dispatch) => {
        confirm(_ => {
            http.post("/api/user/unlockUser?userid=" + id, null, x => {
                cb(x);
            });
        }, "确定解除锁定状态");

    }
}


export function add(data, cb) {
    cb = cb || function () { };
    return (dispatch) => {
        http.post("/api/user", data, x => {
            if (x.success) {
                dispatch({ type: ActionTypes.User.ADD, data: x.data });
            }
            cb(x);
        });
    }
}

//搜索
export function search(data) {
    return (dispatch) => {
        dispatch({ type: ActionTypes.User.SEARCH, data: data });
    }
}

//取消搜索
export function cancelSearch() {
    return (dispatch) => {
        dispatch({ type: ActionTypes.User.CANCELSEARCH });
    }
}