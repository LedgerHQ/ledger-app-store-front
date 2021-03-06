// @flow
import { createSelector } from 'reselect'

export const deviceSelector = (state: Object): Object => state.device

export const deviceSuccessSelector = createSelector(deviceSelector, device => device.deviceSuccess)

export const deviceErrorSelector = createSelector(deviceSelector, device => device.error)

export const deviceRegisterSuccessSelector = createSelector(
  deviceSelector,
  device => device.registerSuccess,
)

export const deviceAllSuccessSelector = createSelector(
  deviceSuccessSelector,
  deviceRegisterSuccessSelector,
  (deviceSuccess, registerSuccess) => deviceSuccess && registerSuccess,
)
