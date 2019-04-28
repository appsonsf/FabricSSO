import { combineReducers } from 'redux';

import Client from "./client";
import Resources from "./resources";

const ClientReducers = combineReducers({
    Client,
    Resources
});

export default ClientReducers;

