import AsyncStorage from "@react-native-async-storage/async-storage";
import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from 'react-redux';
import {
  FLUSH, PAUSE,
  PERSIST, persistReducer, persistStore, PURGE,
  REGISTER, REHYDRATE
} from "redux-persist";
import rootReducer from "./reducers";



const persistConfig = {
  key: "root",
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
    // middleware: [...getDefaultMiddleware({ thunk })],
    // middleware: applyMiddleware(thunkMiddleware),
    //  middleware: [thunkMiddleware, ...getDefaultMiddleware()],
    // middleware: (getDefaultMiddleware) =>
    // getDefaultMiddleware().concat(thunk),
  // devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  })
});

// export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch 

export const persistor = persistStore(store);
