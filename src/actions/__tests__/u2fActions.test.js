/* eslint import/no-named-as-default-member: 0 */
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import * as actions from '../u2fActions'
import * as types from '../actionTypes'
import * as deviceApi from '../../api/deviceApi'
import * as u2fApi from '../../api/u2fApi'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('u2f actions', () => {
  test('u2fRequested should return the correct action', () => {
    const expected = { type: types.U2F_REQUESTED }
    expect(actions.u2fRequested()).toEqual(expected)
  })

  test('u2fDeviceSuccess should return the correct action', () => {
    const expected = { type: types.U2F_DEVICE_SUCCESS }
    expect(actions.u2fDeviceSuccess()).toEqual(expected)
  })

  test('u2fError should return the correct action', () => {
    const expected = { type: types.U2F_ERROR, payload: 'error' }
    expect(actions.u2fError('error')).toEqual(expected)
  })

  test('u2fSendChallenge should return the correct action', () => {
    const expected = { type: types.U2F_SEND_CHALLENGE }
    expect(actions.u2fSendChallenge()).toEqual(expected)
  })

  test('u2fServerSuccess should return the correct action', () => {
    const expected = { type: types.U2F_SERVER_SUCCESS, payload: 'token' }
    expect(actions.u2fServerSuccess('token')).toEqual(expected)
  })

  describe('u2fAuth', () => {
    let store

    beforeEach(() => {
      store = mockStore({
        auth: {
          token: 'token',
          username: 'valpinkman',
        },
      })
      u2fApi.sign = jest.fn()
      deviceApi.finishLogin = jest.fn()
    })

    test('on success, should dispatch the correct actions', async done => {
      u2fApi.sign.mockResolvedValue({ challenge: 'deviceChallenge' })
      deviceApi.finishLogin.mockResolvedValue({ token: 'token' })

      const expected = [
        actions.u2fRequested(),
        actions.u2fDeviceSuccess(),
        actions.u2fSendChallenge(),
        actions.u2fServerSuccess('token'),
      ]

      await store.dispatch(actions.u2fAuth('challenge'))
      const dispatched = store.getActions()
      expect(dispatched).toEqual(expected)
      done()
    })

    describe('with errors on', () => {
      test('[sign]: should dispatch the correct actions', async done => {
        u2fApi.sign.mockRejectedValue(new Error('error'))

        const expected = [actions.u2fRequested(), actions.u2fError('error')]

        await store.dispatch(actions.u2fAuth('challenge'))
        const dispatched = store.getActions()
        expect(dispatched).toEqual(expected)
        done()
      })

      test('[finishLogin]: should dispatch the correct actions', async done => {
        u2fApi.sign.mockResolvedValue({ challenge: 'deviceChallenge' })
        deviceApi.finishLogin.mockRejectedValue(new Error('error'))

        const expected = [
          actions.u2fRequested(),
          actions.u2fDeviceSuccess(),
          actions.u2fSendChallenge(),
          actions.u2fError('error'),
        ]

        await store.dispatch(actions.u2fAuth('challenge'))
        const dispatched = store.getActions()
        expect(dispatched).toEqual(expected)
        done()
      })
    })
  })
})
