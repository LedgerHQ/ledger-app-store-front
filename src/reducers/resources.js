// @flow
import * as types from '../actions/action-types'

type State = {
  +applications: Object[],
  +firmwares: Object[],
  // +mcu: Object[],
  // +bootloaders: Object[],
  // +devices: Object[],
  +error: string,
}

type Action = {
  type: string,
  payload?: any,
}

export const initialState: State = {
  applications: [],
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
    case types.GET_FIRMWARES:
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
