/* eslint import/no-named-as-default-member: 0 */
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import * as types from '../../actions/action-types'
import resourcesMiddleware from '../resources-middleware'
import * as resourcesActions from '../../actions/resources-actions'

const middlewares = [thunk, resourcesMiddleware]
const mockStore = configureMockStore(middlewares)

describe('resources middleware', () => {
  let store
  beforeEach(() => {
    store = mockStore({
      auth: {
        username: 'username',
        token: 'token',
      },
    })

    resourcesActions.fetchResource = jest.fn()
  })

  describe(`should listen to ${
    types.CREATE_RESOURCE_SUCCESS
  } and dispatch the correct action`, () => {
    test('with a top level resource type', async done => {
      resourcesActions.fetchResource.mockReturnValue(resourcesActions.getFirmwares({}))
      const expected = { type: types.GET_FIRMWARES, payload: {} }
      await store.dispatch({ type: types.CREATE_RESOURCE_SUCCESS, payload: 'firmwares' })
      const [, dispatched] = store.getActions()
      expect(dispatched).toEqual(expected)
      done()
    })

    test('with a version resource type', async done => {
      resourcesActions.fetchResource.mockReturnValue(resourcesActions.getFirmwares({}))
      const expected = { type: types.GET_FIRMWARES, payload: {} }
      await store.dispatch({ type: types.CREATE_RESOURCE_SUCCESS, payload: 'firmware_versions' })
      const [, dispatched] = store.getActions()
      expect(dispatched).toEqual(expected)
      done()
    })
  })

  test(`should not dispatch any other action otherwise`, async done => {
    const action = { type: 'SOME_ACTION' }
    const expected = [action]
    await store.dispatch(action)
    const dispatched = store.getActions()
    expect(dispatched).toEqual(expected)
    done()
  })
})
