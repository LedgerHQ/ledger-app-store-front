// @flow
import * as types from '../actions/actionTypes'

type State = {
  email: string,
  loading: boolean,
  success: boolean,
  pending: boolean,
  error: string,
}

type Action = {
  type: string,
  payload?: any,
}

const initialState: State = {
  email: '',
  loading: false,
  success: true,
  pending: false,
  error: '',
}

const authReducer = (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case types.LOGIN_START:
      return {
        ...state,
        loading: true,
        email: action.payload,
      }
    case types.LOGIN_SUCCESS:
      return {
        ...state,
        success: true,
        loading: false,
      }
    case types.LOGIN_ERROR:
      return {
        ...state,
        success: false,
        loading: false,
        error: action.payload,
      }
    case types.LOGIN_PENDING:
      return {
        ...state,
        pending: action.payload,
      }
    default:
      return state
  }
}

export default authReducer
