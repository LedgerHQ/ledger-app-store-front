// @flow
import * as u2f from '../api/u2f'
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

export const u2fDeviceChallengeError = (error: string): Action => ({
  type: types.U2F_DEVICE_CHALLENGE_SUCCESS,
  payload: error,
})

export const u2fDeviceRegister = (): Action => ({ type: types.U2F_DEVICE_REGISTER })

export const u2fDeviceRegisterSuccess = (): Action => ({
  type: types.U2F_DEVICE_REGISTER_SUCCESS,
})

export const u2fDeviceRegisterError = (error: string): Action => ({
  type: types.U2F_DEVICE_REGISTER_ERROR,
  payload: error,
})

export const registerU2FDevice = (): Function => async (
  dispatch: Function,
  getState: Function,
): Promise<void> => {
  const token = authTokenSelector(getState())
  dispatch(addU2FDevice())

  const response = await deviceApi.getChallenge(token)
  const challenge = await response.json()

  dispatch(u2fDeviceChallenge())
  const deviceChallenge = await u2f.register(challenge)

  if (deviceChallenge.errorCode && deviceChallenge.errorCode > 0) {
    dispatch(u2fDeviceChallengeError(deviceChallenge.message))
  } else {
    dispatch(u2fDeviceChallengeSuccess())
    const sentChallenge = await deviceApi.verifyChallenge(token, deviceChallenge)
    const sentChallengeJson = await sentChallenge.json()

    if (sentChallenge.ok && sentChallengeJson.resp === 'success') {
      dispatch(u2fDeviceRegisterSuccess())
    } else {
      dispatch(u2fDeviceRegisterError('server register error'))
    }
  }
}
