// @flow

/* STRING HELPERS */

/**
 * @name capitalize
 * @description change all letters in a string to uppercase
 * @param {string} str string to capitalize
 * @return {string} capitalized string
 */
export const capitalize = (str: string): string => str.toUpperCase()

/**
 * @name capitalizeFirst
 * @description change the first letter in a string to uppercase
 * @param {string} str string to capitalize
 * @return {string} string with first letter capitalized
 */
export const capitalizeFirst = (str: string): string =>
  `${capitalize(str.slice(0, 1))}${str.slice(1)}`

/**
 * @name getTopLevelFromVersion
 * @description strips away _versions from a type and returns the correct resource type
 * @param {string} type the resource_versions type
 * @return {string} transformed string
 */
export const getTopLevelFromVersion = (type: string): string =>
  `${type.split('_')[0]}${type.startsWith('mcu') ? '' : 's'}`
