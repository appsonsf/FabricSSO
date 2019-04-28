import ActionTypes from "../../ActionTypes";

const initState = {
    clients: []
}

export default function Client(state = initState, action) {
    state = Object.assign({}, state);
    switch (action.type) {
        case ActionTypes.Client.ADD:
            state.clients.push(action.data);
            return state;
        case ActionTypes.Client.LOAD:
            state.clients = action.datas;
            return state;
        case ActionTypes.Client.UPDATE:
            state.clients = state.clients.map(u => {
                if (u.clientId === action.data.clientId)
                    return action.data;
                return u;
            });
            return state;
        case ActionTypes.Client.DELETE:
            state.clients = state.clients.filter(u => u.clientId !== action.id);
            return state;
        default:
            return state;
    }
}