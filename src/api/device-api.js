// @flow
import fetch from 'unfetch'

const BASE_URL = process.env.API_URL || 'http://localhost:8000'

/**
 * @name getChallenge
 * @description fetch a challenge from the server
 * @param {string} token server delivered token for logged user
 */
export const getChallenge = async (token: string): Promise<Object> => {
  try {
    const response = await fetch('http://localhost:3000', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        url: `${BASE_URL}/api/key_registration`,
        method: 'GET',
        token,
      }),
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
    const response = await fetch('http://localhost:3000', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        url: `${BASE_URL}/api/key_registration`,
        method: 'POST',
        token,
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
