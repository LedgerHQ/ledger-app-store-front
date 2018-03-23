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

export const selectApplication = (application: string): Action => ({
  type: types.SELECT_APPLICATION,
  payload: application,
})

export const getApplicationsList = (): Action => ({ type: types.GET_APPLICATIONS_LIST })

export const getFirmwareVersions = (firmwares: Object[]): Action => ({
  type: types.GET_FIRMWARE_VERSIONS,
  payload: firmwares,
})

export const fetchApplications = (): Function => async (
  dispatch: Function,
  getState: Function,
): Promise<void> => {
  const token = authTokenSelector(getState())
  try {
    const applications = await resourcesApi.getApplications(token)
    dispatch(getApplications(applications))
  } catch (err) {
    dispatch(resourcesError(err.message ? err.message : err.error))
  }
}

export const fetchFirmwares = (): Function => async (
  dispatch: Function,
  getState: Function,
): Promise<void> => {
  const token = authTokenSelector(getState())
  try {
    const firmwares = await resourcesApi.getFirmwares(token)
    dispatch(getFirmwareVersions(firmwares))
  } catch (err) {
    dispatch(resourcesError(err.message ? err.message : err.error))
  }
}

export const fetchResources = (): Function => async (dispatch: Function): Promise<void> => {
  await Promise.all([dispatch(fetchApplications()), dispatch(fetchFirmwares())])
}
