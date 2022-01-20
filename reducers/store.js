import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import permissionsReducer from './permissionsReducer'
import gardeMangerReducer from './gardeMangerReducer'

const reducer = combineReducers({
  permissionsReducer,
  gardeMangerReducer
})

const persistConfig = {
  key: 'root',
  version: 1,
  storage: AsyncStorage
}

const persistedReducer = persistReducer(persistConfig, reducer)

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})



export default store;