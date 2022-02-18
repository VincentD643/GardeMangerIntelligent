import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  persistReducer
} from 'redux-persist'
import gardeMangerReducer from './gardeMangerReducer'
import groceryListReducer from "./groceryListReducer";
import historyReducer from './historyReducer';

const reducer = combineReducers({
  gardeMangerReducer,
  groceryListReducer,
  historyReducer
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
      serializableCheck: false
    }),
})



export default store;