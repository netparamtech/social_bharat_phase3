import { combineReducers } from "redux";
import authReducer from "./authReducer";
import userAuthReducer from "../../user/reducers/userAuthReducer";
import loaderReducer from "../../user/reducers/loaderReducer";

const rootReducer = combineReducers({
    auth: authReducer,
    userAuth: userAuthReducer,
    loader: loaderReducer,
});

export default rootReducer;