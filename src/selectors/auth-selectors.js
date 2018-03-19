// @flow
import { createSelector } from 'reselect'

export const authSelector = (state: Object): Object => state.auth

export const authSuccessSelector = createSelector(authSelector, auth => auth.success)

export const authErrorSelector = createSelector(authSelector, auth => auth.error)

export const authTokenSelector = createSelector(authSelector, auth => auth.token)

export const authPendingSelector = createSelector(authSelector, auth => auth.pending)

export const authLoadingSelector = createSelector(authSelector, auth => auth.loading)

export const authUsernameSelector = createSelector(authSelector, auth => auth.username)

export const isLoggedInSelector = createSelector(
  authSuccessSelector,
  authPendingSelector,
  authTokenSelector,
  (success: boolean, pending: boolean, token: string): boolean => success && !pending && !!token,
)
