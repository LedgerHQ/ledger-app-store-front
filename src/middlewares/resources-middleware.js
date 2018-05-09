// @flow
import * as types from '../actions/action-types'
import { fetchResource } from '../actions/resources-actions'
import { getTopLevelFromVersion } from '../utils/string'

type Action = {
  type: string,
  payload: any,
}
type Store = {
  dispatch: Function,
  getState: Function,
}

const resourcesMiddleware = (store: Store): Function => (next: Function): Function => (
  action: Action,
): Function => {
  const result = next(action)

  switch (action.type) {
    case types.CREATE_RESOURCE_SUCCESS:
    case types.DELETE_RESOURCE_SUCCESS:
    case types.UPDATE_RESOURCE_SUCCESS: {
      if (action.payload.endsWith('versions')) {
        const type = getTopLevelFromVersion(action.payload)
        store.dispatch(fetchResource(type))
      } else {
        store.dispatch(fetchResource(action.payload))
      }
      return result
    }
    default:
      return result
  }
}

export default resourcesMiddleware
