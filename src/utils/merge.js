// @flow
import { mergeWith, isNil } from 'ramda'

const merger = (first: any, second: any): any => {
  const isFirstNil = isNil(first)
  const isSecondNil = isNil(second)

  if (isFirstNil) {
    return isSecondNil ? '' : second
  } else if (isSecondNil) {
    return isFirstNil ? '' : first
  }

  return second
}

/**
 * @name cleanMerge
 * @description merges two object omitting null and undefined values
 * @param {Object} obj1
 * @param {Object} obj2
 */
export const cleanMerge = (obj1: Object, obj2: Object = {}): Object => mergeWith(merger, obj1, obj2)

export default {
  cleanMerge,
}
