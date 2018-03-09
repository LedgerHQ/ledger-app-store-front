// @flow
import * as React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import Button from 'material-ui/Button'
import Tooltip from 'material-ui/Tooltip'
import { withStyles } from 'material-ui/styles'
import AddIcon from 'material-ui-icons/Add'

import Title from '../common/title'
import DeviceDialog from '../common/dialog/device-dialog'
import { registerU2FDevice as registerU2FDeviceAction } from '../../actions/deviceActions'

type Props = {
  classes: Object,
  registerU2FDevice: Function,
}

type State = {
  open: boolean,
  success: boolean,
  error: boolean,
}

const styles = theme => ({
  paper: {
    width: '100%',
    maxWidth: '900px',
    margin: `${theme.spacing.unit * 3}px auto 0`,
    overflowX: 'auto',
  },
  table: {
    width: '100%',
  },
  fab: {
    margin: theme.spacing.unit * 2,
  },
})

export class Dashboard extends React.Component<Props, State> {
  props: Props
  state: State

  state = {
    open: false,
    success: false,
    error: false,
  }

  deviceCheck = null
  checkLoops = 0

  componentDidUpdate(prevProps: Props, { open: prevOpen, success: prevSuccess }: State) {
    const { open, success } = this.state
    if (!prevOpen && open && (!prevSuccess && !success)) {
      const { registerU2FDevice } = this.props
      registerU2FDevice()
      this.deviceCheck = setTimeout(() => {
        this.setState(
          state => ({ ...state, success: true }),
          () => {
            if (this.deviceCheck) {
              clearTimeout(this.deviceCheck)
            }
          },
        )
      }, 5000)
    }

    if (prevOpen && !open && this.deviceCheck) {
      clearTimeout(this.deviceCheck)
    }
  }

  toggleDialog = (bool: boolean): Function => (): void => {
    this.setState(state => ({
      ...state,
      open: bool,
      success: bool ? state.success : false,
    }))
  }

  render(): React.Node {
    const { classes } = this.props
    const { open, success, error } = this.state

    return (
      <React.Fragment>
        <div className="container">
          <Title> Dashboard </Title>
        </div>
        <div className="fab">
          <Tooltip title="add new device" className={classes.fab} placement="top">
            <Button variant="fab" color="secondary" onClick={this.toggleDialog(true)}>
              <AddIcon />
            </Button>
          </Tooltip>
        </div>

        <DeviceDialog
          error={error}
          success={success}
          open={open}
          closeDialog={this.toggleDialog(false)}
        />

        <style jsx>{`
          .fab {
            position: fixed;
            bottom: 80px;
            right: 80px;
          }

          .container {
            margin-top: 10%;
            text-align: center;
          }
        `}</style>
      </React.Fragment>
    )
  }
}

const mapStateToProps = () => ({})

const enhancer = compose(
  withStyles(styles),
  connect(mapStateToProps, { registerU2FDevice: registerU2FDeviceAction }),
)

export default enhancer(Dashboard)
