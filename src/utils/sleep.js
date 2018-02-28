// @flow

/**
 * @name sleep
 * @description pauses execution for `timeout` milliseconds
 * @param {number} timeout
 */
const sleep = (timeout: number = 2000): Promise<void> =>
  new Promise(resolve => setTimeout(() => resolve(), timeout))

export default sleep
