// @flow
import fetch from 'unfetch'

const BASE_URL: string = process.env.API_URL || 'http://localhost:8000'

export const login = async (username: string, password: string): Promise<Object> => {
  try {
    const response = await fetch('http://localhost:3000', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        password,
        url: `${BASE_URL}/api/auth`,
        method: 'POST',
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

export const finishLogin = async (challenge: Object, token: string): Promise<Object> => {
  try {
    const response = await fetch(`${BASE_URL}/api/finish_auth`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify({}),
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
