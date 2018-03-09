// @flow
import * as types from '../actions/actionTypes'
import { u2fAuth } from '../actions/u2fActions'
import { loginFinish, loginSuccess } from '../actions/authActions'

type Action = {
  type: string,
  payload: any,
}
type Store = {
  dispatch: Function,
  getState: Function,
}

const authMiddleware = (store: Store): Function => (next: Function): Function => (
  action: Action,
): Function => {
  switch (action.type) {
    case types.LOGIN_U2F: {
      const result = next(action)
      const { payload } = action
      store.dispatch(u2fAuth(payload))
      return result
    }
    case types.U2F_DEVICE_ERROR:
    case types.U2F_SERVER_ERROR: {
      const result = next(action)
      store.dispatch(loginFinish())
      return result
    }
    case types.U2F_SERVER_SUCCESS: {
      const result = next(action)
      store.dispatch(loginSuccess(action.payload))
      store.dispatch(loginFinish())
      return result
    }
    default:
      return next(action)
  }
}

export default authMiddleware
