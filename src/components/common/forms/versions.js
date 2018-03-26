// @flow
import * as React from 'react'
import TextField from 'material-ui/TextField'
import MenuItem from 'material-ui/Menu/MenuItem'
import { withStyles } from 'material-ui/styles'

import ApplicationVersion from './versions/application-version'
import FirmwareVersion from './versions/firmware-version'
import MCUVersion from './versions/mcu-version'
import DeviceVersion from './versions/device-version'

type Props = {
  topLevel?: Array<{ name: string, label: string }>,
  classes: Object,
}

type State = {
  selected: string,
}

const topLevelBase = [
  { name: 'sefirmware', label: 'SeFirmware' },
  { name: 'mcu', label: 'MCU' },
  { name: 'application', label: 'Application' },
  { name: 'device', label: 'Device' },
  // { name: 'bootloader', label: 'Bootloader' },
]

const styles = (theme: Object): Object => ({
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  menu: {
    width: 200,
  },
})

class Versions extends React.Component<Props, State> {
  props: Props
  state: State

  static defaultProps = {
    topLevel: topLevelBase,
  }

  state = {
    selected: '',
  }

  onChange = (evt: { target: { value: string } }): void =>
    this.setState(state => ({ ...state, selected: evt.target.value }))

  renderForm = (selected: string): React.Node => {
    switch (selected) {
      case 'application':
        return <ApplicationVersion />
      case 'sefirmware':
        return <FirmwareVersion />
      case 'mcu':
        return <MCUVersion />
      case 'device':
        return <DeviceVersion />
      default:
        return null
    }
  }

  render(): React.Node {
    const { classes, topLevel } = this.props
    const { selected } = this.state
    return (
      <React.Fragment>
        <TextField
          id="selected"
          select
          label="Resource Type"
          value={selected}
          onChange={this.onChange}
          className={classes.textField}
          SelectProps={{
            MenuProps: {
              className: classes.menu,
            },
          }}
        >
          {/* $FlowFixMe */}
          {topLevel.map(({ name, label }) => (
            <MenuItem key={name} value={name}>
              {label}
            </MenuItem>
          ))}
        </TextField>
        {this.renderForm(selected)}
      </React.Fragment>
    )
  }
}

export default withStyles(styles)(Versions)
