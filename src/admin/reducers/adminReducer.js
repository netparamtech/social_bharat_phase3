import { combineReducers } from "redux";
import authReducer from "./authReducer";
import userAuthReducer from "../../user/reducers/userAuthReducer";

const rootReducer = combineReducers({
    auth: authReducer,
    userAuth: userAuthReducer,
});

export default rootReducer;