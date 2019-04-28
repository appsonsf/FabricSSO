import ActionTypes from "../../ActionTypes";

const initState = {
    resources: null
}

export default function Resources(state = initState, action) {
    state = Object.assign({}, state);
    switch (action.type) {
        case ActionTypes.Resouces.LOAD:
            state.resources = action.datas;
            return state;
        case ActionTypes.Resouces.ADD:  //这里要进行一次区分
            if (action.data.type === "api") {
                state.resources.apiResources.push(action.data);
            } else {
                state.resources.identityResources.push(action.data);
            }
            return state;
        case ActionTypes.Resouces.UPDATE:
            if (action.data.type === "api") {
                state.resources.apiResources = state.resources.apiResources.map(u => {
                    if (u.name === action.data.name)
                        return action.data;
                    return u;
                });
            } else {
                state.resources.identityResources = state.resources.identityResources.map(u => {
                    if (u.name === action.data.name)
                        return action.data;
                    return u;
                });
            }
            return state;
        case ActionTypes.Resouces.DELETE:
            if (action.data.type === "api") {
                state.resources.apiResources = state.resources.apiResources.filter(u => u.name !== action.data.Name);
            } else {
                state.resources.identityResources = state.resources.identityResources.filter(u => u.name !== action.data.IdentityName);
            }
            return state;
        default:
            return state;
    }
}