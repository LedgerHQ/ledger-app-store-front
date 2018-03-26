// @flow
import * as React from 'react'
import { isEmpty, not } from 'ramda'
import TextField from 'material-ui/TextField'
import MenuItem from 'material-ui/Menu/MenuItem'
import Button from 'material-ui/Button'
import AddIcon from 'material-ui-icons/Add'
import { withStyles } from 'material-ui/styles'

import ExtraField from './extra-field'
import { capitalizeFirst } from '../../../utils/string'

type Props = {
  fieldState: Object,
  onSelectChange: Function,
  classes: Object,
  resources: {
    [string]: Object[],
  },
}

type State = {
  fields: Object[],
  type: string,
}

class ForeignKeyInput extends React.Component<Props, State> {
  props: Props
  state: State

  state = {
    fields: [],
    type: '',
  }

  componentDidUpdate({ fieldState: prevFieldState }) {
    const { fieldState } = this.props
    if (isEmpty(fieldState) && not(isEmpty(prevFieldState))) {
      this.setState(state => ({ ...state, fields: [] })) //eslint-disable-line
    }
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

  renderField = ({ type }: Object, idx: number): React.Node => {
    const { onSelectChange, fieldState, resources } = this.props
    const resource = resources[type]

    return resource ? (
      <div key={`${type}-${idx}`}>
        <ExtraField
          type={type}
          resource={resource}
          fields={fieldState}
          onSelectChange={onSelectChange}
          idx={idx}
        />
      </div>
    ) : null
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
          {Object.keys(resources).map((key: string): React.Node => (
            <MenuItem key={key} value={key}>
              {capitalizeFirst(key)}
            </MenuItem>
          ))}
        </TextField>
        <Button variant="fab" color="secondary" mini aria-label="add" onClick={this.addNewField}>
          <AddIcon />
        </Button>
        <div>{fields.map(this.renderField)}</div>
      </React.Fragment>
    )
  }
}

const styles = (): Object => ({
  textField: {
    width: '50%',
    marginRight: 20,
    marginTop: 20,
  },
  menu: {
    width: 200,
  },
})

export default withStyles(styles)(ForeignKeyInput)
