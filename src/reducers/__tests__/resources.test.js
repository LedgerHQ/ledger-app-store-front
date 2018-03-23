import * as types from '../../actions/action-types'
import * as actions from '../../actions/resources-actions'
import resourcesReducer, { initialState } from '../resources'

describe('resources reducer', () => {
  test(`should reduce ${types.GET_APPLICATIONS}`, () => {
    const applications = [{ name: 'app1' }, { name: 'app2' }]
    const expected = { ...initialState, applications }
    const newState = resourcesReducer(initialState, actions.getApplications(applications))
    expect(newState).toEqual(expected)
  })

  test(`should reduce ${types.SELECT_APPLICATION}`, () => {
    const expected = { ...initialState, active: 'App Active' }
    const newState = resourcesReducer(initialState, actions.selectApplication('App Active'))
    expect(newState).toEqual(expected)
  })

  test(`should reduce ${types.GET_FIRMWARE_VERSIONS}`, () => {
    const firmwares = [{ name: 'firmware1' }, { name: 'firmware2' }]
    const expected = { ...initialState, firmwares }
    const newState = resourcesReducer(initialState, actions.getFirmwareVersions(firmwares))
    expect(newState).toEqual(expected)
  })

  test(`should reduce ${types.RESOURCES_ERROR}`, () => {
    const expected = { ...initialState, error: 'some error' }
    const newState = resourcesReducer(initialState, actions.resourcesError('some error'))
    expect(newState).toEqual(expected)
  })

  test('should return state if action is not handled', () => {
    const expected = { ...initialState }
    const newState = resourcesReducer(undefined, { type: 'SOME_OTHER_ACTION' })
    expect(newState).toEqual(expected)
  })
})
