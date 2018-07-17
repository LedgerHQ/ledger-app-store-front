// @flow
import * as React from 'react'
import Paper from '@material-ui/core/Paper'
import { withStyles } from '@material-ui/core/styles'

import ResourcesForm from './toplevel/resources'
import ApplicationForm from './toplevel/application'
import ProviderForm from './toplevel/provider'
import IconForm from './toplevel/icon'
import ApplicationVersionForm from './versions/application-version'
import FinalFirmwareVersionForm from './versions/firmware-final-version'
import McuVersionForm from './versions/mcu-version'
import DeviceVersionForm from './versions/device-version'
import FirmwareOSUVersion from './versions/firmware-osu-version'

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
  finalFirmwareVersions: Object[],
  icons: Object[],
  mcu: Object[],
  mcuVersions: Object[],
  method?: 'POST' | 'DELETE' | 'PUT',
  createResource: Function,
  initFields?: Object,
  success: boolean,
  editMode: boolean,
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
    case 'firmware_final_versions':
      comp = <FinalFirmwareVersionForm {...props} />
      break
    case 'firmware_osu_versions':
      comp = <FirmwareOSUVersion {...props} />
      break
    case 'providers':
      comp = <ProviderForm {...props} />
      break
    case 'applications':
      comp = <ApplicationForm {...props} />
      break
    case 'icons':
      comp = <IconForm {...props} />
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
