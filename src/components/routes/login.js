// @flow
/* globals SyntheticEvent */
import * as React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import Grid from 'material-ui/Grid'
import TextField from 'material-ui/TextField'
import Button from 'material-ui/Button'
import Typography from 'material-ui/Typography'

import Title from '../common/title'
import DeviceDialog from '../common/dialog/device-dialog'
import { login as loginAction } from '../../actions/authActions'

import {
  isLoggedInSelector,
  authErrorSelector,
  authPendingSelector,
  authLoadingSelector,
} from '../../selectors/authSelectors'
import { u2fErrorSelector } from '../../selectors/u2fSelectors'

type Props = {
  login: Function,
  authError?: string,
  u2fError?: string,
  pending: boolean,
  loading: boolean,
  loggedIn: boolean,
}

type State = {
  username: string,
  password: string,
  open: boolean,
}

export class Login extends React.Component<Props, State> {
  props: Props
  state: State

  static defaultProps = {
    authError: '',
    u2fError: '',
  }

  state = {
    username: '',
    password: '',
    open: false,
  }

  timeout = null

  componentDidUpdate(prevProps: Props) {
    const { pending, loggedIn } = this.props
    if (!prevProps.pending && pending && !loggedIn) {
      if (this.timeout) this.timeout.cancel()
      this.toggleDialog(true)()
    }

    if (prevProps.pending && !pending) {
      this.timeout = this.toggleDialog(false)()
    }
  }

  login = (evt: SyntheticEvent<HTMLFormElement>) => {
    evt.preventDefault()
    const { login, loading } = this.props
    const { username, password } = this.state

    if (loading) return

    login(username, password)
  }

  onChange = (field: 'username' | 'password'): Function => evt => {
    const { value } = evt.currentTarget
    this.setState(state => ({ ...state, [field]: value }))
  }

  toggleDialog = (bool: boolean): Function => (): void => {
    this.setState(state => ({
      ...state,
      open: bool,
    }))
  }

  render() {
    const { loggedIn, authError, u2fError } = this.props
    const { open } = this.state

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
                <div className="error">
                  <Typography color="secondary">{authError}</Typography>
                </div>
                <Button className="input" variant="raised" color="primary" type="submit">
                  Login
                </Button>
              </form>
            </div>
          </Grid>
        </Grid>

        <DeviceDialog
          title="Plug in your U2F device"
          subtitle="waiting for approval..."
          open={open}
          success={loggedIn}
          error={u2fError}
        />

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

          .error {
            text-align: center;
          }
        `}</style>
      </div>
    )
  }
}

const mapStateToProps = (state: Object): Object => ({
  loggedIn: isLoggedInSelector(state),
  pending: authPendingSelector(state),
  loading: authLoadingSelector(state),
  authError: authErrorSelector(state),
  u2fError: u2fErrorSelector(state),
})

export default connect(mapStateToProps, { login: loginAction })(Login)
