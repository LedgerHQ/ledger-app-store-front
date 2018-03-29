// @flow
import fetchWithToken from '../utils/fetch'

const BASE_URL = process.env.API_URL || 'http://localhost:8000'

/**
 * @name getChallenge
 * @description fetch a challenge from the server
 * @param {string} token server delivered token for logged user
 */
export const getChallenge = async (token: string): Promise<Object> => {
  try {
    const response = await fetchWithToken(token)(`${BASE_URL}/api/key_registration`, {
      method: 'GET',
    })

    const json = await response.json()

    if (!response.ok || json.error) {
      throw json
    }

    return json
  } catch (err) {
    throw err
  }
}

/**
 * @name verifyChallenge
 * @description verify the challenge sent back by the device to securely add this device to the user's authentication process
 * @param {string} token server delivered token for logged
 * @param {object} challenge response challenge from the device
 */
export const verifyChallenge = async (token: string, challenge: Object): Promise<Object> => {
  try {
    const response = await fetchWithToken(token)(`${BASE_URL}/api/key_registration`, {
      method: 'POST',
      body: JSON.stringify({
        response: challenge,
      }),
    })

    const json = response.json()

    if (!response.ok || json.error) {
      throw json
    }

    return json
  } catch (err) {
    throw err
  }
}
