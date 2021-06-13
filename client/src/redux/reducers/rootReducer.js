import { combineReducers } from "redux";
import itemReducer from "./itemReducer";
import authReducer from "./authReducer";
import userReducer from "./userReducer";
import orderReducer from "./orderReducer";

const rootReducer = combineReducers({
  itemReducer,
  authReducer,
  userReducer,
  orderReducer,
});

export default rootReducer;
