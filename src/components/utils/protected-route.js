// @flow
import * as React from 'react'
import { Route, Redirect } from 'react-router-dom'

type Props = {
  component: Function,
  loggedIn: boolean,
}

const ProtectedRoute = ({ component: Component, ...rest }: Props) => (
  <Route
    {...rest}
    render={props =>
      props.loggedIn ? <Component {...props} /> : <Redirect to={{ pathname: '/login' }} push />
    }
  />
)

export default ProtectedRoute
