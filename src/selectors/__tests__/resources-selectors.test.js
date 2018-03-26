import * as selectors from '../resources-selectors'

describe('resources selectors', () => {
  const applications = [{ name: 'bitcoin' }, { name: 'fido u2f' }]
  const firmwares = [{ name: '1.4.1' }, { name: '1.3.0' }]

  describe('resourcesSelector', () => {
    test('should return resources object from state', () => {
      const state = { resources: { error: '', applications, firmwares }, other: { other: 'other' } }
      const expected = selectors.resourcesSelector(state)
      expect(expected).toEqual(state.resources)
    })

    test('should return an empty object if resources object is not in state', () => {
      const state = { other: { other: 'other' } }
      const expected = selectors.resourcesSelector(state)
      expect(expected).toEqual({})
    })
  })

  describe('resourcesApplicationsSelector', () => {
    test('should return resources.applications object from state', () => {
      const state = { resources: { applications, firmwares }, other: { other: 'other' } }
      const expected = selectors.resourcesApplicationsSelector(state)
      expect(expected).toEqual(state.resources.applications)
    })

    test('should return an empty array if resources object is not in state', () => {
      const state = { other: { other: 'other' } }
      const expected = selectors.resourcesApplicationsSelector(state)
      expect(expected).toEqual([])
    })
  })

  describe('resourcesFirmwaresSelector', () => {
    test('should return resources.firmwares object from state', () => {
      const state = { resources: { applications, firmwares }, other: { other: 'other' } }
      const expected = selectors.resourcesFirmwaresSelector(state)
      expect(expected).toEqual(state.resources.firmwares)
    })

    test('should return empty array  if resources object is not in state', () => {
      const state = { other: { other: 'other' } }
      const expected = selectors.resourcesFirmwaresSelector(state)
      expect(expected).toEqual([])
    })
  })

  describe('resourcesErrorSelector', () => {
    test('should return resources.error object from state', () => {
      const state = { resources: { error: 'some error' }, other: { other: 'other' } }
      const expected = selectors.resourcesErrorSelector(state)
      expect(expected).toEqual(state.resources.error)
    })

    test('should return an empty string if resources object is not in state', () => {
      const state = { other: { other: 'other' } }
      const expected = selectors.resourcesErrorSelector(state)
      expect(expected).toEqual('')
    })
  })

  describe('applicationsListSelector', () => {
    test('should return a list of applications name from state', () => {
      const state = { resources: { applications, firmwares }, other: { other: 'other' } }
      const expected = selectors.applicationsListSelector(state)
      const result = applications.map(app => app.name)
      expect(expected).toEqual(result)
    })

    test('should return an empty array if resources object is not in state', () => {
      const state = { other: { other: 'other' } }
      const expected = selectors.applicationsListSelector(state)
      expect(expected).toEqual([])
    })
  })
})
