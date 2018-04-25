// @flow
import fetchWithToken from '../utils/fetch'

const BASE_URL = process.env.API_URL || 'http://localhost:8000'

/**
 * @name getResource
 * @description fetch the requested `type` of resource
 * @param {string} token json token for identified user
 * @param {string} type type of resource to fetch
 */
export const getResource = async (token: string, type: string): Promise<Object[]> => {
  try {
    const json = await fetchWithToken(token)(`${BASE_URL}/api/${type}`, {
      method: 'GET',
    })

    return json
  } catch (err) {
    throw err
  }
}

/**
 * @name createResource
 * @description create a given `type` for resource
 * @param {string} token json token for identified user
 * @param {string} type type of resource to create
 * @param {object} fields form fields to send for the creation of the resource
 */
export const createResource = async (
  token: string,
  type: string,
  fields: Object,
): Promise<mixed> => {
  try {
    const json = await fetchWithToken(token)(`${BASE_URL}/api/${type}`, {
      method: 'POST',
      body: JSON.stringify({
        ...fields,
      }),
    })

    return json
  } catch (err) {
    throw err
  }
}
