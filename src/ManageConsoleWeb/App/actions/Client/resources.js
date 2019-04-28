import ActionTypes from "../../ActionTypes";

import http from "../../_shared/http";

//加载所有的资源
export function load(cb) {
    cb = cb || function () { };
    return (dispatch) => {
        http.get("/api/resource", {}, function (result) {
            if (result.success) {
                dispatch({ type: ActionTypes.Resouces.LOAD, datas: result.data });
                cb(result);
            } else {
                cb(result);
            }
        });
    }
}

export function add(data, cb) {
    cb = cb || function () { };
    return (dispatch) => {
        http.post("/api/resource", data, result => {
            if (result.success) {
                result.data.type = data.type;
                dispatch({ type: ActionTypes.Resouces.ADD, data: result.data });
                cb(result);
            } else {
                cb(result);
            }
        });
    }
}

export function update(data, cb) {
    cb = cb || function () { };
    return (dispatch) => {
        http.put("/api/resource", data, result => {
            if (result.success) {
                result.data.type = data.type;
                dispatch({ type: ActionTypes.Resouces.UPDATE, data: result.data });
                cb(result);
            } else {
                cb(result);
            }
        });
    }
}

export function del(data, cb) {
    cb = cb || function () { };
    return (dispatch) => {
        http.delete("/api/resource", data, result => {
            if (result.success) {
                data.type = data.Name === "" ? "identity" : "api";
                dispatch({ type: ActionTypes.Resouces.DELETE, data });
                cb(result);
            } else {
                cb(result);
            }
        });
    }
}