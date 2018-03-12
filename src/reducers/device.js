// @flow
import * as types from '../actions/actionTypes'

type State = {
  pending: boolean,
  deviceSuccess: boolean,
  deviceError: string,
  registerSuccess: boolean,
  registerError: string,
}

type Action = {
  type: string,
  payload?: any,
}

const initialState: State = {
  pending: false,
  deviceSuccess: false,
  deviceError: '',
  registerSuccess: false,
  registerError: '',
}

const deviceReducer = (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case types.ADD_U2F_DEVICE:
      return {
        ...initialState,
        pending: true,
      }
    case types.U2F_DEVICE_CHALLENGE_SUCCESS:
      return {
        ...state,
        deviceSuccess: true,
      }
    case types.U2F_DEVICE_CHALLENGE_ERROR:
      return {
        ...state,
        pending: false,
        deviceError: action.payload,
      }
    case types.U2F_DEVICE_REGISTER_SUCCESS:
      return {
        ...state,
        pending: false,
        registerSuccess: true,
      }
    case types.U2F_DEVICE_REGISTER_ERROR:
      return {
        ...state,
        pending: false,
        registerError: action.payload,
      }
    case types.U2F_DEVICE_CHALLENGE:
    default:
      return state
  }
}

export default deviceReducer
