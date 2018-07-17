// @flow
import * as types from '../actions/action-types'

type State = {
  +applications: Object[],
  +firmwares: Object[],
  +providers: Object[],
  +publishers: Object[],
  +categories: Object[],
  +devices: Object[],
  +icons: Object[],
  +mcu: Object[],
  +error: string,
  +success: boolean,
  +type: string,
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
  icons: [],
  mcu: [],
  error: '',
  success: false,
  type: '',
}

const resources = (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case types.GET_APPLICATIONS:
      return {
        ...state,
        applications: action.payload,
        error: '',
        success: false,
        type: '',
      }
    case types.GET_FIRMWARES:
      return {
        ...state,
        firmwares: action.payload,
        error: '',
        success: false,
        type: '',
      }
    case types.GET_DEVICES:
      return {
        ...state,
        devices: action.payload,
        error: '',
        success: false,
        type: '',
      }
    case types.GET_PROVIDERS:
      return {
        ...state,
        providers: action.payload,
        error: '',
        success: false,
        type: '',
      }
    case types.GET_PUBLISHERS:
      return {
        ...state,
        publishers: action.payload,
        error: '',
        success: false,
        type: '',
      }
    case types.GET_CATEGORIES:
      return {
        ...state,
        categories: action.payload,
        error: '',
        success: false,
        type: '',
      }
    case types.GET_MCU:
      return {
        ...state,
        mcu: action.payload,
        error: '',
        success: false,
        type: '',
      }
    case types.GET_ICONS:
      return {
        ...state,
        icons: action.payload,
        error: '',
        success: false,
        type: '',
      }
    case types.RESOURCES_ERROR:
      return {
        ...state,
        error: action.payload,
        success: false,
        type: '',
      }
    case types.CREATE_RESOURCE_SUCCESS:
    case types.DELETE_RESOURCE_SUCCESS:
    case types.UPDATE_RESOURCE_SUCCESS:
      return {
        ...state,
        error: '',
        success: true,
      }
    case types.CREATE_RESOURCE:
    case types.DELETE_RESOURCE:
    case types.UPDATE_RESOURCE:
      return {
        ...state,
        error: '',
        success: false,
        type: action.payload,
      }
    default:
      return state
  }
}

export default resources
