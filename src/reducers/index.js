import { combineReducers } from 'redux'
import auth from './auth'
import u2f from './u2f'
import device from './device'
import resources from './resources'

export default combineReducers({
  auth,
  u2f,
  device,
  resources,
})
