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

export const resourcesFinalFirmwareVersionsSelector = createSelector(
  resourcesFirmwaresSelector,
  firmwares => getVersions('se_firmware_final_versions', firmwares),
)

export const resourcesOSUFirmwareVersionsSelector = createSelector(
  resourcesFinalFirmwareVersionsSelector,
  finalFirmwares => getVersions('osu_versions', finalFirmwares),
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

export const resourcesSuccessSelector = createSelector(
  resourcesSelector,
  resources => resources.success || false,
)

export const resourcesTypeSelector = createSelector(
  resourcesSelector,
  resources => resources.type || '',
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

export const allResourcesAndVersionsSelector = createSelector(
  resourcesFirmwaresSelector,
  resourcesFinalFirmwareVersionsSelector,
  resourcesOSUFirmwareVersionsSelector,
  resourcesApplicationsSelector,
  resourcesApplicationVersionsSelector,
  resourcesDevicesSelector,
  resourcesDeviceVersionsSelector,
  resourcesPublishersSelector,
  resourcesProvidersSelector,
  resourcesCategoriesSelector,
  resourcesMcuSelector,
  resourcesMcuVersionsSelector,
  (
    firmwares: Object[],
    finalFirmwareVersions: Object[],
    OSUfirmwareVersions: Object[],
    applications: Object[],
    applicationVersions: Object[],
    devices: Object[],
    deviceVersions: Object[],
    publishers: Object[],
    providers: Object[],
    categories: Object[],
    mcu: Object[],
    mcuVersions: Object[],
  ): Object => ({
    firmwares,
    finalFirmwareVersions,
    OSUfirmwareVersions,
    applications,
    applicationVersions,
    devices,
    deviceVersions,
    publishers,
    providers,
    categories,
    mcu,
    mcuVersions,
  }),
)
