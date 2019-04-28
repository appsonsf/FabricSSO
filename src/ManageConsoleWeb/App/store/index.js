import { createStore, applyMiddleware, combineReducers } from 'redux'
import logger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import { routerMiddleware, push } from 'react-router-redux'

//引入reducers
import RoleReducers from "../reducers/role/"
import ClientReducers from "../reducers/client/"
import UserReducers from "../reducers/user/"

const rootReducer = combineReducers({
    Role: RoleReducers,
    Client: ClientReducers,
    User:UserReducers
});


let Store = createStore(
    rootReducer,
    applyMiddleware(thunkMiddleware, logger)
);
export default Store;