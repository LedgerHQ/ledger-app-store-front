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

    return response
  } catch (err) {
    return err
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

    return response
  } catch (err) {
    return err
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

    return response
  } catch (err) {
    return err
  }
}
