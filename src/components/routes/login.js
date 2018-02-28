// @flow
import * as React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import Grid from 'material-ui/Grid'
import TextField from 'material-ui/TextField'
import Button from 'material-ui/Button'

import Title from '../common/title'
import { login as loginAction } from '../../actions/authActions'
import { authSuccessSelector } from '../../selectors/authSelectors'

type Props = {
  login: Function,
  loggedIn: boolean,
}

type State = {
  email?: string,
  password?: string,
}

const emailRegEx = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

class Login extends React.Component<Props, State> {
  props: Props
  state: State

  state = {
    email: '',
    password: '',
  }

  login = evt => {
    const { login } = this.props
    const { email, password } = this.state
    evt.preventDefault()
    if (
      this.state.email &&
      this.state.password &&
      this.state.password.length >= 6 &&
      emailRegEx.test(this.state.email)
    ) {
      login(email, password)
    }
  }

  onChange = (field: 'email' | 'password'): Function => evt => {
    const { value } = evt.currentTarget
    this.setState(state => ({ ...state, [field]: value }))
  }

  render() {
    const { loggedIn } = this.props
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
                  id="email"
                  label="email"
                  type="email"
                  className="input"
                  value={this.state.email}
                  onChange={this.onChange('email')}
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
  loggedIn: authSuccessSelector(state),
})

export default connect(mapStateToProps, { login: loginAction })(Login)
