// @flow
import * as React from 'react'
import { connect } from 'react-redux'
import Snackbar from '@material-ui/core/Snackbar'
import IconButton from '@material-ui/core/IconButton'

import CloseIcon from 'material-ui-icons/Close'
import {
  resourcesTypeSelector,
  resourcesErrorSelector,
} from '../../../selectors/resources-selectors'

type Props = {
  error: string,
  type: string,
  mode: 'creating' | 'updating' | 'deleting',
}

type State = {
  open: boolean,
  type: string,
}

class ErrorSnack extends React.Component<Props, State> {
  state = {
    open: false,
    type: '',
  }

  componentDidUpdate(prevProps: Props): void {
    const { error, type } = this.props
    const { open } = this.state
    const { error: prevError } = prevProps

    if (!!error && !prevError && error !== prevError && !open) {
      this.openSnack(type)
    }
  }

  openSnack = (type: string): void => this.setState(state => ({ ...state, open: true, type }))
  closeSnack = () => this.setState(state => ({ ...state, open: false, type: '' }))

  getType = () => this.state.type.split('_').join(' ')

  getProperDeterminer = () =>
    this.state.type.length > 0 &&
    ['a', 'e', 'i', 'o', 'u'].indexOf(this.state.type[0].toLowerCase()) > -1
      ? 'an'
      : 'a'

  render() {
    const { mode, error } = this.props
    return (
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={this.state.open && !!mode}
        autoHideDuration={6000}
        onClose={this.closeSnack}
        ContentProps={{ 'aria-describedby': 'message-id' }}
        message={
          <div>
            <span id="message-id">{`Error ${mode} ${this.getProperDeterminer()} ${this.getType()} resource`}</span>
            <p>{error}</p>
          </div>
        }
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
  error: resourcesErrorSelector(state),
  type: resourcesTypeSelector(state),
})

export default connect(mapStateToProps)(ErrorSnack)
