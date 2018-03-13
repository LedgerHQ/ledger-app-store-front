// @flow
import * as React from 'react'
import Dialog, { DialogTitle, DialogContent, DialogContentText } from 'material-ui/Dialog'
import { CircularProgress } from 'material-ui/Progress'
import { withStyles } from 'material-ui/styles'

type Props = {
  open: boolean,
  success: boolean,
  error: boolean,
  classes: Object,
  closeDialog: Function,
  subtitle: string,
  title: string,
}

const styles = theme => ({
  dialogText: {
    textAlign: 'center',
  },
  dialogContent: {
    padding: theme.spacing.unit,
  },
})

const DeviceDialog = ({
  open,
  classes,
  closeDialog,
  success,
  error,
  subtitle,
  title,
}: Props): React.Node => (
  <Dialog open={open} onClose={closeDialog}>
    <DialogTitle className={classes.dialogText}>{title}</DialogTitle>
    <DialogContent className={classes.dialogContent}>
      <DialogContentText className={classes.dialogText}>{subtitle}</DialogContentText>

      <div className="center">
        {!success && !error && <CircularProgress size={80} />}
        {success && !error && <CircularProgress size={80} variant="determinate" value={100} />}
        {error && (
          <CircularProgress size={80} variant="determinate" value={100} color="secondary" />
        )}
      </div>
    </DialogContent>

    <style jsx>{`
      .center {
        padding: 8px;
        text-align: center;
      }
    `}</style>
  </Dialog>
)

export default withStyles(styles)(DeviceDialog)
