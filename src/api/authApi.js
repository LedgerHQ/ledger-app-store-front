// @flow
import fetch from 'unfetch'

const BASE_URL: string = process.env.API_URL || 'http://localhost:8000'

export const login = async (username: string, password: string): Promise<Object> => {
  try {
    const res: Promise<Object> = await fetch('http://localhost:3000', {
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
    return res
  } catch (err) {
    return err
  }
}

export const finishLogin = async (challenge: Object, token: string): Promise<Object> => {
  try {
    const res = await fetch(`${BASE_URL}/api/finish_auth`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify({}),
    })
    return res
  } catch (err) {
    return err
  }
}

export const logout = () => {}
