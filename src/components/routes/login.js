// @flow
/* globals SyntheticEvent */
import * as React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import Grid from 'material-ui/Grid'
import TextField from 'material-ui/TextField'
import Button from 'material-ui/Button'

import Title from '../common/title'
// import DeviceDialog from '../common/dialog/device-dialog'
import { login as loginAction } from '../../actions/authActions'
import {
  isLoggedInSelector,
  authErrorSelector,
  authPendingSelector,
} from '../../selectors/authSelectors'

type Props = {
  login: Function,
  authError?: string,
  // pending: boolean,
  loggedIn: boolean,
}

type State = {
  username: string,
  password: string,
}

export class Login extends React.Component<Props, State> {
  props: Props
  state: State

  static defaultProps = {
    authError: '',
  }

  state = {
    username: '',
    password: '',
  }

  login = (evt: SyntheticEvent<HTMLFormElement>) => {
    const { login } = this.props
    const { username, password } = this.state
    evt.preventDefault()
    if (username.length >= 4 && password.length >= 6) {
      login(username, password)
    }
  }

  onChange = (field: 'username' | 'password'): Function => evt => {
    const { value } = evt.currentTarget
    this.setState(state => ({ ...state, [field]: value }))
  }

  render() {
    const { loggedIn, authError } = this.props

    return loggedIn ? (
      <Redirect to="/dashboard" />
    ) : (
      <div className="root">
        <Grid container alignItems="center" justify="center">
          <Grid item>
            <Title align="center" variant="headline">
              Login
            </Title>
            <div>
              <form onSubmit={this.login}>
                <TextField
                  id="username"
                  label="username"
                  type="string"
                  className="input"
                  value={this.state.username}
                  onChange={this.onChange('username')}
                  fullWidth
                />

                <TextField
                  id="password"
                  label="password"
                  type="password"
                  className="input"
                  value={this.state.password}
                  onChange={this.onChange('password')}
                  fullWidth
                />
                <div className="error">{authError}</div>
                <Button className="input" variant="raised" color="primary" type="submit">
                  Login
                </Button>
              </form>
            </div>
          </Grid>
        </Grid>

        <style jsx>{`
          .root {
            margin: 15% 8px;
          }

          .root form {
            display: flex;
            flex-direction: column;
            min-width: 275px;
          }

          .root :global(.input) {
            margin: 12px 0;
          }
        `}</style>
      </div>
    )
  }
}

const mapStateToProps = (state: Object): Object => ({
  loggedIn: isLoggedInSelector(state),
  pending: authPendingSelector(state),
  authError: authErrorSelector(state),
})

export default connect(mapStateToProps, { login: loginAction })(Login)
