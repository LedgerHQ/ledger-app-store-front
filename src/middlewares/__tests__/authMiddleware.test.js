/* eslint import/no-named-as-default-member: 0 */
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import * as types from '../../actions/actionTypes'
import authMiddleware from '../authMiddleware'

const middlewares = [thunk, authMiddleware]
const mockStore = configureMockStore(middlewares)

describe('auth middleware', () => {
  let store
  beforeEach(() => {
    store = mockStore({
      auth: {
        username: 'username',
        token: 'token',
      },
    })
  })

  test(`should listen to ${types.LOGIN_U2F} and dispatch the correct action`, async done => {
    const expected = { type: types.U2F_REQUESTED }
    await store.dispatch({ type: types.LOGIN_U2F, payload: { challenge: 'challenge' } })
    const [, dispatched] = store.getActions()
    expect(dispatched).toEqual(expected)
    done()
  })

  test(`should listen to ${types.U2F_ERROR} and dispatch the correct action`, async done => {
    const expected = { type: types.LOGIN_FINISH }
    await store.dispatch({ type: types.U2F_ERROR, payload: 'error' })
    const [, dispatched] = store.getActions()
    expect(dispatched).toEqual(expected)
    done()
  })

  test(`should listen to ${
    types.U2F_SERVER_SUCCESS
  } and dispatch the correct action`, async done => {
    const expected = [{ type: types.LOGIN_SUCCESS, payload: 'token' }, { type: types.LOGIN_FINISH }]
    await store.dispatch({ type: types.U2F_SERVER_SUCCESS, payload: 'token' })
    const [, ...dispatched] = store.getActions()
    expect([...dispatched]).toEqual(expected)
    done()
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
