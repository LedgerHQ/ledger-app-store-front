// @flow
import * as types from '../actions/action-types'

type State = {
  +pending: boolean,
  +deviceSuccess: boolean,
  +error: string,
  +registerSuccess: boolean,
}

type Action = {
  type: string,
  payload?: any,
}

export const initialState: State = {
  pending: false,
  deviceSuccess: false,
  error: '',
  registerSuccess: false,
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
    case types.U2F_DEVICE_REGISTER_SUCCESS:
      return {
        ...state,
        pending: false,
        registerSuccess: true,
      }
    case types.U2F_DEVICE_ERROR:
      return {
        ...state,
        pending: false,
        error: action.payload,
      }
    case types.U2F_DEVICE_CHALLENGE:
    case types.U2F_DEVICE_REGISTER:
    default:
      return state
  }
}

export default deviceReducer
