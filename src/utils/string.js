// @flow
/**
 * STRING HELPERS
 */

export const capitalize = (str: string): string => str.toUpperCase()

export const capitalizeFirst = (str: string): string =>
  `${capitalize(str.slice(0, 1))}${str.slice(1)}`
