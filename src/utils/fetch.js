import fetch from 'unfetch'

const fetchWithToken = token => (url, options) => {
  const headers = token
    ? {
        'content-type': 'application/json',
        Authorization: `Token ${token}`,
      }
    : {
        'content-type': 'application/json',
      }

  return fetch(url, {
    ...options,
    headers: {
      ...headers,
      ...options.headers,
    },
  })
}

export default fetchWithToken
