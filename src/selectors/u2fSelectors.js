// @flow
import { createSelector } from 'reselect'

export const u2fSelector = (state: Object): Object => state.u2f

export const u2fRequestedSelector = createSelector(u2fSelector, u2f => u2f.requested)

export const u2fDeviceSuccessSelector = createSelector(u2fSelector, u2f => u2f.deviceSuccess)

export const u2fServerSuccessSelector = createSelector(u2fSelector, u2f => u2f.serverSuccess)

export const u2fErrorSelector = createSelector(u2fSelector, u2f => u2f.error)

export const u2fAllSuccessSelector = createSelector(
  u2fDeviceSuccessSelector,
  u2fServerSuccessSelector,
  (deviceSuccess, serverSuccess) => deviceSuccess && serverSuccess,
)
