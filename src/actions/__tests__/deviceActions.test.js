/* eslint import/no-named-as-default-member: 0 */
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import * as actions from '../deviceActions'
import * as types from '../actionTypes'
import * as deviceApi from '../../api/deviceApi'
import * as u2fApi from '../../api/u2fApi'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('device actions', () => {
  test('addU2FDevice should return the correct action', () => {
    const expected = { type: types.ADD_U2F_DEVICE }
    expect(actions.addU2FDevice()).toEqual(expected)
  })

  test('u2fDeviceChallenge should return the correct action', () => {
    const expected = { type: types.U2F_DEVICE_CHALLENGE }
    expect(actions.u2fDeviceChallenge()).toEqual(expected)
  })

  test('u2fDeviceChallengeSuccess should return the correct action', () => {
    const expected = { type: types.U2F_DEVICE_CHALLENGE_SUCCESS }
    expect(actions.u2fDeviceChallengeSuccess()).toEqual(expected)
  })

  test('u2fDeviceError should return the correct action', () => {
    const expected = { type: types.U2F_DEVICE_ERROR, payload: 'test error' }
    expect(actions.u2fDeviceError('test error')).toEqual(expected)
  })

  test('u2fDeviceRegister should return the correct action', () => {
    const expected = { type: types.U2F_DEVICE_REGISTER }
    expect(actions.u2fDeviceRegister()).toEqual(expected)
  })

  test('u2fDeviceRegisterSuccess should return the correct action', () => {
    const expected = { type: types.U2F_DEVICE_REGISTER_SUCCESS }
    expect(actions.u2fDeviceRegisterSuccess()).toEqual(expected)
  })

  describe('registerU2FDevice', () => {
    let store
    beforeEach(() => {
      store = mockStore({
        auth: {
          token: 'token',
        },
      })

      deviceApi.getChallenge = jest.fn()
      deviceApi.verifyChallenge = jest.fn()
      u2fApi.register = jest.fn()
    })

    test('it should dispatch the correct actions on success', async done => {
      deviceApi.getChallenge.mockResolvedValue({ challenge: 'challenge' })
      deviceApi.verifyChallenge.mockResolvedValue({ resp: 'success' })
      u2fApi.register.mockResolvedValue({ challenge: 'challenge' })

      const expected = [
        actions.addU2FDevice(),
        actions.u2fDeviceChallenge(),
        actions.u2fDeviceChallengeSuccess(),
        actions.u2fDeviceRegisterSuccess(),
      ]

      await store.dispatch(actions.registerU2FDevice())
      const dispatched = store.getActions()
      expect(dispatched).toEqual(expected)
      done()
    })

    describe('with errors on', () => {
      test('[getChallenge]: should dispatch the correct actions', async done => {
        deviceApi.getChallenge.mockRejectedValue({ message: 'error' })

        const expected = [actions.addU2FDevice(), actions.u2fDeviceError('error')]

        await store.dispatch(actions.registerU2FDevice())
        const dispatched = store.getActions()
        expect(dispatched).toEqual(expected)
        done()
      })

      test('[register]: should dispatch the correct actions', async done => {
        deviceApi.getChallenge.mockResolvedValue({ challenge: 'challenge' })
        u2fApi.register.mockRejectedValue(new Error('error'))

        const expected = [
          actions.addU2FDevice(),
          actions.u2fDeviceChallenge(),
          actions.u2fDeviceError('error'),
        ]

        await store.dispatch(actions.registerU2FDevice())
        const dispatched = store.getActions()
        expect(dispatched).toEqual(expected)
        done()
      })

      test('[verifyChallenge]: should dispatch the correct actions', async done => {
        deviceApi.getChallenge.mockResolvedValue({ challenge: 'challenge' })
        deviceApi.verifyChallenge.mockRejectedValue({ message: 'server register error' })
        u2fApi.register.mockResolvedValue({ challenge: 'challenge' })

        const expected = [
          actions.addU2FDevice(),
          actions.u2fDeviceChallenge(),
          actions.u2fDeviceChallengeSuccess(),
          actions.u2fDeviceError('server register error'),
        ]

        await store.dispatch(actions.registerU2FDevice())
        const dispatched = store.getActions()
        expect(dispatched).toEqual(expected)
        done()
      })
    })
  })
})
