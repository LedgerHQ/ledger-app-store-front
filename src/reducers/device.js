// @flow
import * as types from '../actions/actionTypes'

type State = {
  challenge: string,
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
  challenge: '',
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
    case types.U2F_DEVICE_CHALLENGE:
      return {
        ...state,
        challenge: action.payload,
      }
    case types.U2F_DEVICE_CHALLENGE_SUCCESS:
      return {
        ...state,
        deviceSuccess: true,
      }
    case types.U2F_DEVICE_CHALLENGE_ERROR:
      return {
        ...state,
        challenge: '',
        pending: false,
        deviceError: action.payload,
      }
    case types.U2F_DEVICE_REGISTER_SUCCESS:
      return {
        ...state,
        challenge: '',
        pending: false,
        registerSuccess: true,
      }
    case types.U2F_DEVICE_REGISTER_ERROR:
      return {
        ...state,
        challenge: '',
        pending: false,
        registerError: action.payload,
      }
    default:
      return state
  }
}

export default deviceReducer
