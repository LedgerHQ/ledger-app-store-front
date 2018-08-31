import * as object from '../object'

describe('object util', () => {
  describe('makeEventObject', () => {
    test('it should return a SyntheticEvent with the given value set', () => {
      const baseEvt = { preventDefault: () => null, target: { value: '', some: 12 } }
      const value = { check: 'test' }
      const expected = {
        ...baseEvt,
        target: {
          ...baseEvt.target,
          value,
        },
        currentTarget: {
          ...baseEvt.target,
          value,
        },
        preventDefault: baseEvt.preventDefault,
      }

      expect(object.makeEventObject(baseEvt, value)).toEqual(expected)
    })
    test('it should return a SyntheticEvent with a `target` key from a SyntheticEvent', () => {
      const baseEvt = { preventDefault: () => null, currentTarget: { value: '', some: 12 } }
      const value = ''

      expect(object.makeEventObject(baseEvt, value).target).toEqual(baseEvt.currentTarget)
    })

    test('it should return a SyntheticEvent from an Event, and give it a `currentTarget` key', () => {
      const baseEvt = { preventDefault: () => null, target: { value: '', some: 12 } }
      const value = ''

      expect(object.makeEventObject(baseEvt, value).currentTarget).toEqual(baseEvt.target)
    })

    test('it should add a preventDefault property to the returned object', () => {
      const baseEvt = { target: { value: '', some: 12 } }
      const value = ''

      expect(object.makeEventObject(baseEvt, value).preventDefault).toBeTruthy()
    })
  })
})
