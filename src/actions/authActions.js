// @flow
import * as types from './actionTypes'
import sleep from '../utils/sleep'

type Action = {
  type: string,
  payload?: any,
}

export const loginStart = (email: string): Action => ({
  type: types.LOGIN_START,
  payload: email,
})

export const loginSuccess = (): Action => ({
  type: types.LOGIN_SUCCESS,
})

export const loginError = (error: string): Action => ({
  type: types.LOGIN_ERROR,
  payload: error,
})

export const loginPending = (pending: boolean): Action => ({
  type: types.LOGIN_PENDING,
  payload: pending,
})

/**
 * @name login
 * @description login thunk that takes care of all the login workflow
 * @param {string} email user's email
 * @param {string} password user's password
 */
export const login = (email: string, password: string): Function => async (
  dispatch: Function,
): Promise<void> => {
  dispatch(loginStart(email))
  console.log(email, password)

  // CALL API WITH EMAIL AND PASSWORD
  // try {
  //   const res = await fetch('apiRpoute', {
  //     body: JSON.stringify({
  //       email,
  //       password,
  //     }),
  //   })
  //   const json = await res.json()
  const json = {
    success: true,
    challengeRequested: false,
    challenge: 'some challenge',
  }
  await sleep()
  if (json.success) {
    if (json.challengeRequested) {
      dispatch(loginPending(true))
      dispatch(loginSuccess())
      // dispatch(u2fAuth(json.challenge))
    } else {
      dispatch(loginSuccess())
    }
  } else {
    dispatch(loginError(json.error))
  }
  // } catch (error) {
  //   dispatch(loginError(error.error))
  // }
}
