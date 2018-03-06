// @flow
import * as React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import Button from 'material-ui/Button'
import Tooltip from 'material-ui/Tooltip'
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table'
import Paper from 'material-ui/Paper'
import { withStyles } from 'material-ui/styles'
import AddIcon from 'material-ui-icons/Add'

import Title from '../common/title'
import DeviceDialog from '../common/dialog/device-dialog'
import { registerU2FDevice as registerU2FDeviceAction } from '../../actions/deviceActions'

type Props = {
  classes: Object,
  devices?: [],
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

class Dashboard extends React.Component<Props, State> {
  props: Props
  state: State

  static defaultProps = {
    devices: [],
  }

  state = {
    open: false,
    success: false,
    error: false,
  }

  componentDidUpdate(prevProps, { open: prevOpen, success: prevSuccess }) {
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

  invokeChallenge = async () => {
    // const req = await fetch('challenge/api')
    // const json = await
  }

  toggleDialog = (bool: boolean): Function => (): void => {
    this.setState(state => ({
      ...state,
      open: bool,
      success: bool ? state.success : false,
    }))
  }

  render(): React.Node {
    const { classes, devices } = this.props
    const { open, success, error } = this.state

    return (
      <React.Fragment>
        <Title> Dashboard </Title>
        <div className="fab">
          <Tooltip title="add new device" className={classes.fab} placement="top">
            <Button variant="fab" color="secondary" onClick={this.toggleDialog(true)}>
              <AddIcon />
            </Button>
          </Tooltip>
        </div>
        <Paper className={classes.paper}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell numeric>Date Added</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {devices &&
                devices.map(device => (
                  <React.Fragment>
                    <TableCell> {device.name} </TableCell>
                    <TableCell> {device.dateAdded} </TableCell>
                  </React.Fragment>
                ))}
            </TableBody>
          </Table>
        </Paper>

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
