// @flow
import * as React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { isLoggedInSelector } from '../../selectors/authSelectors'

type Props = {
  component: Function,
  loggedIn: boolean,
}

const ProtectedRoute = ({ component: Component, loggedIn, ...rest }: Props): React.Node => (
  <Route
    {...rest}
    render={() => (loggedIn ? <Component /> : <Redirect to={{ pathname: '/login' }} push />)}
  />
)

const mapStateToProps = state => ({ loggedIn: isLoggedInSelector(state) })

export default connect(mapStateToProps)(ProtectedRoute)
