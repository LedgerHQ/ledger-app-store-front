/* eslint import/no-named-as-default-member: 0 */
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import * as actions from '../resources-actions'
import * as types from '../action-types'
import * as resourcesApi from '../../api/resources-api'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

const applications = [
  { name: 'bitcoin', id: 1, application_versions: [{ id: 1 }] },
  { name: 'fido u2f', id: 2, application_versions: [{ id: 3 }] },
]
const firmwares = [
  { name: '1.4.1', id: 28, se_firmware_versions: [{ id: 1 }] },
  { name: '1.3.0', id: 32, se_firmware_versions: [{ id: 3 }] },
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

describe('resources actions', () => {
  test('resourcesError should return the correct action', () => {
    const expected = { type: types.RESOURCES_ERROR, payload: 'error' }
    expect(actions.resourcesError('error')).toEqual(expected)
  })

  test('getApplications should return the correct action', () => {
    const expected = { type: types.GET_APPLICATIONS, payload: applications }
    expect(actions.getApplications(applications)).toEqual(expected)
  })

  test('getFirmwares should return the correct action', () => {
    const expected = { type: types.GET_FIRMWARES, payload: firmwares }
    expect(actions.getFirmwares(firmwares)).toEqual(expected)
  })

  test('getDevices should return the correct action', () => {
    const expected = { type: types.GET_DEVICES, payload: devices }
    expect(actions.getDevices(devices)).toEqual(expected)
  })

  test('getProviders should return the correct action', () => {
    const expected = { type: types.GET_PROVIDERS, payload: providers }
    expect(actions.getProviders(providers)).toEqual(expected)
  })

  test('getPublishers should return the correct action', () => {
    const expected = { type: types.GET_PUBLISHERS, payload: publishers }
    expect(actions.getPublishers(publishers)).toEqual(expected)
  })

  test('getCategories should return the correct action', () => {
    const expected = { type: types.GET_CATEGORIES, payload: categories }
    expect(actions.getCategories(categories)).toEqual(expected)
  })

  test('getMcu should return the correct action', () => {
    const expected = { type: types.GET_MCU, payload: mcu }
    expect(actions.getMcu(mcu)).toEqual(expected)
  })

  test('createResourceAction should return the correct action', () => {
    const expected = { type: types.CREATE_RESOURCE }
    expect(actions.createResourceAction()).toEqual(expected)
  })

  test('createResourceSuccess should return the correct action', () => {
    const expected = { type: types.CREATE_RESOURCE_SUCCESS }
    expect(actions.createResourceSuccess()).toEqual(expected)
  })

  test('createResourceVersionAction should return the correct action', () => {
    const expected = { type: types.CREATE_RESOURCE_VERSION }
    expect(actions.createResourceVersionAction()).toEqual(expected)
  })

  test('createResourceVersionSuccess should return the correct action', () => {
    const expected = { type: types.CREATE_RESOURCE_VERSION_SUCCESS }
    expect(actions.createResourceVersionSuccess()).toEqual(expected)
  })

  describe('typeDispatch', () => {
    test('should return getApplications', () => {
      const resource = []
      const expected = { type: types.GET_APPLICATIONS, payload: resource }
      expect(actions.typeDispatch('applications', resource)).toEqual(expected)
    })

    test('should return getProviders', () => {
      const resource = []
      const expected = { type: types.GET_PROVIDERS, payload: resource }
      expect(actions.typeDispatch('providers', resource)).toEqual(expected)
    })

    test('should return getPublishers', () => {
      const resource = []
      const expected = { type: types.GET_PUBLISHERS, payload: resource }
      expect(actions.typeDispatch('publishers', resource)).toEqual(expected)
    })

    test('should return getFirmwares', () => {
      const resource = []
      const expected = { type: types.GET_FIRMWARES, payload: resource }
      expect(actions.typeDispatch('firmwares', resource)).toEqual(expected)
    })

    test('should return getDevices', () => {
      const resource = []
      const expected = { type: types.GET_DEVICES, payload: resource }
      expect(actions.typeDispatch('devices', resource)).toEqual(expected)
    })

    test('should return getCategories', () => {
      const resource = []
      const expected = { type: types.GET_CATEGORIES, payload: resource }
      expect(actions.typeDispatch('categories', resource)).toEqual(expected)
    })

    test('should return getMcu', () => {
      const resource = []
      const expected = { type: types.GET_MCU, payload: resource }
      expect(actions.typeDispatch('mcu', resource)).toEqual(expected)
    })

    test('should return an empty action', () => {
      const resource = []
      const expected = { type: '' }
      expect(actions.typeDispatch('something', resource)).toEqual(expected)
    })
  })

  describe('fetchResources', () => {
    let store

    beforeEach(() => {
      store = mockStore({
        auth: {
          token: 'token',
        },
      })
      resourcesApi.getResource = jest.fn()
    })

    test('should dispatch the correct actions', async done => {
      resourcesApi.getResource
        .mockResolvedValueOnce(firmwares)
        .mockResolvedValueOnce(applications)
        .mockResolvedValueOnce(devices)
        .mockResolvedValueOnce(publishers)
        .mockResolvedValueOnce(providers)
        .mockResolvedValueOnce(categories)
        .mockResolvedValueOnce(mcu)

      const expected = [
        actions.getFirmwares(firmwares),
        actions.getApplications(applications),
        actions.getDevices(devices),
        actions.getPublishers(publishers),
        actions.getProviders(providers),
        actions.getCategories(categories),
        actions.getMcu(mcu),
      ]

      await store.dispatch(actions.fetchResources())
      const dispatched = store.getActions()
      expect(dispatched).toEqual(expected)
      done()
    })

    test('when a resource fails `json.error`, should dispatch the correct actions', async done => {
      resourcesApi.getResource
        .mockResolvedValueOnce(firmwares)
        .mockResolvedValueOnce(applications)
        .mockResolvedValueOnce(devices)
        .mockResolvedValueOnce(publishers)
        .mockResolvedValueOnce(providers)
        .mockResolvedValueOnce(categories)
        .mockRejectedValueOnce({ error: 'could not fetch mcu' })

      const expected = [
        actions.getFirmwares(firmwares),
        actions.getApplications(applications),
        actions.getDevices(devices),
        actions.getPublishers(publishers),
        actions.getProviders(providers),
        actions.getCategories(categories),
        actions.resourcesError('could not fetch mcu'),
      ]

      await store.dispatch(actions.fetchResources())
      const dispatched = store.getActions()
      expect(dispatched).toEqual(expected)
      done()
    })

    test('when a resource fails `json.message`, should dispatch the correct actions', async done => {
      resourcesApi.getResource
        .mockResolvedValueOnce(firmwares)
        .mockResolvedValueOnce(applications)
        .mockResolvedValueOnce(devices)
        .mockResolvedValueOnce(publishers)
        .mockResolvedValueOnce(providers)
        .mockResolvedValueOnce(categories)
        .mockRejectedValueOnce({ message: 'could not fetch mcu' })

      const expected = [
        actions.getFirmwares(firmwares),
        actions.getApplications(applications),
        actions.getDevices(devices),
        actions.getPublishers(publishers),
        actions.getProviders(providers),
        actions.getCategories(categories),
        actions.resourcesError('could not fetch mcu'),
      ]

      await store.dispatch(actions.fetchResources())
      const dispatched = store.getActions()
      expect(dispatched).toEqual(expected)
      done()
    })
  })
})
