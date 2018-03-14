// @flow
import * as u2fApi from '../api/u2fApi'
import * as types from './actionTypes'
import * as deviceApi from '../api/deviceApi'
import { authTokenSelector } from '../selectors/authSelectors'

type Action = {
  type: string,
  payload?: any,
}

export const addU2FDevice = (): Action => ({ type: types.ADD_U2F_DEVICE })

export const u2fDeviceChallenge = (): Action => ({
  type: types.U2F_DEVICE_CHALLENGE,
})

export const u2fDeviceChallengeSuccess = (): Action => ({
  type: types.U2F_DEVICE_CHALLENGE_SUCCESS,
})

export const u2fDeviceError = (error: string): Action => ({
  type: types.U2F_DEVICE_ERROR,
  payload: error,
})

export const u2fDeviceRegister = (): Action => ({ type: types.U2F_DEVICE_REGISTER })

export const u2fDeviceRegisterSuccess = (): Action => ({
  type: types.U2F_DEVICE_REGISTER_SUCCESS,
})

export const registerU2FDevice = (): Function => async (
  dispatch: Function,
  getState: Function,
): Promise<void> => {
  const token = authTokenSelector(getState())
  dispatch(addU2FDevice())

  try {
    const challenge = await deviceApi.getChallenge(token)
    dispatch(u2fDeviceChallenge())

    const deviceChallenge = await u2fApi.register(challenge)
    dispatch(u2fDeviceChallengeSuccess())

    const sentChallengeJson = await deviceApi.verifyChallenge(token, deviceChallenge)

    if (sentChallengeJson.resp === 'success') {
      dispatch(u2fDeviceRegisterSuccess())
    } else {
      dispatch(u2fDeviceError('server register error'))
    }
  } catch (err) {
    dispatch(u2fDeviceError(err.message ? err.message : err.error))
  }
}
