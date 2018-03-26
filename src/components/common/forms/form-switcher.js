// @flow
import * as React from 'react'
import Paper from 'material-ui/Paper'
import { withStyles } from 'material-ui/styles'

import ResourcesForm from './resources'
import VersionsForm from './versions'

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
    case 'toplevel':
      comp = <ResourcesForm {...props} />
      break
    case 'version':
      comp = <VersionsForm {...props} />
      break
    default:
      break
  }

  return !!comp && <Paper className={classes.paper}>{comp}</Paper>
}

export default withStyles(styles)(FormSwitcher)
