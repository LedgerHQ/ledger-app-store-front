// @flow
import * as React from 'react'
import TextField from 'material-ui/TextField'
import Button from 'material-ui/Button'
import MenuItem from 'material-ui/Menu/MenuItem'

import Form from '../../utils/form'
import ForeignKeyInput from '../foreign-key-input'

type Props = {
  applications: Object[],
  appList: string[],
  firmwares: Object[],
}

const ApplicationVersionForm = ({ applications, appList, firmwares }: Props): React.Node => (
  <React.Fragment>
    <Form>
      {({ onChange, onSubmit, onSelectChange, selectState, fieldState, extraState }) => (
        <form onSubmit={onSubmit} className="form">
          <TextField
            id="app"
            select
            label="application"
            value={selectState.app || ''}
            onChange={onSelectChange('app')}
            className="input"
          >
            {appList.map(app => (
              <MenuItem key={app} value={app}>
                {app}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            id="name"
            label="name"
            type="string"
            onChange={onChange('name')}
            value={fieldState.name || ''}
            className="input"
            required
          />
          <TextField
            id="icon"
            label="icon"
            type="string"
            onChange={onChange('icon')}
            value={fieldState.icon || ''}
            className="input"
          />
          <TextField
            id="notes"
            label="notes"
            type="string"
            onChange={onChange('notes')}
            value={fieldState.notes || ''}
            className="input"
          />
          <TextField
            id="hash"
            label="hash"
            type="string"
            onChange={onChange('hash')}
            value={fieldState.hash || ''}
            className="input"
          />
          <TextField
            id="bolos_version_min"
            label="bolos_version_min"
            type="string"
            onChange={onChange('bolos_version_min')}
            value={fieldState.bolos_version_min || ''}
            className="input"
          />
          <TextField
            id="bolos_version_max"
            label="bolos_version_max"
            type="string"
            onChange={onChange('bolos_version_max')}
            value={fieldState.bolos_version_max || ''}
            className="input"
          />
          <TextField
            id="perso"
            label="perso"
            type="string"
            onChange={onChange('perso')}
            value={fieldState.perso || ''}
            className="input"
          />
          <TextField
            id="target_id"
            label="target_id"
            type="string"
            onChange={onChange('target_id')}
            value={fieldState.target_id || ''}
            className="input"
          />
          <TextField
            id="firmware"
            label="firmware"
            type="string"
            onChange={onChange('firmware')}
            value={fieldState.firmware || ''}
            className="input"
          />
          <TextField
            id="firmware_key"
            label="firmware_key"
            type="string"
            onChange={onChange('firmware_key')}
            value={fieldState.firmware_key || ''}
            className="input"
          />
          <TextField
            id="delete_key"
            label="delete_key"
            type="string"
            onChange={onChange('delete_key')}
            value={fieldState.delete_key || ''}
            className="input"
          />
          <TextField
            id="delete"
            label="delete"
            type="string"
            onChange={onChange('delete')}
            value={fieldState.delete || ''}
            className="input"
          />
          <div>
            <ForeignKeyInput
              selectState={extraState}
              onSelectChange={onSelectChange}
              firmwares={firmwares}
              appList={appList}
              applications={applications}
            />
          </div>
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

export default ApplicationVersionForm
