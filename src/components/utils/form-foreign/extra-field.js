// @flow
/* eslint react/no-did-mount-set-state: 0 */
import * as React from 'react'
import TextField from 'material-ui/TextField'
import MenuItem from 'material-ui/Menu/MenuItem'
import { withStyles } from 'material-ui/styles'

import { capitalizeFirst } from '../../../utils/string'

type Props = {
  onSelectChange: Function,
  type: string,
  fields: Object,
  resource: Object[],
  idx: number,
  classes: Object,
}
type State = {
  selected: string,
  list: string[],
}

class ExtraField extends React.Component<Props, State> {
  props: Props
  state: State

  state = {
    selected: '',
    list: [],
  }

  componentDidMount() {
    const { resource } = this.props
    const list = resource.map(app => app.name)
    this.setState(state => ({ ...state, list }))
  }

  onChange = (evt: Object): void => {
    this.setState(state => ({ ...state, selected: evt.target.value }))
  }

  render() {
    const { type, resource, onSelectChange, fields, idx, classes } = this.props
    const { selected, list } = this.state

    const found = resource.find(app => app.name === selected)
    let versions = []

    if (found) {
      versions = type === 'applications' ? found.app_version : found[`${type}_version`]
    }

    return (
      <React.Fragment>
        <TextField
          id={`${type}-${idx}`}
          select
          label={capitalizeFirst(type)}
          value={selected}
          onChange={this.onChange}
          className={classes.textField}
          SelectProps={{
            MenuProps: {
              className: classes.menu,
            },
          }}
        >
          {list.map(app => (
            <MenuItem key={app} value={app}>
              {app}
            </MenuItem>
          ))}
        </TextField>

        {found && (
          <TextField
            id={`${found.name}-${idx}`}
            select
            label={`${capitalizeFirst(type)} Version`}
            value={fields[`required-${type}-${idx}`] || ''}
            onChange={onSelectChange(`required-${type}-${idx}`, true)}
            className={classes.textField}
          >
            {versions.map(({ name: version, id }, index) => (
              <MenuItem key={id || index} value={`${selected}-${version}`}>
                {version}
              </MenuItem>
            ))}
          </TextField>
        )}
      </React.Fragment>
    )
  }
}

const styles = (): Object => ({
  textField: {
    width: 'calc(50% - 20px)',
    marginRight: 20,
    marginTop: 20,
  },
  menu: {
    width: 200,
  },
})

export default withStyles(styles)(ExtraField)
