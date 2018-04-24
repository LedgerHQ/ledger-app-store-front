// @ flow
// import * as types from '../actions/action-types'
import { logout } from '../actions/auth-actions'
import { isUnauthorized } from '../utils/errors'

type Action = {
  type: string,
  payload: any,
}

type Store = {
  dispatch: Function,
  getState: Function,
}

const errorMiddleware = (store: Store): Function => (next: Function): Function => (
  action: Action,
): Function => {
  switch (true) {
    case action.type.endsWith('ERROR'): {
      const result = next(action)

      if (isUnauthorized(action)) {
        store.dispatch(logout())
      }

      return result
    }
    default:
      return next(action)
  }
}

export default errorMiddleware
