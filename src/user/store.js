import { configureStore} from "@reduxjs/toolkit";
import rootReducer from "../admin/reducers/adminReducer";
import {persistReducer, persistStore} from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
    key: 'userAuth',
    storage
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

const userStore = configureStore({
    reducer: persistedReducer,
})

export const persistor = persistStore(userStore);
export default userStore; 