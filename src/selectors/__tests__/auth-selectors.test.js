import * as selectors from '../auth-selectors'

describe('auth selectors', () => {
  describe('authSelector', () => {
    test('should return auth object from state', () => {
      const state = { auth: { username: 'username' }, other: { other: 'other' } }
      const expected = selectors.authSelector(state)
      expect(expected).toEqual(state.auth)
    })

    test('should return undefined if auth object is not in state', () => {
      const state = { other: { other: 'other' } }
      const expected = selectors.authSelector(state)
      expect(expected).toEqual(state.auth)
    })
  })

  describe('authSuccessSelector', () => {
    test('should return auth.success from state', () => {
      const state = { auth: { success: true }, other: { other: 'other' } }
      const expected = selectors.authSuccessSelector(state)
      expect(expected).toEqual(state.auth.success)
    })

    test('should return undefined if auth.success is not in state', () => {
      const state = { auth: { username: 'username' }, other: { other: 'other' } }
      const expected = selectors.authSuccessSelector(state)
      expect(expected).toEqual(state.auth.success)
    })
  })

  describe('authErrorSelector', () => {
    test('should return auth.error from state', () => {
      const state = { auth: { error: 'some error' }, other: { other: 'other' } }
      const expected = selectors.authErrorSelector(state)
      expect(expected).toEqual(state.auth.error)
    })

    test('should return undefined if auth.error is not in state', () => {
      const state = { auth: { username: 'username' }, other: { other: 'other' } }
      const expected = selectors.authErrorSelector(state)
      expect(expected).toEqual(state.auth.error)
    })
  })

  describe('authTokenSelector', () => {
    test('should return auth.token from state', () => {
      const state = { auth: { token: 'some token' }, other: { other: 'other' } }
      const expected = selectors.authTokenSelector(state)
      expect(expected).toEqual(state.auth.token)
    })

    test('should return undefined if auth.token is not in state', () => {
      const state = { auth: { username: 'username' }, other: { other: 'other' } }
      const expected = selectors.authTokenSelector(state)
      expect(expected).toEqual(state.auth.token)
    })
  })

  describe('authPendingSelector', () => {
    test('should return auth.pending from state', () => {
      const state = { auth: { pending: false }, other: { other: 'other' } }
      const expected = selectors.authPendingSelector(state)
      expect(expected).toEqual(state.auth.pending)
    })

    test('should return undefined if auth.pending is not in state', () => {
      const state = { auth: { username: 'username' }, other: { other: 'other' } }
      const expected = selectors.authPendingSelector(state)
      expect(expected).toEqual(state.auth.pending)
    })
  })

  describe('authLoadingSelector', () => {
    test('should return auth.loading from state', () => {
      const state = { auth: { loading: true }, other: { other: 'other' } }
      const expected = selectors.authLoadingSelector(state)
      expect(expected).toEqual(state.auth.loading)
    })

    test('should return undefined if auth.loading is not in state', () => {
      const state = { auth: { username: 'username' }, other: { other: 'other' } }
      const expected = selectors.authLoadingSelector(state)
      expect(expected).toEqual(state.auth.loading)
    })
  })

  describe('authUsernameSelector', () => {
    test('should return auth.username from state', () => {
      const state = { auth: { username: 'username' }, other: { other: 'other' } }
      const expected = selectors.authUsernameSelector(state)
      expect(expected).toEqual(state.auth.username)
    })

    test('should return undefined if auth.username is not in state', () => {
      const state = { auth: { loading: true }, other: { other: 'other' } }
      const expected = selectors.authUsernameSelector(state)
      expect(expected).toEqual(state.auth.username)
    })
  })

  describe('isLoggedInSelector', () => {
    describe('should return true when', () => {
      test('success is true, there is a token, and not pending', () => {
        const state = { auth: { success: true, pending: false, token: 'token' } }
        const expected = selectors.isLoggedInSelector(state)
        expect(expected).toBe(true)
      })
    })

    describe('should return false when', () => {
      test('success is false', () => {
        const state = { auth: { success: false, pending: false, token: 'token' } }
        const expected = selectors.isLoggedInSelector(state)
        expect(expected).toBe(false)
      })

      test('there is no token', () => {
        const state = { auth: { success: true, pending: false, token: '' } }
        const expected = selectors.isLoggedInSelector(state)
        expect(expected).toBe(false)
      })

      test('pending is true', () => {
        const state = { auth: { success: true, pending: true, token: 'token' } }
        const expected = selectors.isLoggedInSelector(state)
        expect(expected).toBe(false)
      })
    })
  })
})
