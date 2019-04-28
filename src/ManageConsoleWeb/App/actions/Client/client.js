import ActionTypes from "../../ActionTypes";

import http from "../../_shared/http";
import msg from "../../_shared/msg";
import confirm from "../../_shared/confirm";


export function load(cb) {
    cb = cb || function () { };
    return dispatch => {
        http.get("/api/client", {}, result => {
            if (result.success) {
                dispatch({ type: ActionTypes.Client.LOAD, datas: result.data });
                cb(result);
            } else {
                cb(result);
            }
        });
    };
}

//添加一个客户端
export function add(data, cb) {
    cb = cb || function () { };
    return (dispatch) => {
        http.post("/api/client", data, function (result) {
            if (result.success) {
                data = result.data;
                dispatch({ type: ActionTypes.Client.ADD, data });
                cb(result, data); //这个data包含了数据Id
            } else {
                cb(result, data);
            }
        });
    }
}

//更新客户端
export function update(data, cb) {
    cb = cb || function () { }
    return (dispatch) => {
        http.put("/api/client", data, result => {
            if (result.success) {
                dispatch({ type: ActionTypes.Client.UPDATE, data: result.data });
                cb(result);
            } else {
                cb(result);
            }
        });
    }
}

export function del(id, cb) {
    cb = cb || function () { };
    return dispatch => {
        confirm(_ => {
            http.delete("/api/client", { ClientId: id }, result => {
                if (result.success) {
                    dispatch({ type: ActionTypes.Client.DELETE, id });
                    cb(result);
                } else {
                    cb(result);
                }
            });
        },
            "确定要删除此客户端?");
    }
}