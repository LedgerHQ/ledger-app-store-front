import * as util from '../string'

describe('string util', () => {
  describe('capitalize', () => {
    test('should return a capitalized string', () => {
      const str = 'hello'
      const expected = 'HELLO'

      const result = util.capitalize(str)
      expect(result).toBe(expected)
    })
  })

  describe('capitalizeFirst', () => {
    test('should return a string with the first letter capitalized', () => {
      const str = 'hello'
      const expected = 'Hello'

      const result = util.capitalizeFirst(str)
      expect(result).toBe(expected)
    })
  })

  describe('getTopLevelFromVersion', () => {
    test('should return a formatted string', () => {
      const str = 'application_versions'
      const expected = 'applications'

      const result = util.getTopLevelFromVersion(str)
      expect(result).toBe(expected)
    })

    test('should handle `mcu` expection', () => {
      const str = 'mcu_versions'
      const expected = 'mcu'

      const result = util.getTopLevelFromVersion(str)
      expect(result).toBe(expected)
    })
  })
})
