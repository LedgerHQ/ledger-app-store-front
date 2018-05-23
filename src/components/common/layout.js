// @flow
import * as React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar/Toolbar'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import HomeIcon from 'material-ui-icons/Home'
import PowerIcon from 'material-ui-icons/PowerSettingsNew'
import AccountCirleIcon from 'material-ui-icons/AccountCircle'

import Title from './title'
import { authSuccessSelector } from '../../selectors/auth-selectors'
import { logout as logoutAction } from '../../actions/auth-actions'

type Props = {
  children?: React.Node,
  loggedIn: boolean,
  title: string,
  logout: Function,
}

export const Layout = ({ children, loggedIn, title, logout }: Props): React.Node => (
  <div>
    <AppBar position="static">
      <Toolbar>
        <IconButton component={Link} color="inherit" to="/">
          <HomeIcon />
        </IconButton>
        <Title color="inherit" className="flex">
          {title}
        </Title>
        {loggedIn ? (
          <React.Fragment>
            <IconButton component={Link} color="inherit" to="/dashboard">
              <AccountCirleIcon />
            </IconButton>
            <IconButton color="inherit" onClick={logout}>
              <PowerIcon />
            </IconButton>
          </React.Fragment>
        ) : (
          <Button component={Link} color="inherit" to="/login">
            Login
          </Button>
        )}
      </Toolbar>
    </AppBar>
    <div className="container">{children}</div>

    <style jsx>{`
      div {
        height: 100%;
        display: flex;
        flex-direction: column;
      }

      .container {
        flex: 1;
        overflow: scroll;
      }

      div :global(.flex) {
        flex: 1;
      }
    `}</style>
  </div>
)

Layout.defaultProps = {
  children: null,
}

const mapStateToProps = state => ({
  loggedIn: authSuccessSelector(state),
})

export default connect(mapStateToProps, { logout: logoutAction })(Layout)
