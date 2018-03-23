// @flow
import * as types from '../actions/action-types'

type State = {
  +applications: Object[],
  +firmwares: Object[],
  +active: string,
  +error: string,
}

type Action = {
  type: string,
  payload?: any,
}

export const initialState: State = {
  applications: [],
  active: '',
  firmwares: [],
  error: '',
}

const resources = (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case types.GET_APPLICATIONS:
      return {
        ...state,
        applications: action.payload,
      }
    case types.SELECT_APPLICATION:
      return {
        ...state,
        active: action.payload,
      }
    case types.GET_FIRMWARE_VERSIONS:
      return {
        ...state,
        firmwares: action.payload,
      }
    case types.RESOURCES_ERROR:
      return {
        ...state,
        error: action.payload,
      }
    default:
      return state
  }
}

export default resources
