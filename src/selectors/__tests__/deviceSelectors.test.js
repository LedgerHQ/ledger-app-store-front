import * as selectors from '../deviceSelectors'

describe('device selectors', () => {
  describe('deviceSelector', () => {
    test('should return device object from state', () => {
      const state = { device: { error: '' }, other: { other: 'other' } }
      const expected = selectors.deviceSelector(state)
      expect(expected).toEqual(state.device)
    })

    test('should return undefined is device object is not in state', () => {
      const state = { other: { other: 'other' } }
      const expected = selectors.deviceSelector(state)
      expect(expected).toEqual(state.device)
    })
  })

  describe('deviceSuccessSelector', () => {
    test('should return device.deviceSuccess from state', () => {
      const state = { device: { deviceSuccess: true }, other: { other: 'other' } }
      const expected = selectors.deviceSuccessSelector(state)
      expect(expected).toEqual(state.device.deviceSuccess)
    })

    test('should return undefined if device.deviceSuccess is not in state', () => {
      const state = { device: { other: 'other' }, other: { other: 'other' } }
      const expected = selectors.deviceSuccessSelector(state)
      expect(expected).toEqual(state.device.deviceSuccess)
    })
  })

  describe('deviceErrorSelector', () => {
    test('should return device.error from state', () => {
      const state = { device: { error: 'some error' }, other: { other: 'other' } }
      const expected = selectors.deviceErrorSelector(state)
      expect(expected).toEqual(state.device.error)
    })

    test('should return undefined if device.error is not in state', () => {
      const state = { device: { username: 'username' }, other: { other: 'other' } }
      const expected = selectors.deviceErrorSelector(state)
      expect(expected).toEqual(state.device.error)
    })
  })

  describe('deviceRegisterSuccessSelector', () => {
    test('should return device.registerSuccess from state', () => {
      const state = { device: { registerSuccess: true }, other: { other: 'other' } }
      const expected = selectors.deviceRegisterSuccessSelector(state)
      expect(expected).toEqual(state.device.registerSuccess)
    })

    test('should return undefined if device.registerSuccess is not in state', () => {
      const state = { device: { username: 'username' }, other: { other: 'other' } }
      const expected = selectors.deviceRegisterSuccessSelector(state)
      expect(expected).toEqual(state.device.registerSuccess)
    })
  })

  describe('deviceAllSuccessSelector', () => {
    describe('should return true when', () => {
      test('deviceSuccess and registerSuccess are true', () => {
        const state = { device: { registerSuccess: true, deviceSuccess: true } }
        const expected = selectors.deviceAllSuccessSelector(state)
        expect(expected).toBe(true)
      })
    })

    describe('should return false when', () => {
      test('deviceSuccess is false', () => {
        const state = { device: { registerSuccess: true, deviceSuccess: false } }
        const expected = selectors.deviceAllSuccessSelector(state)
        expect(expected).toBe(false)
      })

      test('registerSuccess is false', () => {
        const state = { device: { registerSuccess: false, deviceSuccess: true } }
        const expected = selectors.deviceAllSuccessSelector(state)
        expect(expected).toBe(false)
      })
    })
  })
})
