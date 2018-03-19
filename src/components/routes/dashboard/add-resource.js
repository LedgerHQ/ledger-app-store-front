// @flow
import * as React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import TextField from 'material-ui/TextField'
import MenuItem from 'material-ui/Menu/MenuItem'
import { withStyles } from 'material-ui/styles'

import {
  resourcesApplicationsSelector,
  resourcesFirmwaresSelector,
  applicationsListSelector,
} from '../../../selectors/resources-selectors'
import FormSwitcher from '../../common/forms/form-switcher'

type Props = {
  applications: Object[],
  firmwares: Object[],
  appList: string[],
  classes: Object,
}

type State = {
  selected: string,
}

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

class AddResources extends React.Component<Props, State> {
  props: Props
  state: State

  state = {
    selected: '',
  }

  onChange = (evt: { target: { value: string } }): void => {
    this.setState(state => ({ ...state, selected: evt.target.value }))
  }

  render(): React.Node {
    const { classes, ...other } = this.props
    const { selected } = this.state

    return (
      <section>
        <TextField
          id="selected"
          select
          label="Resource Type"
          value={this.state.selected}
          onChange={this.onChange}
          className={classes.textField}
          SelectProps={{
            MenuProps: {
              className: classes.menu,
            },
          }}
        >
          <MenuItem value="firmware">Firmware</MenuItem>
          <MenuItem value="application">Application</MenuItem>
          <MenuItem value="app_version">Application Version</MenuItem>
        </TextField>
        <div className="form">
          <FormSwitcher selected={selected} {...other} />
        </div>

        <style jsx>{`
          .form {
            margin: 20px 0;
          }
        `}</style>
      </section>
    )
  }
}

const mapStateToProps = state => ({
  applications: resourcesApplicationsSelector(state),
  firmwares: resourcesFirmwaresSelector(state),
  appList: applicationsListSelector(state),
})

const enhancer = compose(withStyles(styles), connect(mapStateToProps))

export default enhancer(AddResources)
