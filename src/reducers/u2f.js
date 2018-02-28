// @flow
import * as types from '../actions/actionTypes'

type State = {
  requested: boolean,
  challenge: string,
  deviceSuccess: boolean,
  deviceError: string,
  serverSuccess: boolean,
  serverError: string,
}

type Action = {
  type: string,
  challenge?: string,
}

const initialState: State = {
  requested: true,
  challenge: '',
  deviceSuccess: false,
  deviceError: '',
  serverSuccess: false,
  serverError: '',
}

const u2fReducer = (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case types.U2F_REQUESTED:
      return {
        ...state,
        requested: true,
        challenge: action.challenge,
      }
    default:
      return state
  }
}

export default u2fReducer
