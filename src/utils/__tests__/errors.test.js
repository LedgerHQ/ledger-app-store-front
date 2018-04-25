import * as util from '../errors'

describe('error utils', () => {
  describe('getErrorFromJson', () => {
    test('should return json.error', () => {
      const expected = 'error message'
      const json = { error: expected }
      const result = util.getErrorFromJson(json)
      expect(result).toEqual(expected)
    })
    test('should return json.message', () => {
      const expected = 'error message'
      const json = { message: expected }
      const result = util.getErrorFromJson(json)
      expect(result).toEqual(expected)
    })
    test('should return json.detail', () => {
      const expected = 'error message'
      const json = { detail: expected }
      const result = util.getErrorFromJson(json)
      expect(result).toEqual(expected)
    })
    test('should return an empty string otherwise', () => {
      const expected = 'error message'
      const json = { something: expected }
      const result = util.getErrorFromJson(json)
      expect(result).toEqual('')
    })
  })

  describe('isUnauthorized', () => {
    test('if status is 401, should return true', () => {
      const action = { type: 'SOME_TYPE', status: 401, payload: '' }
      const result = util.isUnauthorized(action)
      expect(result).toBe(true)
    })

    test(`if payload is ${util.INVALID_TOKEN} , should return true`, () => {
      const action = { type: 'SOME_TYPE', payload: util.INVALID_TOKEN }
      const result = util.isUnauthorized(action)
      expect(result).toBe(true)
    })

    test('should return false any other way', () => {
      const action = { type: 'SOME_TYPE', payload: {}, status: 200 }
      const result = util.isUnauthorized(action)
      expect(result).toBe(false)
    })
  })
})
