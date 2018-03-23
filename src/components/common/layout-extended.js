// @flow
import * as React from 'react'
import { Link } from 'react-router-dom'
import { compose } from 'redux'
import { connect } from 'react-redux'
import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar/Toolbar'
import Button from 'material-ui/Button'
import IconButton from 'material-ui/IconButton'
import HomeIcon from 'material-ui-icons/Home'
import AccountCirleIcon from 'material-ui-icons/AccountCircle'
import Drawer from 'material-ui/Drawer'
import Divider from 'material-ui/Divider'
import { withStyles } from 'material-ui/styles'

import Title from './title'
import { authSuccessSelector } from '../../selectors/auth-selectors'

type Props = {
  children?: React.Node,
  loggedIn: boolean,
  classes: Object,
  title: string,
  sideBarComponent?: React.Node,
}

const drawerWidth = 240

const styles = theme => ({
  frame: {
    height: '100%',
    zIndex: 1,
    flexGrow: 1,
    overflow: 'hidden',
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawPaper: {
    position: 'relative',
    width: drawerWidth,
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
    minWidth: 0,
    overflow: 'scroll',
  },
  flex: {
    flex: 1,
  },
})

export const LayoutExtended = ({
  children,
  loggedIn,
  classes,
  title,
  sideBarComponent,
}: Props): React.Node => (
  <div className={classes.frame}>
    <AppBar position="absolute" className={classes.appBar}>
      <Toolbar>
        <IconButton component={Link} color="inherit" to="/">
          <HomeIcon />
        </IconButton>
        <Title color="inherit" className={classes.flex}>
          {title}
        </Title>
        {loggedIn ? (
          <IconButton component={Link} color="inherit" to="/dashboard">
            <AccountCirleIcon />
          </IconButton>
        ) : (
          <Button component={Link} color="inherit" to="/login">
            Login
          </Button>
        )}
      </Toolbar>
    </AppBar>
    <Drawer
      variant="permanent"
      classes={{
        paper: classes.drawPaper,
      }}
      anchor="left"
    >
      <div className={classes.toolbar} />
      <Divider />
      {sideBarComponent}
    </Drawer>
    <div className={classes.content}>{children}</div>
  </div>
)

LayoutExtended.defaultProps = {
  children: null,
  sideBarComponent: null,
}

const mapStateToProps = state => ({
  loggedIn: authSuccessSelector(state),
})

const enhancer = compose(withStyles(styles), connect(mapStateToProps))

export default enhancer(LayoutExtended)
