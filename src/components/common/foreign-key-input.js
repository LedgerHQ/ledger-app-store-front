// @flow
/* eslint react/no-multi-comp: 0 */
import * as React from 'react'
import TextField from 'material-ui/TextField'
import MenuItem from 'material-ui/Menu/MenuItem'
import Button from 'material-ui/Button'
import AddIcon from 'material-ui-icons/Add'
import { withStyles } from 'material-ui/styles'

type AppInputProps = {
  onSelectChange: Function,
  selectState: Object,
  appList: string[],
  applications: Object[],
  idx: number,
}
type AppInputState = {
  selected: string,
}

class AppInput extends React.Component<AppInputProps, AppInputState> {
  props: AppInputProps
  state: AppInputState

  state = {
    selected: '',
  }

  onChange = (evt: Object): void => {
    this.setState(state => ({ ...state, selected: evt.target.value }))
  }

  render() {
    const { appList, applications, onSelectChange, selectState, idx } = this.props
    const { selected } = this.state

    const found = applications.find(app => app.name === selected)
    let versions = []
    if (found) {
      versions = found.app_version || []
    }

    return (
      <div key={`application-${idx}`}>
        <TextField
          id={`appList-${idx}`}
          select
          label="Required Application"
          value={selected}
          onChange={this.onChange}
          className="input"
        >
          {appList.map(app => (
            <MenuItem key={app} value={app}>
              {app}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          id={`application-${idx}`}
          select
          label="Application Version"
          value={selectState[`required-application-${idx}`] || ''}
          onChange={onSelectChange(`required-application-${idx}`, true)}
          className="input"
        >
          {versions.map(({ name: version, id }) => (
            <MenuItem key={id} value={`${selected}-${version}`}>
              {version}
            </MenuItem>
          ))}
        </TextField>
      </div>
    )
  }
}

/**
 * TODO
 * Change applications and appList and firmwares and
 * add a resources props with a topLevel list to define what to load
 */

type SimpleResource = {
  name: string,
  label: string,
  data: Object[],
}

type ListResource = SimpleResource & { list: string[] }

type Props = {
  selectState: Object,
  onSelectChange: Function,
  // applications: Object[],
  // firmwares: Object[],
  // appList: string[],
  classes: Object,
  resources: Array<ListResource>,
}

type State = {
  fields: Object[],
  type: string,
}

type InputType = {
  type: 'application' | 'firmware',
}

class ForeignKeyInput extends React.Component<Props, State> {
  props: Props
  state: State

  state = {
    fields: [],
    type: '',
  }

  addNewField = (): void => {
    const { type } = this.state
    if (type) {
      this.setState(state => ({ ...state, type: '', fields: state.fields.concat({ type }) }))
    }
  }

  onTypeChange = (evt: Object): void => {
    this.setState(state => ({ ...state, type: evt.target.value }))
  }

  renderFirmwareInput = (idx: number): React.Node => {
    const { resources, onSelectChange, selectState } = this.props

    const firmwares: SimpleResource | typeof undefined = resources.find(
      (resource: SimpleResource): boolean => resource.name === 'firmwares',
    )

    return (
      <div key={`firmware-${idx}`}>
        <TextField
          id={`firmware-${idx}`}
          select
          label="Required Firmware"
          value={selectState[`required-firmware-${idx}`] || ''}
          onChange={onSelectChange(`required-firmware-${idx}`, true)}
          className="input"
        >
          {firmwares &&
            firmwares.data.map(({ name, id }) => (
              <MenuItem key={id} value={name}>
                {name}
              </MenuItem>
            ))}
        </TextField>
      </div>
    )
  }

  renderAppInput = (idx: number): React.Node => {
    const { onSelectChange, selectState, resources } = this.props

    const applications: ListResource | typeof undefined = resources.find(
      (resource: ListResource): boolean => resource.name === 'applications',
    )

    return applications ? (
      <AppInput
        key={`app-${idx}`}
        appList={applications.list}
        applications={applications.data}
        selectState={selectState}
        onSelectChange={onSelectChange}
        idx={idx}
      />
    ) : null
  }

  renderInput = (input: InputType, idx: number): React.Node => {
    if (input.type === 'firmwares') {
      return this.renderFirmwareInput(idx)
    }

    if (input.type === 'applications') {
      return this.renderAppInput(idx)
    }

    return null
  }

  render(): React.Node {
    const { classes, resources } = this.props
    const { type, fields } = this.state

    return (
      <React.Fragment>
        <TextField
          id="type"
          select
          label="Foreign Key Type"
          value={type}
          onChange={this.onTypeChange}
          className={classes.textField}
          SelectProps={{
            MenuProps: {
              className: classes.menu,
            },
          }}
        >
          {resources.map(({ name, label }) => (
            <MenuItem key={name} value={name}>
              {label}
            </MenuItem>
          ))}
        </TextField>
        <Button variant="fab" color="secondary" mini aria-label="add" onClick={this.addNewField}>
          <AddIcon />
        </Button>
        <div className="extras">{fields.map(this.renderInput)}</div>
      </React.Fragment>
    )
  }
}

const styles = (): Object => ({
  textField: {
    width: 200,
    marginRight: 20,
    marginTop: 20,
  },
  menu: {
    width: 200,
  },
})

export default withStyles(styles)(ForeignKeyInput)
