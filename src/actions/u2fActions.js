// @flow
import * as u2f from '../api/u2f'
import * as deviceApi from '../api/deviceApi'
import * as types from './actionTypes'
import { authTokenSelector, authUsernameSelector } from '../selectors/authSelectors'

type Action = {
  type: string,
  payload?: any,
}

export const u2fRequested = (): Action => ({ type: types.U2F_REQUESTED })

export const u2fDeviceSuccess = (): Action => ({
  type: types.U2F_DEVICE_SUCCESS,
})

export const u2fDeviceError = (error: string): Action => ({
  type: types.U2F_DEVICE_ERROR,
  payload: error,
})

export const u2fSendChallenge = (): Action => ({
  type: types.U2F_SEND_CHALLENGE,
})

export const u2fServerSuccess = (token: string): Action => ({
  type: types.U2F_SERVER_SUCCESS,
  payload: token,
})

export const u2fServerError = (error: string): Action => ({
  type: types.U2F_SERVER_ERROR,
  payload: error,
})

export const u2fAuth = (challenge: Object): Function => async (
  dispatch: Function,
  getState: Function,
): Promise<void> => {
  dispatch(u2fRequested())
  const state = getState()
  const token = authTokenSelector(state)
  const username = authUsernameSelector(state)
  const deviceResponse = await u2f.sign(challenge)

  if (deviceResponse.errorCode && deviceResponse.errorCode > 0) {
    dispatch(u2fDeviceError(deviceResponse.message))
  } else {
    dispatch(u2fDeviceSuccess())
    dispatch(u2fSendChallenge())
    try {
      const serverReponse = await deviceApi.finishLogin(token, deviceResponse, username)
      const json = await serverReponse.json()
      if (json.token) {
        dispatch(u2fServerSuccess(json.token))
      } else {
        dispatch(u2fServerError(json.message))
      }
    } catch (err) {
      dispatch(u2fServerError(err))
    }
  }
}
