// @flow

type JSON = {
  error: string,
  message: string,
  detail: string,
}

type Action = {
  payload?: string,
  status?: number,
}

const INVALID_TOKEN = 'Invalid token.'

/**
 * @name getErrorFromJson
 * @description check in server response for an error message
 * @param {object} json json response from server
 * @return {string}
 */
export const getErrorFromJson: Function = (json: JSON): string => {
  if ('error' in json) {
    return json.error
  } else if ('message' in json) {
    return json.message
  } else if ('detail' in json) {
    return json.detail
  }

  return ''
}

/**
 * @name isUnauthorized
 * @description check in `action` if any unauthorized payload has been received by the server
 * @param {object} action action being dispatched to be checked
 */
export const isUnauthorized: Function = (action: Action): boolean =>
  action.status === 401 || action.payload === INVALID_TOKEN
