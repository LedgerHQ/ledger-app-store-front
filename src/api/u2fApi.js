// @flow
import 'u2f-api-polyfill'

type Challenge = {
  appId: string,
  registerRequests?: [],
  challenge?: string,
  registeredKeys: [],
}

const U2F_ERROR_CODES = {
  // $FlowFixMe
  1: 'OTHER_ERROR',
  // $FlowFixMe
  2: 'BAD_REQUEST',
  // $FlowFixMe
  3: 'CONFIGURATION_UNSUPPORTED',
  // $FlowFixMe
  4: 'DEVICE_INELIGIBLE',
  // $FlowFixMe
  5: 'TIMEOUT',
}

export const register = (
  { appId, registerRequests, registeredKeys }: Challenge,
  timeout: number = 30,
): Promise<Object> =>
  new Promise((resolve: Function, reject: Function) => {
    window.u2f.register(
      appId,
      registerRequests,
      registeredKeys,
      deviceChallenge => {
        if (deviceChallenge.errorCode) {
          const error = new Error({
            errorCode: deviceChallenge.error,
            message: U2F_ERROR_CODES[deviceChallenge.errorCode],
          })
          return reject(error)
        }

        return resolve(deviceChallenge)
      },
      timeout,
    )
  })

export const sign = (
  { appId, challenge, registeredKeys }: Challenge,
  timeout: number = 30,
): Promise<Object> =>
  new Promise((resolve: Function, reject: Function) => {
    window.u2f.sign(
      appId,
      challenge,
      registeredKeys,
      deviceChallenge => {
        if (deviceChallenge.errorCode) {
          const error = new Error({
            errorCode: deviceChallenge.error,
            message: U2F_ERROR_CODES[deviceChallenge.errorCode],
          })
          return reject(error)
        }

        return resolve(deviceChallenge)
      },
      timeout,
    )
  })
