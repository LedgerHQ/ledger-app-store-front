// @flow
import * as types from '../actions/action-types'

type State = {
  +applications: Object[],
  +firmwares: Object[],
  +providers: Object[],
  +publishers: Object[],
  +categories: Object[],
  +devices: Object[],
  +mcu: Object[],
  +error: string,
}

type Action = {
  type: string,
  payload?: any,
}

export const initialState: State = {
  applications: [],
  firmwares: [],
  devices: [],
  providers: [],
  publishers: [],
  categories: [],
  mcu: [],
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
    case types.GET_DEVICES:
      return {
        ...state,
        devices: action.payload,
      }
    case types.GET_PROVIDERS:
      return {
        ...state,
        providers: action.payload,
      }
    case types.GET_PUBLISHERS:
      return {
        ...state,
        publishers: action.payload,
      }
    case types.GET_CATEGORIES:
      return {
        ...state,
        categories: action.payload,
      }
    case types.GET_MCU:
      return {
        ...state,
        mcu: action.payload,
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
