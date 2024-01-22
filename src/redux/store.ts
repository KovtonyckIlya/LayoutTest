import { configureStore } from '@reduxjs/toolkit'
import {rootReducer} from "./reducer"
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persistStore, persistReducer, PersistConfig } from "redux-persist";
const persistConfig = {
  key: "root",
  storage: AsyncStorage,
};
export const store = configureStore({
  reducer: {
    root:persistReducer(persistConfig, rootReducer),
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      
    }).concat(),

})
export type RootState = ReturnType<typeof store.getState>
export const persistor = persistStore(store);
export type AppDispatch = typeof store.dispatch