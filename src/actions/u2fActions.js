// @flow
import fetch from 'unfetch'

import * as types from './actionTypes'

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

export const u2fServerSuccess = (): Action => ({
  type: types.U2F_SERVER_SUCCESS,
})

export const u2fServerError = (): Action => ({
  type: types.U2F_SERVER_ERROR,
})

export const u2fAuth = (): Function => async (dispatch: Function): Promise<void> => {
  dispatch(u2fRequested())
  fetch()
}
