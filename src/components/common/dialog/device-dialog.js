// @flow
import * as React from 'react'
import Dialog, { DialogTitle } from 'material-ui/Dialog'
import Typography from 'material-ui/Typography'
import { CircularProgress } from 'material-ui/Progress'
import { withStyles } from 'material-ui/styles'

type Props = {
  open: boolean,
  success: boolean,
  error: boolean,
  classes: Object,
  closeDialog: Function,
}

const styles = theme => ({
  dialog: {
    paddingBottom: theme.spacing.unit,
  },
})

const renderTitle = (success, error) => {
  if (success && !error) {
    return 'Device Added'
  } else if (error) {
    return 'Error adding device'
  }

  return 'Plug your device'
}

const DeviceDialog = ({ open, classes, closeDialog, success, error }: Props): React.Node => (
  <Dialog className={classes.dialog} open={open} onClose={closeDialog}>
    <DialogTitle>Add New Device</DialogTitle>
    <Typography variant="subheading" align="center">
      {renderTitle(success, error)}
    </Typography>
    <div className="center">
      {!success && !error && <CircularProgress size={80} />}
      {success && !error && <CircularProgress size={80} variant="determinate" value={100} />}
      {error && <CircularProgress size={80} variant="determinate" value={100} />}
    </div>

    <style jsx>{`
      .center {
        padding: 8px;
        text-align: center;
      }
    `}</style>
  </Dialog>
)

export default withStyles(styles)(DeviceDialog)
