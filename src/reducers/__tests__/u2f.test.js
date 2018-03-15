import * as types from '../../actions/actionTypes'
import * as actions from '../../actions/u2fActions'
import u2fReducer, { initialState } from '../u2f'

describe('u2f reducer', () => {
  test(`should reduce ${types.U2F_REQUESTED}`, () => {
    const expected = { ...initialState, requested: true }
    const newState = u2fReducer(initialState, actions.u2fRequested())
    expect(newState).toEqual(expected)
  })

  test(`should reduce ${types.U2F_DEVICE_SUCCESS}`, () => {
    const expected = { ...initialState, deviceSuccess: true }
    const newState = u2fReducer(initialState, actions.u2fDeviceSuccess())
    expect(newState).toEqual(expected)
  })

  test(`should reduce ${types.U2F_ERROR}`, () => {
    const expected = { ...initialState, error: 'error' }
    const newState = u2fReducer(initialState, actions.u2fError('error'))
    expect(newState).toEqual(expected)
  })

  test(`should reduce ${types.U2F_SERVER_SUCCESS}`, () => {
    const expected = { ...initialState, serverSuccess: true }
    const newState = u2fReducer(initialState, actions.u2fServerSuccess())
    expect(newState).toEqual(expected)
  })

  test(`should reduce ${types.U2F_SEND_CHALLENGE}`, () => {
    const expected = { ...initialState }
    const newState = u2fReducer(initialState, actions.u2fSendChallenge())
    expect(newState).toEqual(expected)
  })

  test('should return state if action is not handled', () => {
    const expected = { ...initialState }
    const newState = u2fReducer(undefined, { type: 'SOME_OTHER_ACTION' })
    expect(newState).toEqual(expected)
  })
})
