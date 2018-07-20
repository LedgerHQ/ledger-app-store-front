// @flow
import fetch from 'unfetch'

/**
 * @name fetchWithToken
 * @description boilerplate for fetching with a user's token
 * @param {string} token user's logged in token
 * @param {Object} options fetch options
 * @param {boolean} withFile if a file is present in data, needed to remove content-type
 */
const fetchWithToken = (token: string): Function => async (
  url: string,
  options: Object,
  form: boolean = true,
): Promise<any> => {
  const headers = token
    ? {
        'content-type': 'application/json',
        Authorization: `Token ${token}`,
      }
    : {
        'content-type': 'application/json',
      }

  const data = {
    ...options,
    headers: {
      ...headers,
      ...options.headers,
    },
  }

  if (form) {
    delete data.headers['content-type']
  }

  try {
    const response = await fetch(url, data)

    if (response.status === 204) {
      return {}
    }

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
