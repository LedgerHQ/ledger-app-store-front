// @flow
import * as types from './actionTypes'
// import u2f from 'u2f-api'

type Action = {
  type: string,
  payload?: any,
}

export const addU2FDevice = (): Action => ({ type: types.ADD_U2F_DEVICE })

export const u2fDeviceChallenge = (challenge: string): Action => ({
  type: types.U2F_DEVICE_CHALLENGE,
  payload: challenge,
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

export const registerU2FDevice = (): Function => async dispatch => {
  dispatch(addU2FDevice())

  // MOCK WORKFLOW
  // try {
  //   const response = await fetch('api/challenge')
  //   const { challenge } = await response.json()
  //   const result = await u2f.register({ challenge })
  // } catch (err) {
  //   dispatch(u2fDeviceChallengeError(err))
  // }
}
