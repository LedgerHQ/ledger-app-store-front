import * as types from '../../actions/action-types'
import * as actions from '../../actions/auth-actions'
import authReducer, { initialState } from '../auth'

describe('auth reducer', () => {
  test(`should reduce ${types.LOGIN_START}`, () => {
    const expected = { ...initialState, loading: true, username: 'username' }
    const newState = authReducer(initialState, actions.loginStart('username'))
    expect(newState).toEqual(expected)
  })

  test(`should reduce ${types.LOGIN_SUCCESS}`, () => {
    const expected = { ...initialState, success: true, token: 'token' }
    const newState = authReducer(initialState, actions.loginSuccess('token'))
    expect(newState).toEqual(expected)
  })

  test(`should reduce ${types.LOGIN_ERROR}`, () => {
    const expected = { ...initialState, success: false, loading: false, error: 'error' }
    const newState = authReducer(initialState, actions.loginError('error'))
    expect(newState).toEqual(expected)
  })

  test(`should reduce ${types.LOGIN_U2F}`, () => {
    const expected = { ...initialState, pending: true }
    const newState = authReducer(initialState, actions.loginU2F('challenge'))
    expect(newState).toEqual(expected)
  })

  test(`should reduce ${types.LOGIN_FINISH}`, () => {
    const expected = { ...initialState, pending: false, loading: false }
    const newState = authReducer(initialState, actions.loginFinish())
    expect(newState).toEqual(expected)
  })

  test(`should reduce ${types.LOGOUT}`, () => {
    const expected = { ...initialState }
    const loggedState = { ...initialState, token: 'token', success: true }
    const newState = authReducer(loggedState, actions.logout())
    expect(newState).toEqual(expected)
  })

  test('should return state if action is not handled', () => {
    const expected = { ...initialState }
    const newState = authReducer(undefined, { type: 'SOME_OTHER_ACTION' })
    expect(newState).toEqual(expected)
  })
})
