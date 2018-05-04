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
  +success: boolean,
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
  success: false,
}

const resources = (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case types.GET_APPLICATIONS:
      return {
        ...state,
        applications: action.payload,
        success: false,
      }
    case types.GET_FIRMWARES:
      return {
        ...state,
        firmwares: action.payload,
        success: false,
      }
    case types.GET_DEVICES:
      return {
        ...state,
        devices: action.payload,
        success: false,
      }
    case types.GET_PROVIDERS:
      return {
        ...state,
        providers: action.payload,
        success: false,
      }
    case types.GET_PUBLISHERS:
      return {
        ...state,
        publishers: action.payload,
        success: false,
      }
    case types.GET_CATEGORIES:
      return {
        ...state,
        categories: action.payload,
        success: false,
      }
    case types.GET_MCU:
      return {
        ...state,
        mcu: action.payload,
        success: false,
      }
    case types.RESOURCES_ERROR:
      return {
        ...state,
        error: action.payload,
        success: false,
      }
    case types.CREATE_RESOURCE_SUCCESS:
    case types.DELETE_RESOURCE_SUCCESS:
    case types.UPDATE_RESOURCE_SUCCESS:
      return {
        ...state,
        success: true,
      }
    case types.CREATE_RESOURCE:
    case types.DELETE_RESOURCE:
    case types.UPDATE_RESOURCE:
      return {
        ...state,
        success: false,
      }
    default:
      return state
  }
}

export default resources
