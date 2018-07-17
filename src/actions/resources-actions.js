// @flow
import * as types from './action-types'
import * as resourcesApi from '../api/resources-api'
import { authTokenSelector } from '../selectors/auth-selectors'
import { getErrorFromJson } from '../utils/errors'

type Action = {
  type: string,
  payload?: any,
}

export const resourcesError = (error: string, status?: number): Action => ({
  type: types.RESOURCES_ERROR,
  payload: error,
  status,
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

export const getIcons = (icons: Object[]): Action => ({
  type: types.GET_ICONS,
  payload: icons,
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
    case 'icons':
      return getIcons(resource)
    default:
      return { type: 'UNKNOWN_TYPE' }
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
    const error = getErrorFromJson(err)
    dispatch(resourcesError(error, err.status))
  }
}

export const fetchResources = (): Function => async (dispatch: Function): Promise<void> => {
  await Promise.all(
    [
      'firmwares',
      'applications',
      'devices',
      'publishers',
      'providers',
      'categories',
      'mcu',
      'icons',
    ].map(type => dispatch(fetchResource(type))),
  )
}

export const createResourceSuccess = (type: string): Action => ({
  type: types.CREATE_RESOURCE_SUCCESS,
  payload: type,
})
export const createResourceAction = (type: string): Action => ({
  type: types.CREATE_RESOURCE,
  payload: type,
})

export const deleteResourceSuccess = (type: string): Action => ({
  type: types.DELETE_RESOURCE_SUCCESS,
  payload: type,
})
export const deleteResourceAction = (type: string): Action => ({
  type: types.DELETE_RESOURCE,
  payload: type,
})

export const updateResourceSuccess = (type: string): Action => ({
  type: types.UPDATE_RESOURCE_SUCCESS,
  payload: type,
})
export const updateResourceAction = (type: string): Action => ({
  type: types.UPDATE_RESOURCE,
  payload: type,
})

export const createResource = (
  type: string,
  fields: Object,
  method: string = 'POST',
): Function => async (dispatch: Function, getState: Function): Promise<void> => {
  dispatch(createResourceAction(type))
  const token = authTokenSelector(getState())
  try {
    await resourcesApi.createResource(token, type, fields, method)
    dispatch(createResourceSuccess(type))
  } catch (err) {
    const error = getErrorFromJson(err)
    dispatch(resourcesError(error, err.status))
  }
}

export const updateResource = (
  type: string,
  fields: Object,
  method: string = 'PUT',
): Function => async (dispatch: Function, getState: Function): Promise<void> => {
  dispatch(updateResourceAction(type))
  const token = authTokenSelector(getState())
  try {
    await resourcesApi.updateResource(token, type, fields, method)
    dispatch(updateResourceSuccess(type))
  } catch (err) {
    const error = getErrorFromJson(err)
    dispatch(resourcesError(error, err.status))
  }
}

export const deleteResource = (type: string, pk: string): Function => async (
  dispatch: Function,
  getState: Function,
): Promise<void> => {
  dispatch(deleteResourceAction(type))
  const token = authTokenSelector(getState())
  try {
    await resourcesApi.deleteResource(token, type, pk)
    dispatch(deleteResourceSuccess(type))
  } catch (err) {
    const error = getErrorFromJson(err)
    dispatch(resourcesError(error, err.status))
  }
}
