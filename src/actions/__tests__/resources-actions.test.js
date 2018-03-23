/* eslint import/no-named-as-default-member: 0 */
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import * as actions from '../resources-actions'
import * as types from '../action-types'
import * as resourcesApi from '../../api/resources-api'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('resources actions', () => {
  test('resourcesError should return the correct action', () => {
    const expected = { type: types.RESOURCES_ERROR, payload: 'error' }
    expect(actions.resourcesError('error')).toEqual(expected)
  })

  test('getApplications should return the correct action', () => {
    const applications = [{ name: 'app1' }, { name: 'app2' }]
    const expected = { type: types.GET_APPLICATIONS, payload: applications }
    expect(actions.getApplications(applications)).toEqual(expected)
  })

  test('selectApplication should return the correct action', () => {
    const expected = { type: types.SELECT_APPLICATION, payload: 'appName' }
    expect(actions.selectApplication('appName')).toEqual(expected)
  })

  test('getApplicationsList should return the correct action', () => {
    const expected = { type: types.GET_APPLICATIONS_LIST }
    expect(actions.getApplicationsList()).toEqual(expected)
  })

  test('getFirmwareVersions should return the correct action', () => {
    const firmwares = [{ name: 'firm1' }, { name: 'firm2' }]
    const expected = { type: types.GET_FIRMWARE_VERSIONS, payload: firmwares }
    expect(actions.getFirmwareVersions(firmwares)).toEqual(expected)
  })

  describe('fetchApplications', () => {
    let store

    beforeEach(() => {
      store = mockStore({
        auth: {
          token: 'token',
        },
      })
      resourcesApi.getApplications = jest.fn()
    })

    test('should return a list of applications', async done => {
      const applications = [{ name: 'app1' }, { name: 'app2' }]
      resourcesApi.getApplications.mockResolvedValue(applications)

      const expected = [actions.getApplications(applications)]

      await store.dispatch(actions.fetchApplications())
      const dispatched = store.getActions()
      expect(dispatched).toEqual(expected)
      done()
    })

    describe('should dispatch an error', () => {
      test('when api returns a json with error', async done => {
        const err = { error: 'could not retrieve list of applications' }
        resourcesApi.getApplications.mockRejectedValue(err)

        const expected = [actions.resourcesError(err.error)]

        await store.dispatch(actions.fetchApplications())
        const dispatched = store.getActions()
        expect(dispatched).toEqual(expected)
        done()
      })

      test('when api throws an error', async done => {
        const err = { message: 'could not retrieve list of applications' }
        resourcesApi.getApplications.mockRejectedValue(err)

        const expected = [actions.resourcesError(err.message)]

        await store.dispatch(actions.fetchApplications())
        const dispatched = store.getActions()
        expect(dispatched).toEqual(expected)
        done()
      })
    })
  })

  describe('fetchFirmwares', () => {
    let store

    beforeEach(() => {
      store = mockStore({
        auth: {
          token: 'token',
        },
      })
      resourcesApi.getFirmwares = jest.fn()
    })

    test('should return a list of firmwares', async done => {
      const firmwares = [{ name: 'firm1' }, { name: 'firm2' }]
      resourcesApi.getFirmwares.mockResolvedValue(firmwares)

      const expected = [actions.getFirmwareVersions(firmwares)]

      await store.dispatch(actions.fetchFirmwares())
      const dispatched = store.getActions()
      expect(dispatched).toEqual(expected)
      done()
    })

    describe('should dispatch an error', () => {
      test('when api returns a json with error', async done => {
        const err = { error: 'could not retrieve list of firmwares' }
        resourcesApi.getFirmwares.mockRejectedValue(err)

        const expected = [actions.resourcesError(err.error)]

        await store.dispatch(actions.fetchFirmwares())
        const dispatched = store.getActions()
        expect(dispatched).toEqual(expected)
        done()
      })

      test('when api throws an error', async done => {
        const err = { message: 'could not retrieve list of firmwares' }
        resourcesApi.getFirmwares.mockRejectedValue(err)

        const expected = [actions.resourcesError(err.message)]

        await store.dispatch(actions.fetchFirmwares())
        const dispatched = store.getActions()
        expect(dispatched).toEqual(expected)
        done()
      })
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
      resourcesApi.getFirmwares = jest.fn()
      resourcesApi.getApplications = jest.fn()
    })

    test('should dispatch the correct actions', async done => {
      const firmwares = [{ name: 'firm1' }, { name: 'firm2' }]
      const applications = [{ name: 'app1' }, { name: 'app2' }]
      resourcesApi.getApplications.mockResolvedValue(applications)
      resourcesApi.getFirmwares.mockResolvedValue(firmwares)

      const expected = [
        actions.getApplications(applications),
        actions.getFirmwareVersions(firmwares),
      ]

      await store.dispatch(actions.fetchResources())
      const dispatched = store.getActions()
      expect(dispatched).toEqual(expected)
      done()
    })

    describe('when fetchFirmwares fail', () => {
      test("should dispatch the correct actions (with error = { error: 'error message'})", async done => {
        const err = { error: 'could not retrieve list of firmwares' }
        const applications = [{ name: 'app1' }, { name: 'app2' }]
        resourcesApi.getApplications.mockResolvedValue(applications)
        resourcesApi.getFirmwares.mockRejectedValue(err)

        const expected = [actions.getApplications(applications), actions.resourcesError(err.error)]

        await store.dispatch(actions.fetchResources())
        const dispatched = store.getActions()
        expect(dispatched).toEqual(expected)
        done()
      })

      test("should dispatch the correct actions (with error = { message: 'error message'})", async done => {
        const err = { message: 'could not retrieve list of firmwares' }
        const applications = [{ name: 'app1' }, { name: 'app2' }]
        resourcesApi.getApplications.mockResolvedValue(applications)
        resourcesApi.getFirmwares.mockRejectedValue(err)

        const expected = [
          actions.getApplications(applications),
          actions.resourcesError(err.message),
        ]

        await store.dispatch(actions.fetchResources())
        const dispatched = store.getActions()
        expect(dispatched).toEqual(expected)
        done()
      })
    })

    describe('when fetchApplications fail', () => {
      test("should dispatch the correct actions (with error = { error: 'error message'})", async done => {
        const err = { error: 'could not retrieve list of firmwares' }
        const firmwares = [{ name: 'firm1' }, { name: 'firm2' }]
        resourcesApi.getApplications.mockRejectedValue(err)
        resourcesApi.getFirmwares.mockResolvedValue(firmwares)

        const expected = [actions.resourcesError(err.error), actions.getFirmwareVersions(firmwares)]

        await store.dispatch(actions.fetchResources())
        const dispatched = store.getActions()
        expect(dispatched).toEqual(expected)
        done()
      })

      test("should dispatch the correct actions (with error = { message: 'error message'})", async done => {
        const err = { message: 'could not retrieve list of firmwares' }
        const firmwares = [{ name: 'firm1' }, { name: 'firm2' }]
        resourcesApi.getApplications.mockRejectedValue(err)
        resourcesApi.getFirmwares.mockResolvedValue(firmwares)

        const expected = [
          actions.resourcesError(err.message),
          actions.getFirmwareVersions(firmwares),
        ]

        await store.dispatch(actions.fetchResources())
        const dispatched = store.getActions()
        expect(dispatched).toEqual(expected)
        done()
      })
    })
  })
})
