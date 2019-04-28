import ActionTypes from "../../ActionTypes";

const initState = {
    users: [],
    backs: []  //备份
};

export default function User(state = initState, action) {
    state = Object.assign({}, state);
    switch (action.type) {
        case ActionTypes.User.LOAD:
            state.users = action.datas;
            state.backs = Object.assign([], action.datas);
            return state;
        case ActionTypes.User.DELETE:
            state.users = state.users.filter(u => u.id.id !== action.id);
            state.backs = Object.assign([], state.users);
            return state;
        case ActionTypes.User.SEARCH:
            search(state, action.data);
            return state;
        case ActionTypes.User.EDITMOBILE:
            state.users = state.users.map(u => {
                if (u.id.id === action.data.id.id)
                    return action.data;
                return u;
            });
            return state;
        case ActionTypes.User.UPDATESTATE:
            state.users = state.users.map(u => {
                if (u.id.id === action.id) {
                    u.isActive = !u.isActive;
                }
                return u;
            });
            return state;
        case ActionTypes.User.ADD:
            state.users.push(action.data);
            return state;
        default:
            return state;
    }
}

//处理搜索,搜索的时候,要从备份对象中取回完整的数据
//username,name,
function search(state, data) {
    state.users = Object.assign([], state.backs);
    state.users = state.users.filter(u => {
        //console.log(u);
        console.log(u)
        if (data.username !== "" && (u.username === null || u.username.indexOf(data.username) < 0))
            return false;
        if (data.name !== "" && (u.name === null || u.name.indexOf(data.name) < 0))
            return false;
        if (data.idCardNo !== "" && (u.idCardNo === null || u.idCardNo.indexOf(data.idCardNo) < 0))
            return false;
        if (data.employeeNumber !== "" && (u.employeeNumber === null || u.employeeNumber.indexOf(data.employeeNumber) < 0))
            return false;
        if (data.mobile !== "" && (u.mobile === null || u.mobile.indexOf(data.mobile) < 0))
            return false;
        if (data.email !== "" && (u.email !== null || u.email.indexOf(data.email) < 0))
            return false;
        if (data.lock === true && u.lockoutEnd !== null)
            return true;
        else if (data.lock === true && u.lockoutEnd === null)
            return false;
        return true;
    });
}