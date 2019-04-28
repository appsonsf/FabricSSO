import { combineReducers } from 'redux';

import Role from "./role";
import UserRole from "./userrole";

const RoleReducers = combineReducers({
    Role,
    UserRole
});

export default RoleReducers;
