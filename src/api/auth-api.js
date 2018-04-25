// @flow
import fetch from 'unfetch'
import fetchWithToken from '../utils/fetch'

const BASE_URL: string = process.env.API_URL || 'http://localhost:8000'

/**
 * @name login
 * @description sends username and password to server to authenticate user
 * @param {string} username user's name
 * @param {string} password user's password
 */
export const login = async (username: string, password: string): Promise<Object> => {
  try {
    const response = await fetch(`${BASE_URL}/api/auth`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        password,
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
 * @name finishLogin
 * @description uses a device's signed challenge to finish secure authentication process
 * @param {string} token server delivered token for logged
 * @param {object} challenge challenge sent back by device
 * @param {string} username currently connected user's name
 */
export const finishLogin = async (
  token: string,
  challenge: Object,
  username: string,
): Promise<Object> => {
  try {
    const response = await fetchWithToken(token)(`${BASE_URL}/api/finish_auth`, {
      method: 'POST',
      body: JSON.stringify({
        username,
        response: challenge,
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

export const logout = () => {}
