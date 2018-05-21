// @flow
import * as React from 'react'
import Button from '@material-ui/core/Button'
import Slide from '@material-ui/core/Slide'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'

import { capitalize } from '../../../utils/string'

type Props = {
  open: boolean,
  resource?: {
    id: number | string,
    name: string,
    [string]: any,
  },
  type: string,
  closeAction: Function,
  deleteAction: Function,
}

const Transition = props => <Slide direction="up" {...props} />

const DeleteDialog = ({ open, closeAction, resource, type, deleteAction }: Props): React.Node => (
  <Dialog open={open} TransitionComponent={Transition} onClose={closeAction}>
    <DialogTitle>DELETE {resource && resource.name && capitalize(resource.name)}</DialogTitle>
    <DialogContent>
      <DialogContentText>
        You are about to delete the resource{' '}
        {resource && resource.name && capitalize(resource.name)} of type {capitalize(type)}
        <br />
        {!type.endsWith('_versions') &&
        (type !== 'providers' && type !== 'publishers' && type !== 'categories') ? (
          <span>
            Doing so will delete of versions attached to this top level resource
            <br />
          </span>
        ) : null}
        Are you sure you want to procede ?
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={closeAction} color="secondary">
        Cancel
      </Button>
      <Button color="primary" onClick={resource && resource.id ? deleteAction(resource.id) : null}>
        Delete
      </Button>
    </DialogActions>
  </Dialog>
)

DeleteDialog.defaultProps = {
  resource: {
    name: '',
    id: '',
  },
}

export default DeleteDialog
