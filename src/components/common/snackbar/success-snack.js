// @flow
import * as React from 'react'
import { connect } from 'react-redux'
import Snackbar from '@material-ui/core/Snackbar'
import IconButton from '@material-ui/core/IconButton'

import CloseIcon from 'material-ui-icons/Close'
import {
  resourcesSuccessSelector,
  resourcesTypeSelector,
} from '../../../selectors/resources-selectors'

type Props = {
  success: boolean,
  type: string,
  mode: 'created' | 'deleted' | 'updated',
}

type State = {
  open: boolean,
  type: string,
}

class SuccessSnack extends React.Component<Props, State> {
  state = {
    open: false,
    type: '',
  }

  componentDidUpdate(prevProps: Props): void {
    const { success, type } = this.props
    const { open } = this.state
    const { success: prevSuccess } = prevProps

    if (success && !prevSuccess && !open) {
      this.openSnack(type)
    }
  }

  openSnack = (type: string): void => this.setState(state => ({ ...state, open: true, type }))
  closeSnack = () => this.setState(state => ({ ...state, open: false, type: '' }))

  getType = () => this.state.type.split('_').join(' ')

  render() {
    const { mode } = this.props
    return (
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={this.state.open && !!mode}
        autoHideDuration={6000}
        onClose={this.closeSnack}
        ContentProps={{
          'aria-describedby': 'message-id',
        }}
        message={<span id="message-id">{`Successfully ${mode} ${this.getType()} resource`}</span>}
        action={[
          <IconButton key="close" aria-label="Close" color="inherit" onClick={this.closeSnack}>
            <CloseIcon />
          </IconButton>,
        ]}
      />
    )
  }
}

const mapStateToProps = (state: Object): Object => ({
  success: resourcesSuccessSelector(state),
  type: resourcesTypeSelector(state),
})

export default connect(mapStateToProps)(SuccessSnack)
