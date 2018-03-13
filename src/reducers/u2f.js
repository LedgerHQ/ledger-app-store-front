// @flow
import * as types from '../actions/actionTypes'

type State = {
  +requested: boolean,
  +deviceSuccess: boolean,
  +error: string,
  +serverSuccess: boolean,
}

type Action = {
  type: string,
  payload?: any,
}

const initialState: State = {
  requested: false,
  deviceSuccess: false,
  error: '',
  serverSuccess: false,
}

const u2fReducer = (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case types.U2F_REQUESTED:
      return {
        ...initialState,
        requested: true,
      }
    case types.U2F_DEVICE_SUCCESS:
      return {
        ...state,
        deviceSuccess: true,
      }
    case types.U2F_ERROR:
      return {
        ...initialState,
        error: action.payload,
      }
    case types.U2F_SERVER_SUCCESS:
      return {
        ...state,
        serverSuccess: true,
      }
    case types.u2F_CANCEL:
      return {
        ...initialState,
      }
    case types.U2F_SEND_CHALLENGE:
    default:
      return state
  }
}

export default u2fReducer
