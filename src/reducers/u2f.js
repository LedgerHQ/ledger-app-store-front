// @flow
import * as types from '../actions/actionTypes'

type State = {
  requested: boolean,
  deviceSuccess: boolean,
  deviceError: string,
  serverSuccess: boolean,
  serverError: string,
}

type Action = {
  type: string,
  payload?: any,
}

const initialState: State = {
  requested: true,
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
      }
    default:
      return state
  }
}

export default u2fReducer
