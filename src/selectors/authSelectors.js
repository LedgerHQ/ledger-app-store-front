// @flow
import { createSelector } from 'reselect'

export const authSelector = (state: Object): Object => state.auth

export const authSuccessSelector = createSelector(authSelector, auth => auth.success)
