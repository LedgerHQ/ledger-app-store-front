// @flow
/* globals SyntheticEvent */
import * as React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import Button from 'material-ui/Button'
import Tooltip from 'material-ui/Tooltip'
import AddIcon from 'material-ui-icons/Add'
import { withStyles } from 'material-ui/styles'

import WithToggle from '../../utils/with-toggle'
import DeviceDialog from '../../common/dialog/device-dialog'
import { registerU2FDevice as registerU2FDeviceAction } from '../../../actions/device-actions'
import { deviceAllSuccessSelector, deviceErrorSelector } from '../../../selectors/device-selectors'

type Props = {
  classes: Object,
  success: boolean,
  error: string,
  registerU2FDevice: Function,
}

const styles = theme => ({
  fab: {
    margin: theme.spacing.unit * 2,
  },
})

class AddDevice extends React.Component<Props> {
  props: Props

  renderTitle = (): string => {
    const { success, error } = this.props

    if (success && !error) {
      return 'Device Added'
    } else if (error) {
      return error
    }

    return 'Plug your device'
  }

  onClickOpen = (callback: Function): Function => (
    evt: SyntheticEvent<HTMLButtonElement>,
  ): void => {
    const { registerU2FDevice } = this.props
    evt.preventDefault()
    registerU2FDevice()
    callback()
  }

  render(): React.Node {
    const { classes, success, error } = this.props
    return (
      <React.Fragment>
        <WithToggle>
          {(open, toggle) => (
            <React.Fragment>
              <div className="fab">
                <Tooltip title="add new device" className={classes.fab} placement="top">
                  <Button variant="fab" color="secondary" onClick={this.onClickOpen(toggle(true))}>
                    <AddIcon />
                  </Button>
                </Tooltip>
              </div>

              <DeviceDialog
                error={error}
                success={success}
                open={open}
                closeDialog={toggle(false)}
                title="Add New Device"
                subtitle={this.renderTitle()}
              />
            </React.Fragment>
          )}
        </WithToggle>

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

const mapStateToProps = (state: Object): Object => ({
  success: deviceAllSuccessSelector(state),
  error: deviceErrorSelector(state),
})

const enhancer = compose(
  withStyles(styles),
  connect(mapStateToProps, { registerU2FDevice: registerU2FDeviceAction }),
)

export default enhancer(AddDevice)
