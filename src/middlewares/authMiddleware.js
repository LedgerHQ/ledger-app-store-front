// @flow
import * as types from '../actions/action-types'
import { u2fAuth } from '../actions/u2f-actions'
import { loginFinish, loginSuccess } from '../actions/auth-actions'

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
  const result = next(action)

  switch (action.type) {
    case types.LOGIN_U2F: {
      const { payload } = action
      store.dispatch(u2fAuth(payload))
      return result
    }
    case types.U2F_ERROR: {
      store.dispatch(loginFinish())
      return result
    }
    case types.U2F_SERVER_SUCCESS: {
      store.dispatch(loginSuccess(action.payload))
      store.dispatch(loginFinish())
      return result
    }
    default:
      return result
  }
}

export default authMiddleware
