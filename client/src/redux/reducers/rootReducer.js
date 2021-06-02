import { combineReducers } from "redux";
import itemReducer from "./itemReducer";
import authReducer from "./authReducer";

const rootReducer = combineReducers({ itemReducer, authReducer });

export default rootReducer;
