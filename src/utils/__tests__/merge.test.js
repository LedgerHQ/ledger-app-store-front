import * as util from '../merge'

describe('merge util', () => {
  describe('cleanMerge', () => {
    test('should not return a null or undefined value when merging two objects', () => {
      const obj1 = { test: null, id: 2, cat: [] }
      const obj2 = { test: '', id: 2, cat: undefined }
      const expected = {
        test: '',
        id: 2,
        cat: [],
      }

      const result1 = util.cleanMerge(obj1, obj2)
      const result2 = util.cleanMerge(obj2, obj1)
      expect(result1).toEqual(expected)
      expect(result2).toEqual(expected)
    })
  })
})
