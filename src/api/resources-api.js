// @flow
import fetch from 'unfetch'

const BASE_URL = process.env.API_URL || 'http://localhost:8000'

const fetchWithProxy = async (url: string, token: string, options?: Object): Promise<Object> => {
  try {
    return fetch('http://localhost:3000', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        url: `${BASE_URL}${url}`,
        method: 'GET',
        token,
        ...options,
      }),
    })
  } catch (err) {
    throw err
  }
}

export const getFirmwares = async (token: string): Promise<Object[]> => {
  try {
    const response = await fetchWithProxy('/api/firmwares', token)
    const json = await response.json()

    if (!response.ok || json.error) {
      throw json
    }

    return json
  } catch (err) {
    throw err
  }
}

export const getApplications = async (token: string): Promise<Object[]> => {
  try {
    const response = await fetchWithProxy('/api/application_versions', token)
    const json = await response.json()

    if (!response.ok || json.error) {
      throw json
    }

    return json
  } catch (err) {
    throw err
  }
}

export const getAvailableApplications = async (token: string): Promise<any> => {
  try {
    const json = await getApplications(token)
    const apps = json.map(app => app.name)
    return apps
  } catch (err) {
    throw err
  }
}

export const getApplicationVersions = async (
  token: string,
  application: string,
): Promise<Object> => {
  try {
    const response = await fetchWithProxy('/api/application_versions', token)
    const json = await response.json()

    if (!response.ok || json.error) {
      throw json
    }

    const apps = json.filter(app => app.name === application)
    return apps
  } catch (err) {
    throw err
  }
}
