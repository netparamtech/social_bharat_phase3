import { configureStore} from "@reduxjs/toolkit";
import rootReducer from "./reducers/adminReducer";
import {persistReducer, persistStore} from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
    key: 'admin',
    storage
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

const adminStore = configureStore({
    reducer: persistedReducer,
})

export const persistor = persistStore(adminStore);
export default adminStore; 