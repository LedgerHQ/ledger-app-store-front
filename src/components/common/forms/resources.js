// @flow
import * as React from 'react'
import TextField from 'material-ui/TextField'
import Button from 'material-ui/Button'
import MenuItem from 'material-ui/Menu/MenuItem'

import Form from '../../utils/form'

type TopLevel = {
  name: string,
  label: string,
}

type Props = {
  topLevel?: Array<TopLevel>,
}

const topLevelBase = [
  { name: 'sefirmware', label: 'SeFirmware' },
  { name: 'mcu', label: 'MCU' },
  { name: 'application', label: 'Application' },
  { name: 'device', label: 'Device' },
  { name: 'bootloader', label: 'Bootloader' },
]

const ResourcesForm = ({ topLevel = topLevelBase }: Props): React.Node => (
  <React.Fragment>
    <Form>
      {({ onChange, onSubmit, fields, onSelectChange }) => (
        <form onSubmit={onSubmit} className="form">
          <TextField
            id="type"
            label="Type"
            select
            value={fields.type || ''}
            onChange={onSelectChange('type')}
            className="input"
          >
            {topLevel.map(({ name, label }: TopLevel): React.Node => (
              <MenuItem key={name} value={name}>
                {label}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            id="name"
            label="name"
            type="string"
            onChange={onChange('name')}
            value={fields.name || ''}
            className="input"
            required
          />
          <TextField
            id="description"
            label="description"
            type="string"
            onChange={onChange('description')}
            value={fields.description || ''}
            className="input"
          />
          <div className="submit">
            <Button onClick={onSubmit} size="large" variant="raised" color="secondary">
              Submit
            </Button>
          </div>
        </form>
      )}
    </Form>

    <style jsx>{`
      .form :global(.input) {
        box-sizing: border-box;
        padding-right: 8px;
        margin-top: 12px;
        width: 50%;
      }

      .form .submit {
        padding: 12px 0;
      }
    `}</style>
  </React.Fragment>
)

ResourcesForm.defaultProps = {
  topLevel: topLevelBase,
}

export default ResourcesForm
