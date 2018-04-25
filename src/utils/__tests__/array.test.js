import * as util from '../array'

describe('array utils', () => {
  describe('getVersions', () => {
    test('should get the correct version in object array', () => {
      const key = 'application_versions'
      const arr = [
        { id: 1, name: 'bitcoin', application_versions: [{ id: 2 }, { id: 3 }, { id: 47 }] },
        { id: 2, name: 'shitcoin', application_versions: [{ id: 45 }, { id: 32 }, { id: 98 }] },
      ]

      const result = util.getVersions(key, arr)
      const expected = [
        { id: 2, topName: 'bitcoin' },
        { id: 3, topName: 'bitcoin' },
        { id: 47, topName: 'bitcoin' },
        { id: 45, topName: 'shitcoin' },
        { id: 32, topName: 'shitcoin' },
        { id: 98, topName: 'shitcoin' },
      ]

      expect(result).toEqual(expected)
    })

    test('if no versions are present, should return an empty array', () => {
      const key = 'application_versions'
      const arr = [{ id: 1, name: 'bitcoin' }, { id: 2, name: 'shitcoin' }]

      const result = util.getVersions(key, arr)
      expect(result).toEqual([])
    })
  })
})
