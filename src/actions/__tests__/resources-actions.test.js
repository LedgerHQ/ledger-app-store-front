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
    const type = 'applications'
    const expected = { type: types.CREATE_RESOURCE_SUCCESS, payload: type }
    expect(actions.createResourceSuccess(type)).toEqual(expected)
  })

  test('deleteResourceAction should return the correct action', () => {
    const expected = { type: types.DELETE_RESOURCE }
    expect(actions.deleteResourceAction()).toEqual(expected)
  })

  test('deleteResourceSuccess should return the correct action', () => {
    const type = 'applications'
    const expected = { type: types.DELETE_RESOURCE_SUCCESS, payload: type }
    expect(actions.deleteResourceSuccess(type)).toEqual(expected)
  })

  test('updateResourceAction should return the correct action', () => {
    const expected = { type: types.UPDATE_RESOURCE }
    expect(actions.updateResourceAction()).toEqual(expected)
  })

  test('updateResourceSuccess should return the correct action', () => {
    const type = 'applications'
    const expected = { type: types.UPDATE_RESOURCE_SUCCESS, payload: type }
    expect(actions.updateResourceSuccess(type)).toEqual(expected)
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

  describe('thunk actions resources', () => {
    let store

    beforeEach(() => {
      store = mockStore({
        auth: {
          token: 'token',
        },
      })
      resourcesApi.getResource = jest.fn()
      resourcesApi.createResource = jest.fn()
      resourcesApi.updateResource = jest.fn()
      resourcesApi.deleteResource = jest.fn()
    })

    describe('fetchResources', () => {
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

    describe('createResource', () => {
      test('on success, should create a resource and dispatch the correct actions', async done => {
        const type = 'applications'
        const fields = { name: 'bitcoin', version: 2, firmwares: [2, 45] }
        resourcesApi.createResource.mockResolvedValue({ id: 1, ...fields })

        const expected = [actions.createResourceAction(type), actions.createResourceSuccess(type)]

        await store.dispatch(actions.createResource(type, fields))
        const dispatched = store.getActions()
        expect(dispatched).toEqual(expected)
        done()
      })

      test('on error, should not create a resource and dispatch the correct actions', async done => {
        const type = 'applications'
        const fields = { name: 'bitcoin', version: 2, firmwares: [2, 45] }
        const response = { error: 'invalid fields', status: 400 }
        resourcesApi.createResource.mockRejectedValue({ id: 1, ...response })

        const expected = [
          actions.createResourceAction(type),
          actions.resourcesError(response.error, response.status),
        ]

        await store.dispatch(actions.createResource(type, fields))
        const dispatched = store.getActions()
        expect(dispatched).toEqual(expected)
        done()
      })
    })

    describe('updateResource', () => {
      test('on success, should update a resource and dispatch the correct actions', async done => {
        const type = 'applications'
        const fields = { name: 'bitcoin', version: 2, firmwares: [2, 45] }
        resourcesApi.updateResource.mockResolvedValue({ id: 1, ...fields })

        const expected = [actions.updateResourceAction(type), actions.updateResourceSuccess(type)]

        await store.dispatch(actions.updateResource(type, fields))
        const dispatched = store.getActions()
        expect(dispatched).toEqual(expected)
        done()
      })

      test('on error, should not update a resource and dispatch the correct actions', async done => {
        const type = 'applications'
        const fields = { name: 'bitcoin', version: 2, firmwares: [2, 45] }
        const response = { error: 'invalid fields', status: 400 }
        resourcesApi.updateResource.mockRejectedValue({ id: 1, ...response })

        const expected = [
          actions.updateResourceAction(type),
          actions.resourcesError(response.error, response.status),
        ]

        await store.dispatch(actions.updateResource(type, fields))
        const dispatched = store.getActions()
        expect(dispatched).toEqual(expected)
        done()
      })
    })

    describe('deleteResource', () => {
      test('on success, should delete a resource and dispatch the correct actions', async done => {
        const type = 'applications'
        const pk = 2
        resourcesApi.deleteResource.mockResolvedValue({ detail: 'success' })

        const expected = [actions.deleteResourceAction(type), actions.deleteResourceSuccess(type)]

        await store.dispatch(actions.deleteResource(type, pk))
        const dispatched = store.getActions()
        expect(dispatched).toEqual(expected)
        done()
      })

      test('on error, should not delete a resource and dispatch the correct actions', async done => {
        const type = 'applications'
        const pk = 2
        const response = { error: 'resource does not exists' }
        resourcesApi.deleteResource.mockRejectedValue(response)

        const expected = [
          actions.deleteResourceAction(type),
          actions.resourcesError(response.error, response.status),
        ]

        await store.dispatch(actions.deleteResource(type, pk))
        const dispatched = store.getActions()
        expect(dispatched).toEqual(expected)
        done()
      })
    })
  })
})
