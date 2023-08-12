import { configureStore} from "@reduxjs/toolkit";
import adminReducer from "./reducers/adminReducer";
import {persistReducer, persistStore} from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
    key: 'admin',
    storage
}

const persistedReducer = persistReducer(persistConfig, adminReducer);

const adminStore = configureStore({
    reducer: persistedReducer,
})

export const persistor = persistStore(adminStore);
export default adminStore; 