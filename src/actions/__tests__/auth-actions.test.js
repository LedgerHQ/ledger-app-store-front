/* eslint import/no-named-as-default-member: 0 */
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import * as actions from '../auth-actions'
import * as types from '../action-types'
import * as authApi from '../../api/auth-api'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('auth actions', () => {
  test('loginStart should return the correct action', () => {
    const expected = { type: types.LOGIN_START, payload: 'username' }
    expect(actions.loginStart('username')).toEqual(expected)
  })

  test('loginSuccess should return the correct action', () => {
    const expected = { type: types.LOGIN_SUCCESS, payload: 'token' }
    expect(actions.loginSuccess('token')).toEqual(expected)
  })

  test('loginError should return the correct action', () => {
    const expected = { type: types.LOGIN_ERROR, payload: 'error' }
    expect(actions.loginError('error')).toEqual(expected)
  })

  test('loginU2F should return the correct action', () => {
    const expected = { type: types.LOGIN_U2F, payload: 'challenge' }
    expect(actions.loginU2F('challenge')).toEqual(expected)
  })

  test('loginFinish should return the correct action', () => {
    const expected = { type: types.LOGIN_FINISH }
    expect(actions.loginFinish()).toEqual(expected)
  })

  describe('login', () => {
    let store

    beforeEach(() => {
      store = mockStore({})
      authApi.login = jest.fn()
    })

    describe('when no device is registered', () => {
      test('on success, should dispatch the correct actions', async done => {
        authApi.login.mockResolvedValue({ token: 'token' })

        const expected = [
          actions.loginStart('username', 'password'),
          actions.loginSuccess('token'),
          actions.loginFinish(),
        ]

        await store.dispatch(actions.login('username', 'password'))
        const dispatched = store.getActions()
        expect(dispatched).toEqual(expected)
        done()
      })

      test('on error, should dispatch the correct actions', async done => {
        authApi.login.mockRejectedValue({ error: 'error' })

        const expected = [
          actions.loginStart('username', 'password'),
          actions.loginError('error'),
          actions.loginFinish(),
        ]

        await store.dispatch(actions.login('username', 'password'))
        const dispatched = store.getActions()
        expect(dispatched).toEqual(expected)
        done()
      })

      test('when no token or challenge is returned, should dispatch the correct actions', async done => {
        authApi.login.mockResolvedValue({})

        const expected = [
          actions.loginStart('username', 'password'),
          actions.loginError('error when logging in'),
          actions.loginFinish(),
        ]

        await store.dispatch(actions.login('username', 'password'))
        const dispatched = store.getActions()
        expect(dispatched).toEqual(expected)
        done()
      })
    })

    describe('with u2f device registered', () => {
      test('on success, should call loginU2F', async done => {
        authApi.login.mockResolvedValue({ challenge: 'challenge' })

        const expected = [
          actions.loginStart('username', 'password'),
          actions.loginU2F({ challenge: 'challenge' }),
        ]

        await store.dispatch(actions.login('username', 'password'))
        const dispatched = store.getActions()
        expect(dispatched).toEqual(expected)
        done()
      })
    })
  })
})
