// @flow

export const getVersions = (key: string, arr: Object[]): Object[] =>
  [].concat(...arr.map(el => (el[key] ? el[key].map(ele => ({ topName: el.name, ...ele })) : [])))

export default {
  getVersions,
}
