import * as selectors from '../u2f-selectors'

describe('u2f selectors', () => {
  describe('u2fSelector', () => {
    test('should return u2f object from state', () => {
      const state = { u2f: { error: '' }, other: { other: 'other' } }
      const expected = selectors.u2fSelector(state)
      expect(expected).toEqual(state.u2f)
    })

    test('should return undefined is u2f object is not in state', () => {
      const state = { other: { other: 'other' } }
      const expected = selectors.u2fSelector(state)
      expect(expected).toEqual(state.u2f)
    })
  })

  describe('u2fRequestedSelector', () => {
    test('should return u2f.requested from state', () => {
      const state = { u2f: { requested: true }, other: { other: 'other' } }
      const expected = selectors.u2fRequestedSelector(state)
      expect(expected).toEqual(state.u2f.requested)
    })

    test('should return undefined if u2f.requested is not in state', () => {
      const state = { u2f: { other: 'other' }, other: { other: 'other' } }
      const expected = selectors.u2fRequestedSelector(state)
      expect(expected).toEqual(state.u2f.requested)
    })
  })

  describe('u2fDeviceSuccessSelector', () => {
    test('should return u2f.deviceSuccess from state', () => {
      const state = { u2f: { deviceSuccess: true }, other: { other: 'other' } }
      const expected = selectors.u2fDeviceSuccessSelector(state)
      expect(expected).toEqual(state.u2f.deviceSuccess)
    })

    test('should return undefined if u2f.deviceSuccess is not in state', () => {
      const state = { u2f: { username: 'username' }, other: { other: 'other' } }
      const expected = selectors.u2fDeviceSuccessSelector(state)
      expect(expected).toEqual(state.u2f.deviceSuccess)
    })
  })

  describe('u2fServerSuccessSelector', () => {
    test('should return u2f.serverSuccess from state', () => {
      const state = { u2f: { serverSuccess: true }, other: { other: 'other' } }
      const expected = selectors.u2fServerSuccessSelector(state)
      expect(expected).toEqual(state.u2f.serverSuccess)
    })

    test('should return undefined if u2f.serverSuccess is not in state', () => {
      const state = { u2f: { username: 'username' }, other: { other: 'other' } }
      const expected = selectors.u2fServerSuccessSelector(state)
      expect(expected).toEqual(state.u2f.serverSuccess)
    })
  })

  describe('u2fErrorSelector', () => {
    test('should return u2f.error from state', () => {
      const state = { u2f: { error: 'some error' }, other: { other: 'other' } }
      const expected = selectors.u2fErrorSelector(state)
      expect(expected).toEqual(state.u2f.error)
    })

    test('should return undefined if u2f.error is not in state', () => {
      const state = { u2f: { username: 'username' }, other: { other: 'other' } }
      const expected = selectors.u2fErrorSelector(state)
      expect(expected).toEqual(state.u2f.error)
    })
  })

  describe('u2fAllSuccessSelector', () => {
    describe('should return true when', () => {
      test('deviceSuccess and registerSuccess are true', () => {
        const state = { u2f: { serverSuccess: true, deviceSuccess: true } }
        const expected = selectors.u2fAllSuccessSelector(state)
        expect(expected).toBe(true)
      })
    })

    describe('should return false when', () => {
      test('deviceSuccess is false', () => {
        const state = { u2f: { serverSuccess: true, deviceSuccess: false } }
        const expected = selectors.u2fAllSuccessSelector(state)
        expect(expected).toBe(false)
      })

      test('registerSuccess is false', () => {
        const state = { u2f: { serverSuccess: false, deviceSuccess: true } }
        const expected = selectors.u2fAllSuccessSelector(state)
        expect(expected).toBe(false)
      })
    })
  })
})
