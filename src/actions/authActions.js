// @flow
import * as types from './actionTypes'
import * as authApi from '../api/authApi'

type Action = {
  type: string,
  payload?: any,
}

export const loginStart = (username: string): Action => ({
  type: types.LOGIN_START,
  payload: username,
})

export const loginSuccess = (token: string): Action => ({
  type: types.LOGIN_SUCCESS,
  payload: token,
})

export const loginError = (error: string): Action => ({
  type: types.LOGIN_ERROR,
  payload: error,
})

export const loginU2F = (challenge: Object): Action => ({
  type: types.LOGIN_U2F,
  payload: challenge,
})

/**
 * @name login
 * @description action thunk that takes care of all the login workflow
 * @param {string} username user's nickname
 * @param {string} password user's password
 */
export const login = (username: string, password: string): Function => async (
  dispatch: Function,
): Promise<void> => {
  dispatch(loginStart(username))

  try {
    const response = await authApi.login(username, password)
    const json = await response.json()

    if (response.ok) {
      if (json.token) {
        dispatch(loginSuccess(json.token))
      } else if (json.challenge) {
        dispatch(loginU2F(json.challenge))
      }
    } else {
      dispatch(loginError(json.error))
    }
  } catch (err) {
    dispatch(loginError(err))
  }

  // if (json.success) {
  //   if (json.challengeRequested) {
  //     dispatch(loginPending(true))
  //     dispatch(loginSuccess())
  //     // dispatch(u2fAuth(json.challenge))
  //   } else {
  //     dispatch(loginSuccess())
  //   }
  // } else {
  //   dispatch(loginError(json.error))
  // }
  // } catch (error) {
  //   dispatch(loginError(error.error))
  // }
}
