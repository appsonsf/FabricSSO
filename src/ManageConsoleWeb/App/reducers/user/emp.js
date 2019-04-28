import ActionTypes from "../../ActionTypes";

const initState = {
    emps: []
};

export default function Emp(state = initState, action) {
    state = Object.assign({}, state);
    switch (action.type) {
        case ActionTypes.EMP.LOAD:
            state.emps = action.datas;
            return state;
        case ActionTypes.EMP.CREATEUSER:
            state.emps.forEach(u => {
                if (u.idCardNo === action.idcardNo) {
                    u.haveRegisteUser = true;
                }
            });
            return state;
        default:
            return state;
    }
}
