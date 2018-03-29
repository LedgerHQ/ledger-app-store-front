// @flow
import * as types from './action-types'
import * as resourcesApi from '../api/resources-api'
import { authTokenSelector } from '../selectors/auth-selectors'

type Action = {
  type: string,
  payload?: any,
}

export const resourcesError = (error: string): Action => ({
  type: types.RESOURCES_ERROR,
  payload: error,
})

export const getApplications = (applications: Object[]): Action => ({
  type: types.GET_APPLICATIONS,
  payload: applications,
})

export const getFirmwares = (firmwares: Object[]): Action => ({
  type: types.GET_FIRMWARES,
  payload: firmwares,
})

export const getDevices = (devices: Object[]): Action => ({
  type: types.GET_DEVICES,
  payload: devices,
})

export const getProviders = (providers: Object[]): Action => ({
  type: types.GET_PROVIDERS,
  payload: providers,
})

export const getPublishers = (publishers: Object[]): Action => ({
  type: types.GET_PUBLISHERS,
  payload: publishers,
})

export const getCategories = (categories: Object[]): Action => ({
  type: types.GET_CATEGORIES,
  payload: categories,
})

export const getMcu = (mcu: Object[]): Action => ({
  type: types.GET_MCU,
  payload: mcu,
})

export const typeDispatch = (type: string, resource: any): Action => {
  switch (type) {
    case 'applications':
      return getApplications(resource)
    case 'providers':
      return getProviders(resource)
    case 'publishers':
      return getPublishers(resource)
    case 'firmwares':
      return getFirmwares(resource)
    case 'devices':
      return getDevices(resource)
    case 'categories':
      return getCategories(resource)
    case 'mcu':
      return getMcu(resource)
    default:
      return { type: '' }
  }
}

export const fetchResource = (type: string): Function => async (
  dispatch: Function,
  getState: Function,
): Promise<void> => {
  try {
    const token = authTokenSelector(getState())
    const resource = await resourcesApi.getResource(token, type)
    dispatch(typeDispatch(type, resource))
  } catch (err) {
    dispatch(resourcesError(err.message ? err.message : err.error))
  }
}

export const fetchResources = (): Function => async (dispatch: Function): Promise<void> => {
  await Promise.all(
    ['firmwares', 'applications', 'devices', 'publishers', 'providers', 'categories', 'mcu'].map(
      type => dispatch(fetchResource(type)),
    ),
  )
}

export const createResourceAction = (): Action => ({ type: types.CREATE_RESOURCE })
export const createResourceSuccess = (type: string): Action => ({
  type: types.CREATE_RESOURCE_SUCCESS,
  payload: type,
})
export const createResourceVersionAction = (): Action => ({ type: types.CREATE_RESOURCE_VERSION })
export const createResourceVersionSuccess = (): Action => ({
  type: types.CREATE_RESOURCE_VERSION_SUCCESS,
})

/**
 * TODO
 * TEST THIS WHEN SHAPE OF RESPONSE IS KNOWN
 */

export const createResource = (type: string, fields: Object): Function => async (
  dispatch: Function,
  getState: Function,
): Promise<void> => {
  dispatch(createResourceAction())
  const token = authTokenSelector(getState())
  try {
    const res = await resourcesApi.createResource(token, type, fields)
    console.log(res)
    dispatch(createResourceSuccess(type))
  } catch (err) {
    dispatch(resourcesError(err.message ? err.message : err.error))
  }
}
