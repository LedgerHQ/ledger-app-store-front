// @flow
import fetch from 'unfetch'

/**
 * @name fetchWithToken
 * @description boilerplate for fetching with a user's token
 * @param {string} token user's logged in token
 */
const fetchWithToken = (token: string): Function => async (
  url: string,
  options: Object,
): Promise<any> => {
  const headers = token
    ? {
        'content-type': 'application/json',
        Authorization: `Token ${token}`,
      }
    : {
        'content-type': 'application/json',
      }

  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        ...headers,
        ...options.headers,
      },
    })
    const json = await response.json()

    if (!response.ok || json.error) {
      json.status = response.status
      throw json
    }

    return json
  } catch (err) {
    throw err
  }
}

export default fetchWithToken
