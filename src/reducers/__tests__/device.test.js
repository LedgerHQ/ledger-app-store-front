import * as types from '../../actions/action-types'
import * as actions from '../../actions/device-actions'
import deviceReducer, { initialState } from '../device'

describe('device reducer', () => {
  test(`should reduce ${types.ADD_U2F_DEVICE}`, () => {
    const expected = { ...initialState, pending: true }
    const newState = deviceReducer(initialState, actions.addU2FDevice())
    expect(newState).toEqual(expected)
  })

  test(`should reduce ${types.U2F_DEVICE_CHALLENGE}`, () => {
    const expected = { ...initialState }
    const newState = deviceReducer(initialState, actions.u2fDeviceChallenge())
    expect(newState).toEqual(expected)
  })

  test(`should reduce ${types.U2F_DEVICE_CHALLENGE_SUCCESS}`, () => {
    const expected = { ...initialState, deviceSuccess: true }
    const newState = deviceReducer(initialState, actions.u2fDeviceChallengeSuccess())
    expect(newState).toEqual(expected)
  })

  test(`should reduce ${types.U2F_DEVICE_REGISTER}`, () => {
    const expected = { ...initialState }
    const newState = deviceReducer(initialState, actions.u2fDeviceRegister())
    expect(newState).toEqual(expected)
  })

  test(`should reduce ${types.U2F_DEVICE_REGISTER_SUCCESS}`, () => {
    const expected = { ...initialState, pending: false, registerSuccess: true }
    const newState = deviceReducer(initialState, actions.u2fDeviceRegisterSuccess())
    expect(newState).toEqual(expected)
  })

  test(`should reduce ${types.U2F_DEVICE_ERROR}`, () => {
    const expected = { ...initialState, pending: false, error: 'error' }
    const newState = deviceReducer(initialState, actions.u2fDeviceError('error'))
    expect(newState).toEqual(expected)
  })

  test('should return state if action is not handled', () => {
    const expected = { ...initialState }
    const newState = deviceReducer(undefined, { type: 'SOME_OTHER_ACTION' })
    expect(newState).toEqual(expected)
  })
})
