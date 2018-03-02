// @flow
import * as React from 'react'
import Button from 'material-ui/Button'
import Tooltip from 'material-ui/Tooltip'
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table'
import Dialog, { DialogTitle } from 'material-ui/Dialog'
import Paper from 'material-ui/Paper'
import Typography from 'material-ui/Typography'
import { CircularProgress } from 'material-ui/Progress'
import { withStyles } from 'material-ui/styles'
import AddIcon from 'material-ui-icons/Add'

import Title from '../common/title'

type Props = {
  classes: Object,
  devices?: [],
}

type State = {
  open: boolean,
}

const styles = theme => ({
  dialog: {
    paddingBottom: theme.spacing.unit,
  },
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
  }

  toggleDialog = (bool: boolean): Function => (): void => {
    this.setState(state => ({
      ...state,
      open: bool,
    }))
  }

  render() {
    const { classes, devices } = this.props
    const { open } = this.state

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
                <TableCell> Name </TableCell> <TableCell number> Date Added </TableCell>
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
        <Dialog className={classes.dialog} open={open} onClose={this.toggleDialog(false)}>
          <DialogTitle>Add New Device</DialogTitle>
          <Typography variant="subheading" align="center">
            Plug your device
          </Typography>
          <div className="center">
            <CircularProgress />
          </div>
        </Dialog>
        <style jsx>{`
          .center {
            text-align: center;
          }
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

export default withStyles(styles)(Dashboard)
