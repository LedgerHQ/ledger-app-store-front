// @flow
import * as React from 'react'
import Paper from 'material-ui/Paper'
import { withStyles } from 'material-ui/styles'

import FirmwareVersionForm from './firmware-version'
import ApplicationForm from './application'
import ApplicationVersionForm from './application-version'

type Props = {
  selected: string,
  classes: Object,
}

const styles = (theme: Object): Object => ({
  paper: {
    padding: theme.spacing.unit * 3,
  },
})

const FormSwitcher = ({ selected, classes, ...props }: Props) => {
  let comp
  switch (selected) {
    case 'firmware':
      comp = <FirmwareVersionForm {...props} />
      break
    case 'application':
      comp = <ApplicationForm {...props} />
      break
    case 'app_version':
      // $FlowFixMe
      comp = <ApplicationVersionForm {...props} />
      break
    default:
      break
  }

  return !!comp && <Paper className={classes.paper}>{comp}</Paper>
}

export default withStyles(styles)(FormSwitcher)
