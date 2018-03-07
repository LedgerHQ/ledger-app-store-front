// @flow
import fetch from 'unfetch'

export const login = async (username: string, password: string): Promise<Object> => {
  try {
    const res = await fetch('http://127.0.0.1:8000/api/auth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        password,
      }),
    })
    return res
  } catch (err) {
    return err
  }
}

export const finishLogin = async (challenge: Object, token: string): Promise<Object> => {
  try {
    const res = await fetch('http://127.0.0.1:8000/api/finish_auth', {
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
