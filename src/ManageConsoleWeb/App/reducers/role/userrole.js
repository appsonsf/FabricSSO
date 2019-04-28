import ActionTypes from "../../ActionTypes";

const initState = {
    items: []
};


export default function UserRole(state = initState, action) {
    state = Object.assign({}, state);
    switch (action.type) {
        case ActionTypes.UserRole.UPDATEUSERROLES:
            var temp = null;
            for (let i = 0; i < state.items.length; i++) {
                if (state.items[i].id === action.data.userId) {
                    temp = state.items[i];
                    break;
                }
                    
            }
            temp.roles = action.data.roles;
            return state;
        case ActionTypes.UserRole.USERREMOVEROLES:
            var temp = null;
            var tempRoles = [];//将要排除的
            for (let i = 0; i < state.items.length; i++) {
                if (state.items[i].id === action.data.userId) {
                    temp = state.items[i]; //肯定会取到值
                    break;
                }
            }

            for (let i = 0;i < temp.roles.length; i++) {
                for (let j = 0; j < action.data.roleIds.length; j++) {
                    if (temp.roles[i].id === action.data.roleIds[j])
                        tempRoles.push(temp.roles[i]);
                }
            }

            for (let i = 0; i < tempRoles.length; i++) {
                let index = temp.roles.indexOf(tempRoles[i]);
                if (index > -1)
                    temp.roles.splice(index, 1);
            }
            return state;
        case ActionTypes.UserRole.LOAD:  //加载
            state.items = action.datas;
            return state;
        case ActionTypes.UserRole.DELETE: //移除一个用户
            var temp = null;
            for (let i = 0; i < state.items.length; i++) {
                if (state.items[i].id === action.id) {
                    temp = state.items[i];
                    break;
                }
            }
            //开始移除
            if (temp != null) {
                var index = state.items.indexOf(temp);
                if (index > -1)
                    state.items.splice(index, 1);
            }
            return state;
        default:
            return state;
    }
}