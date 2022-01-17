import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import permissionsReducer from './permissionsReducer'
const reducer = combineReducers({
  permissionsReducer,
})
const store = configureStore({
  reducer,
})
export default store;