// @flow
import 'u2f-api-polyfill'

type Challenge = {
  appId: string,
  registerRequests?: Array<Object>,
  challenge?: string,
  registeredKeys: Array<Object>,
}

const U2F_ERROR_CODES = {
  '1': 'OTHER_ERROR',
  '2': 'BAD_REQUEST',
  '3': 'CONFIGURATION_UNSUPPORTED',
  '4': 'DEVICE_INELIGIBLE',
  '5': 'TIMEOUT',
}

/**
 * @name register
 * @description verifies that the challenge returned by server is correct and signs a new challenge to send back to server
 * @param {object} challenge challenge returned by server
 * @param {number} timeout=30 time in seconds before the signing process fails
 */
export const register = (
  { appId, registerRequests, registeredKeys }: Challenge,
  timeout: number = 30,
): Promise<Object> =>
  new Promise((resolve: Function, reject: Function) =>
    window.u2f.register(
      appId,
      registerRequests,
      registeredKeys,
      deviceChallenge => {
        if (deviceChallenge.errorCode) {
          return reject(new Error(U2F_ERROR_CODES[deviceChallenge.errorCode]))
        }

        return resolve(deviceChallenge)
      },
      timeout,
    ),
  )

/**
 * @name sign
 * @description signs a challenge for double authentication process
 * @param {object} challenge challenge sent by server
 * @param {number} timeout=30 time in seconds before the signing process fails
 */
export const sign = (
  { appId, challenge, registeredKeys }: Challenge,
  timeout: number = 30,
): Promise<Object> =>
  new Promise((resolve: Function, reject: Function) =>
    window.u2f.sign(
      appId,
      challenge,
      registeredKeys,
      deviceChallenge => {
        if (deviceChallenge.errorCode) {
          return reject(new Error(U2F_ERROR_CODES[deviceChallenge.errorCode]))
        }

        return resolve(deviceChallenge)
      },
      timeout,
    ),
  )
