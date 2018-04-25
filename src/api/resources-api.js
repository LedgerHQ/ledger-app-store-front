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
 * @param {string} method how to handle the resource (POST|PUT|DELETE)
 */
export const createResource = async (
  token: string,
  type: string,
  fields: Object,
  method: string = 'POST',
): Promise<mixed> => {
  try {
    const json = await fetchWithToken(token)(`${BASE_URL}/api/${type}`, {
      method,
      body: JSON.stringify({
        ...fields,
      }),
    })

    return json
  } catch (err) {
    throw err
  }
}

/**
 * @name deleteResource
 * @description delete a resource
 * @param {string} token json token for identified user
 * @param {string} type type of resource to delete
 * @param {string} pk primary key identifier for resource
 */
export const deleteResource = async (token: string, type: string, pk: string): Promise<mixed> => {
  try {
    const json = await fetchWithToken(token)(`${BASE_URL}/api/${type}/${pk}`, {
      method: 'DELETE',
    })

    return json
  } catch (err) {
    throw err
  }
}

/**
 * @name updateResource
 * @description update a resource
 * @param {string} token json token for identified user
 * @param {string} type type of resource to delete
 * @param {object} fields new values for resource
 */
export const updateResource = async (
  token: string,
  type: string,
  fields: Object,
  method: string = 'PUT',
): Promise<mixed> => {
  try {
    const { id, ...rest } = fields
    const json = await fetchWithToken(token)(`${BASE_URL}/api/${type}/${id}`, {
      method,
      body: JSON.stringify({
        ...rest,
      }),
    })

    return json
  } catch (err) {
    throw err
  }
}
