// @flow
import * as types from '../actions/actionTypes'

type Action = {
  type: string,
  payload?: any,
}

type Store = {
  dispatch: Function,
  getState: Function,
}

const authMiddleware = (store: Store): Function => (next: Function): Function => (
  action: Action,
): Function => {
  if (action.type === types.LOGIN_U2F) {
    const result = next(action)
    const { payload } = action
    console.log(payload)
    console.log(store)
    return result
  }
  return next(action)
}

export default authMiddleware
