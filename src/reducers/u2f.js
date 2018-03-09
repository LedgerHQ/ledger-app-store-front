// @flow
import * as types from '../actions/actionTypes'

type State = {
  requested: boolean,
  deviceSuccess: boolean,
  deviceError: string,
  serverSuccess: boolean,
  serverError: string,
}

type Action = {
  type: string,
  payload?: any,
}

const initialState: State = {
  requested: false,
  deviceSuccess: false,
  deviceError: '',
  serverSuccess: false,
  serverError: '',
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
    case types.U2F_DEVICE_ERROR:
      return {
        ...state,
        deviceError: action.payload,
      }
    case types.U2F_SERVER_SUCCESS:
      return {
        ...state,
        serverSuccess: true,
      }
    case types.U2F_SERVER_ERROR:
      return {
        ...state,
        serverError: action.payload,
      }
    case types.U2F_SEND_CHALLENGE:
    default:
      return state
  }
}

export default u2fReducer
