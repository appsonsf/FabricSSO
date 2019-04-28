import { combineReducers } from 'redux';

import User from "./user";
import Emp from "./emp";

const UserReducers = combineReducers({
    User,
    Emp
});

export default UserReducers;