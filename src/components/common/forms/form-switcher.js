// @flow
import * as React from 'react'
import Paper from 'material-ui/Paper'
import { withStyles } from 'material-ui/styles'

import ResourcesForm from './toplevel/resources'
import ApplicationForm from './toplevel/application'
import ProviderForm from './toplevel/provider'
import ApplicationVersionForm from './versions/application-version'
import SeFirmwareVersionForm from './versions/sefirmware-version'
import McuVersionForm from './versions/mcu-version'
import DeviceVersionForm from './versions/device-version'

type Props = {
  selected: string,
  classes: Object,
  providers: Object[],
  categories: Object[],
  publishers: Object[],
  applications: Object[],
  applicationVersions: Object[],
  devices: Object[],
  deviceVersions: Object[],
  firmwares: Object[],
  firmwareVersions: Object[],
  mcu: Object[],
  mcuVersions: Object[],
  method?: 'POST' | 'DELETE' | 'PUT',
  createResource: Function,
  initFields?: Object,
  success: boolean,
}

const styles = (theme: Object): Object => ({
  paper: {
    padding: theme.spacing.unit * 3,
  },
})

const FormSwitcher = ({ selected, classes, ...props }: Props) => {
  let comp
  switch (selected) {
    case 'application_versions':
      comp = <ApplicationVersionForm {...props} />
      break
    case 'device_versions':
      comp = <DeviceVersionForm {...props} />
      break
    case 'mcu_versions':
      comp = <McuVersionForm {...props} />
      break
    case 'firmware_versions':
      comp = <SeFirmwareVersionForm {...props} />
      break
    case 'providers':
      comp = <ProviderForm {...props} />
      break
    case 'applications':
      comp = <ApplicationForm {...props} />
      break
    case '':
      comp = ''
      break
    default:
      comp = <ResourcesForm {...props} type={selected} />
  }

  return !!comp && <Paper className={classes.paper}>{comp}</Paper>
}

FormSwitcher.defaultProps = {
  method: 'POST',
}

export default withStyles(styles)(FormSwitcher)
