// @flow
import { createSelector } from 'reselect'
import { getVersions } from '../utils/array'

export const resourcesSelector = (state: Object): Object => state.resources || {}

export const resourcesApplicationsSelector = createSelector(
  resourcesSelector,
  resources => resources.applications || [],
)

export const resourcesApplicationVersionsSelector = createSelector(
  resourcesApplicationsSelector,
  applications => getVersions('application_versions', applications),
)

export const resourcesFirmwaresSelector = createSelector(
  resourcesSelector,
  resources => resources.firmwares || [],
)

export const resourcesFirmwareVersionsSelector = createSelector(
  resourcesFirmwaresSelector,
  firmwares => getVersions('se_firmware_versions', firmwares),
)

export const resourcesDevicesSelector = createSelector(
  resourcesSelector,
  resources => resources.devices || [],
)

export const resourcesDeviceVersionsSelector = createSelector(resourcesDevicesSelector, devices =>
  getVersions('device_versions', devices),
)

export const resourcesMcuSelector = createSelector(
  resourcesSelector,
  resources => resources.mcu || [],
)

export const resourcesMcuVersionsSelector = createSelector(resourcesMcuSelector, mcu =>
  getVersions('mcu_versions', mcu),
)

export const resourcesPublishersSelector = createSelector(
  resourcesSelector,
  resources => resources.publishers || [],
)

export const resourcesProvidersSelector = createSelector(
  resourcesSelector,
  resources => resources.providers || [],
)

export const resourcesCategoriesSelector = createSelector(
  resourcesSelector,
  resources => resources.categories || [],
)

export const resourcesErrorSelector = createSelector(
  resourcesSelector,
  resources => resources.error || '',
)

export const allResourcesSelector = createSelector(
  resourcesFirmwaresSelector,
  resourcesApplicationsSelector,
  resourcesDevicesSelector,
  resourcesPublishersSelector,
  resourcesProvidersSelector,
  resourcesCategoriesSelector,
  resourcesMcuSelector,
  (
    firmwares: Object[],
    applications: Object[],
    devices: Object[],
    publishers: Object[],
    providers: Object[],
    categories: Object[],
    mcu: Object[],
  ): Object => ({
    firmwares,
    applications,
    devices,
    publishers,
    providers,
    categories,
    mcu,
  }),
)
