import { combineReducers } from 'redux'
import authReducer from './auth'
import u2fReducer from './u2f'

export default combineReducers({
  auth: authReducer,
  u2f: u2fReducer,
})
