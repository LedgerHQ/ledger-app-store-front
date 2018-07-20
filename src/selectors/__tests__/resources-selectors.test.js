import * as selectors from '../resources-selectors'
import { getVersions } from '../../utils/array'

describe('resources selectors', () => {
  const applications = [
    { name: 'bitcoin', id: 1, application_versions: [{ id: 1 }] },
    { name: 'fido u2f', id: 2, application_versions: [{ id: 3 }] },
  ]
  const firmwares = [
    { name: '1.4.1', id: 28, se_firmware_final_versions: [{ id: 1, osu_version: [2, 5, 7] }] },
    { name: '1.3.0', id: 32, se_firmware_final_versions: [{ id: 3, osu_version: [1, 4, 8] }] },
  ]
  const devices = [
    { name: 'nano blue', id: 4, device_versions: [{ id: 1 }] },
    { name: 'nano s', id: 12, device_versions: [{ id: 3 }] },
  ]
  const providers = [{ name: '1.4.1', id: 28 }, { name: '1.3.0', id: 32 }]
  const publishers = [{ name: 'ledger', id: 28 }, { name: 'amazon', id: 32 }]
  const categories = [{ name: 'gaming', id: 28 }, { name: 'finance', id: 32 }]
  const mcu = [
    { name: 'mcu', id: 28, mcu_versions: [{ id: 1 }] },
    { name: 'mcu2', id: 32, mcu_versions: [{ id: 3 }] },
  ]

  const icons = [
    { id: 1, name: 'BTC', file: 'https://some.url/btc.png' },
    { id: 2, name: 'BTCASH', file: 'https://some.url/btcash.png' },
  ]

  describe('resourcesSelector', () => {
    test('should return resources object from state', () => {
      const state = {
        resources: {
          error: '',
          applications,
          firmwares,
          devices,
          mcu,
          categories,
          publishers,
          providers,
          icons,
        },
        other: { other: 'other' },
      }
      const result = selectors.resourcesSelector(state)
      expect(result).toEqual(state.resources)
    })

    test('should return an empty object if resources object is not in state', () => {
      const state = { other: { other: 'other' } }
      const result = selectors.resourcesSelector(state)
      expect(result).toEqual({})
    })
  })

  describe('resourcesApplicationsSelector', () => {
    test('should return resources.applications object from state', () => {
      const state = {
        resources: {
          applications,
          firmwares,
          devices,
          mcu,
          categories,
          publishers,
          providers,
          icons,
        },
        other: { other: 'other' },
      }
      const result = selectors.resourcesApplicationsSelector(state)
      expect(result).toEqual(state.resources.applications)
    })

    test('should return an empty array if resources object is not in state', () => {
      const state = { other: { other: 'other' } }
      const result = selectors.resourcesApplicationsSelector(state)
      expect(result).toEqual([])
    })
  })

  describe('resourcesApplicationVersionsSelector', () => {
    test('should return all versions found in state.applications object from state', () => {
      const state = {
        resources: {
          applications,
          firmwares,
          devices,
          mcu,
          categories,
          publishers,
          providers,
          icons,
        },
        other: { other: 'other' },
      }
      const expected = getVersions('application_versions', applications)
      const result = selectors.resourcesApplicationVersionsSelector(state)
      expect(result).toEqual(expected)
    })

    test('should return an empty array if no application_versions found in state', () => {
      const state = {
        resources: {
          applications: [],
          firmwares,
          devices,
          mcu,
          categories,
          publishers,
          providers,
          icons,
        },
        other: { other: 'other' },
      }
      const result = selectors.resourcesApplicationVersionsSelector(state)
      expect(result).toEqual([])
    })
  })

  describe('resourcesFirmwaresSelector', () => {
    test('should return resources.firmwares object from state', () => {
      const state = {
        resources: {
          applications,
          firmwares,
          devices,
          mcu,
          categories,
          publishers,
          providers,
          icons,
        },
        other: { other: 'other' },
      }
      const result = selectors.resourcesFirmwaresSelector(state)
      expect(result).toEqual(state.resources.firmwares)
    })

    test('should return empty array  if resources object is not in state', () => {
      const state = { other: { other: 'other' } }
      const result = selectors.resourcesFirmwaresSelector(state)
      expect(result).toEqual([])
    })
  })

  describe('resourcesFinalFirmwareVersionsSelector', () => {
    test('should return all versions found in state.firmwares object from state', () => {
      const state = {
        resources: {
          applications,
          firmwares,
          devices,
          mcu,
          categories,
          publishers,
          providers,
          icons,
        },
        other: { other: 'other' },
      }
      const expected = getVersions('se_firmware_final_versions', firmwares)
      const result = selectors.resourcesFinalFirmwareVersionsSelector(state)
      expect(result).toEqual(expected)
    })

    test('should return an empty array if no se_firmware_final_versions found in state', () => {
      const state = {
        resources: { applications, firmwares: [], devices, mcu, categories, publishers, providers },
        other: { other: 'other' },
      }
      const result = selectors.resourcesFinalFirmwareVersionsSelector(state)
      expect(result).toEqual([])
    })
  })

  describe('resourcesDevicesSelector', () => {
    test('should return resources.devices object from state', () => {
      const state = {
        resources: {
          applications,
          firmwares,
          devices,
          mcu,
          categories,
          publishers,
          providers,
          icons,
        },
        other: { other: 'other' },
      }
      const result = selectors.resourcesDevicesSelector(state)
      expect(result).toEqual(state.resources.devices)
    })

    test('should return empty array  if resources object is not in state', () => {
      const state = { other: { other: 'other' } }
      const result = selectors.resourcesDevicesSelector(state)
      expect(result).toEqual([])
    })
  })

  describe('resourcesDeviceVersionsSelector', () => {
    test('should return all versions found in state.devices object from state', () => {
      const state = {
        resources: {
          applications,
          firmwares,
          devices,
          mcu,
          categories,
          publishers,
          providers,
          icons,
        },
        other: { other: 'other' },
      }
      const expected = getVersions('device_versions', devices)
      const result = selectors.resourcesDeviceVersionsSelector(state)
      expect(result).toEqual(expected)
    })

    test('should return an empty array if no device_versions found in state', () => {
      const state = {
        resources: {
          applications,
          firmwares,
          devices: [],
          mcu,
          categories,
          publishers,
          providers,
          icons,
        },
        other: { other: 'other' },
      }
      const result = selectors.resourcesDeviceVersionsSelector(state)
      expect(result).toEqual([])
    })
  })

  describe('resourcesMcuSelector', () => {
    test('should return resources.mcu object from state', () => {
      const state = {
        resources: {
          applications,
          firmwares,
          devices,
          mcu,
          categories,
          publishers,
          providers,
          icons,
        },
        other: { other: 'other' },
      }
      const result = selectors.resourcesMcuSelector(state)
      expect(result).toEqual(state.resources.mcu)
    })

    test('should return empty array  if resources object is not in state', () => {
      const state = { other: { other: 'other' } }
      const result = selectors.resourcesMcuSelector(state)
      expect(result).toEqual([])
    })
  })

  describe('resourcesMcuVersionsSelector', () => {
    test('should return all versions found in state.mcu object from state', () => {
      const state = {
        resources: {
          applications,
          firmwares,
          devices,
          mcu,
          categories,
          publishers,
          providers,
          icons,
        },
        other: { other: 'other' },
      }
      const expected = getVersions('mcu_versions', mcu)
      const result = selectors.resourcesMcuVersionsSelector(state)
      expect(result).toEqual(expected)
    })

    test('should return an empty array if no device_versions found in state', () => {
      const state = {
        resources: {
          applications,
          firmwares,
          devices,
          mcu: [],
          categories,
          publishers,
          providers,
          icons,
        },
        other: { other: 'other' },
      }
      const result = selectors.resourcesMcuVersionsSelector(state)
      expect(result).toEqual([])
    })
  })

  describe('resourcesPublishersSelector', () => {
    test('should return resources.publishers object from state', () => {
      const state = {
        resources: {
          applications,
          firmwares,
          devices,
          mcu,
          categories,
          publishers,
          providers,
          icons,
        },
        other: { other: 'other' },
      }
      const result = selectors.resourcesPublishersSelector(state)
      expect(result).toEqual(state.resources.publishers)
    })

    test('should return empty array  if resources object is not in state', () => {
      const state = { other: { other: 'other' } }
      const result = selectors.resourcesPublishersSelector(state)
      expect(result).toEqual([])
    })
  })

  describe('resourcesProvidersSelector', () => {
    test('should return resources.providers object from state', () => {
      const state = {
        resources: {
          applications,
          firmwares,
          devices,
          mcu,
          categories,
          publishers,
          providers,
          icons,
        },
        other: { other: 'other' },
      }
      const result = selectors.resourcesProvidersSelector(state)
      expect(result).toEqual(state.resources.providers)
    })

    test('should return empty array  if resources object is not in state', () => {
      const state = { other: { other: 'other' } }
      const result = selectors.resourcesProvidersSelector(state)
      expect(result).toEqual([])
    })
  })

  describe('resourcesIconsSelector', () => {
    test('should return resources.icons object from state', () => {
      const state = {
        resources: {
          applications,
          firmwares,
          devices,
          mcu,
          categories,
          publishers,
          providers,
          icons,
        },
        other: { other: 'other' },
      }
      const result = selectors.resourcesIconsSelector(state)
      expect(result).toEqual(state.resources.icons)
    })

    test('should return empty array  if icons object is not in state', () => {
      const state = { other: { other: 'other' } }
      const result = selectors.resourcesIconsSelector(state)
      expect(result).toEqual([])
    })
  })

  describe('resourcesCategoriesSelector', () => {
    test('should return resources.categories object from state', () => {
      const state = {
        resources: {
          applications,
          firmwares,
          devices,
          mcu,
          categories,
          publishers,
          providers,
          icons,
        },
        other: { other: 'other' },
      }
      const result = selectors.resourcesCategoriesSelector(state)
      expect(result).toEqual(state.resources.categories)
    })

    test('should return empty array  if resources object is not in state', () => {
      const state = { other: { other: 'other' } }
      const result = selectors.resourcesCategoriesSelector(state)
      expect(result).toEqual([])
    })
  })

  describe('resourcesErrorSelector', () => {
    test('should return resources.error object from state', () => {
      const state = { resources: { error: 'some error' }, other: { other: 'other' } }
      const result = selectors.resourcesErrorSelector(state)
      expect(result).toEqual(state.resources.error)
    })

    test('should return an empty string if resources object is not in state', () => {
      const state = { other: { other: 'other' } }
      const result = selectors.resourcesErrorSelector(state)
      expect(result).toEqual('')
    })
  })

  describe('resourcesSuccessSelector', () => {
    test('should return resources.success object from state', () => {
      const state = { resources: { success: true }, other: { other: 'other' } }
      const result = selectors.resourcesSuccessSelector(state)
      expect(result).toEqual(state.resources.success)
    })

    test('should return false if resources object is not in state', () => {
      const state = { other: { other: 'other' } }
      const result = selectors.resourcesSuccessSelector(state)
      expect(result).toEqual(false)
    })
  })

  describe('resourcesTypeSelector', () => {
    test('should return resources.type object from state', () => {
      const state = { resources: { type: 'applications' }, other: { other: 'other' } }
      const result = selectors.resourcesTypeSelector(state)
      expect(result).toEqual(state.resources.type)
    })

    test('should return an empty string if resources object is not in state', () => {
      const state = { other: { other: 'other' } }
      const result = selectors.resourcesTypeSelector(state)
      expect(result).toEqual('')
    })
  })

  describe('allResourcesSelector', () => {
    test('should return an object with all available ressources', () => {
      const state = {
        resources: {
          applications,
          firmwares,
          devices,
          mcu,
          categories,
          publishers,
          providers,
          icons,
        },
        other: { other: 'other' },
      }
      const result = selectors.allResourcesSelector(state)
      const expected = {
        applications,
        firmwares,
        devices,
        mcu,
        categories,
        publishers,
        providers,
        icons,
      }
      expect(result).toEqual(expected)
    })
  })

  describe('allResourcesAndVersionsSelector', () => {
    test('should return an object with all available ressources and versions', () => {
      const state = {
        resources: {
          applications,
          firmwares,
          devices,
          mcu,
          categories,
          publishers,
          providers,
          icons,
        },
        other: { other: 'other' },
      }
      const finalFirmwareVersions = getVersions('se_firmware_final_versions', firmwares)
      const OSUfirmwareVersions = getVersions('osu_versions', finalFirmwareVersions)
      const result = selectors.allResourcesAndVersionsSelector(state)
      const expected = {
        applications,
        applicationVersions: getVersions('application_versions', applications),
        firmwares,
        OSUfirmwareVersions,
        finalFirmwareVersions,
        devices,
        deviceVersions: getVersions('device_versions', devices),
        mcu,
        mcuVersions: getVersions('mcu_versions', mcu),
        categories,
        publishers,
        providers,
        icons,
      }
      expect(result).toEqual(expected)
    })
  })
})
