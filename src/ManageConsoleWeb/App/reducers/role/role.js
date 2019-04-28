import ActionTypes from "../../ActionTypes";

const initState = {
    select: "", //选中的Id
    datas: [
    ],
    clients: [], //客户端资源
    users: [],     //所有用户
    roleUsers: []   //角色下面的用户
}

export default function Role(state = initState, action) {
    state = Object.assign({}, state);
    switch (action.type) {
        case ActionTypes.Role.REMOVEUSERS:
            //这里从新公共一个类库出来
            var temps = [];//将会被删除的数据
            var ids = action.ids;
            for (let i = 0; i < state.roleUsers.length; i++) {
                for (let j = 0; j < ids.length; j++) {
                    if (state.roleUsers[i].id === ids[j]) {
                        temps.push(state.roleUsers[i]);
                    }
                }
            }

            for (let i = 0; i < temps.length; i++) {
                let index = state.roleUsers.indexOf(temps[i]);
                if (index > -1)
                    state.roleUsers.splice(index, 1);
            }
            return state;
        case ActionTypes.Role.LOADROLEUSERS:
            state.roleUsers = action.datas;
            return state;
        case ActionTypes.Role.LOADALLUSERS:
            state.users = action.datas;
            return state;
        case ActionTypes.Role.LOADALLCLIENT:

            state.clients = action.clients;
            return state;
        case ActionTypes.Role.LOADALL:
            state.datas = []; //清楚之前的影响
            for (let i = 0; i < action.datas.length; i++) {
                state.datas.push(action.datas[i]);
            }
            return state;

        case ActionTypes.Role.UPDATE:

            for (let i = 0; i < state.datas.length; i++) {
                if (state.datas[i].id === action.data.id) {
                    state.datas[i].name = action.data.name;
                    state.datas[i].clientIds = [];
                    for (let j = 0; j < action.data.clientId.length; j++) {
                        var id = action.data.clientId[j];
                        //根据id找到客户端名称
                        var client = state.clients.filter(u => u.clientId === id)[0];
                        state.datas[i].clientIds.push({ clientId: id, clientName: client.clientName });
                    }
                    break;
                }
            }
            return state;

        case ActionTypes.Role.ADD:
            var item = {
                id: action.data.id,
                name: action.data.name,
                clientIds: [] //遍历查找
            }
            action.data.clientId.map(u => {
                var client = state.clients.filter(x => x.clientId === u)[0];//必须找到
                item.clientIds.push({ clientId: client.clientId, clientName: client.clientName });
            });
            state.datas.push(item);
            return state;
        case ActionTypes.Role.DELETE:

            var temp = null;
            for (let i = 0; i < state.datas.length; i++) {
                if (state.datas[i].id === action.id)
                    temp = state.datas[i];
            }
            if (temp != null) {
                var index = state.datas.indexOf(temp);
                if (index > -1)
                    state.datas.splice(index, 1);
            }
            return state;
        case ActionTypes.Role.SELECT:

            state.select = action.id;
            return state;
        default:
            return state;
    }
}