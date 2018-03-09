import { combineReducers } from 'redux'
import auth from './auth'
import u2f from './u2f'
import device from './device'

export default combineReducers({
  auth,
  u2f,
  device,
})
