import ActionTypes from "../../ActionTypes";


import http from "../../_shared/http";
import urls from "../../_shared/urls";
import msg from "../../_shared/msg";
import confirm from "../../_shared/confirm";


//加载所有的数据,这里开始要进行分页操作
export function load(data, cb) {
    cb = cb || function () { };
    return (dispatch) => {
        http.post("/api/empinfo/", data, result => {
            if (result.success) {
                dispatch({ type: ActionTypes.EMP.LOAD, datas: result.data.data });
            }
            cb(result);
        });
    }
}

export function createUser(idcardNo) {
    return (dispatch) => {
        dispatch({ type: ActionTypes.EMP.CREATEUSER, idcardNo });
    }
}