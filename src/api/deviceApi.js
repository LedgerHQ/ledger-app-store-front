// @flow
import fetch from 'unfetch'

const BASE_URL = process.env.API_URL || 'http://localhost:8000'

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

export const finishLogin = async (
  token: string,
  challenge: Object,
  username: string,
): Promise<Object> => {
  try {
    const response = await fetch('http://localhost:3000', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        url: `${BASE_URL}/api/finish_auth`,
        method: 'POST',
        username,
        token,
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
