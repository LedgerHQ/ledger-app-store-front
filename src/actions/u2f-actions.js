// @flow
import * as u2fApi from '../api/u2f-api'
import * as authApi from '../api/auth-api'
import * as types from './action-types'
import { authTokenSelector, authUsernameSelector } from '../selectors/auth-selectors'

type Action = {
  type: string,
  payload?: any,
}

export const u2fRequested = (): Action => ({ type: types.U2F_REQUESTED })

export const u2fDeviceSuccess = (): Action => ({
  type: types.U2F_DEVICE_SUCCESS,
})

export const u2fError = (error: string, status?: number): Action => ({
  type: types.U2F_ERROR,
  payload: error,
  status,
})

export const u2fSendChallenge = (): Action => ({
  type: types.U2F_SEND_CHALLENGE,
})

export const u2fServerSuccess = (token: string): Action => ({
  type: types.U2F_SERVER_SUCCESS,
  payload: token,
})

export const u2fAuth = (challenge: Object): Function => async (
  dispatch: Function,
  getState: Function,
): Promise<void> => {
  dispatch(u2fRequested())
  const state = getState()
  const token = authTokenSelector(state)
  const username = authUsernameSelector(state)

  try {
    const deviceResponse = await u2fApi.sign(challenge)
    dispatch(u2fDeviceSuccess())
    dispatch(u2fSendChallenge())

    const json = await authApi.finishLogin(token, deviceResponse, username)
    dispatch(u2fServerSuccess(json.token))
  } catch (err) {
    dispatch(u2fError(err.message ? err.message : err.error))
  }
}
