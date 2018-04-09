// @flow
import * as types from '../actions/action-types'

type State = {
  +username: string,
  +loading: boolean,
  +success: boolean,
  +pending: boolean,
  +error: string,
  +token: string,
}

type Action = {
  type: string,
  payload?: any,
}

export const initialState: State = {
  username: '',
  loading: false,
  success: false,
  pending: false,
  error: '',
  token: '',
}

const authReducer = (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case types.LOGIN_START:
      return {
        ...state,
        loading: true,
        username: action.payload,
      }
    case types.LOGIN_SUCCESS:
      return {
        ...state,
        success: true,
        token: action.payload,
      }
    case types.LOGIN_ERROR:
      return {
        ...state,
        success: false,
        loading: false,
        error: action.payload,
      }
    case types.LOGIN_U2F:
      return {
        ...state,
        pending: true,
      }
    case types.LOGIN_FINISH:
      return {
        ...state,
        pending: false,
        loading: false,
      }
    case types.LOGOUT:
      return {
        ...initialState,
      }
    default:
      return state
  }
}

export default authReducer
