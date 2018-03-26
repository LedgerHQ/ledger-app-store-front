// @flow
import * as React from 'react'
import { connect } from 'react-redux'
import TextField from 'material-ui/TextField'
import MenuItem from 'material-ui/Menu/MenuItem'

import FormForeign from '../../../utils/form-foreign/form-foreign'
import { applicationsListSelector } from '../../../../selectors/resources-selectors'

type Props = {
  appList: string[],
}

const ApplicationVersionForm = ({ appList }: Props): React.Node => (
  <React.Fragment>
    <FormForeign>
      {({ onChange, onSelectChange, fields }) => (
        <div className="form">
          <TextField
            id="app"
            select
            label="application"
            value={fields.app || ''}
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
            value={fields.name || ''}
            className="input"
            required
          />
          <TextField
            id="icon"
            label="icon"
            type="string"
            onChange={onChange('icon')}
            value={fields.icon || ''}
            className="input"
          />
          <TextField
            id="notes"
            label="notes"
            type="string"
            onChange={onChange('notes')}
            value={fields.notes || ''}
            className="input"
          />
          <TextField
            id="hash"
            label="hash"
            type="string"
            onChange={onChange('hash')}
            value={fields.hash || ''}
            className="input"
          />
          <TextField
            id="bolos_version_min"
            label="bolos_version_min"
            type="string"
            onChange={onChange('bolos_version_min')}
            value={fields.bolos_version_min || ''}
            className="input"
          />
          <TextField
            id="bolos_version_max"
            label="bolos_version_max"
            type="string"
            onChange={onChange('bolos_version_max')}
            value={fields.bolos_version_max || ''}
            className="input"
          />
          <TextField
            id="perso"
            label="perso"
            type="string"
            onChange={onChange('perso')}
            value={fields.perso || ''}
            className="input"
          />
          <TextField
            id="target_id"
            label="target_id"
            type="string"
            onChange={onChange('target_id')}
            value={fields.target_id || ''}
            className="input"
          />
          <TextField
            id="firmware"
            label="firmware"
            type="string"
            onChange={onChange('firmware')}
            value={fields.firmware || ''}
            className="input"
          />
          <TextField
            id="firmware_key"
            label="firmware_key"
            type="string"
            onChange={onChange('firmware_key')}
            value={fields.firmware_key || ''}
            className="input"
          />
          <TextField
            id="delete_key"
            label="delete_key"
            type="string"
            onChange={onChange('delete_key')}
            value={fields.delete_key || ''}
            className="input"
          />
          <TextField
            id="delete"
            label="delete"
            type="string"
            onChange={onChange('delete')}
            value={fields.delete || ''}
            className="input"
          />
        </div>
      )}
    </FormForeign>

    <style jsx>{`
      .form :global(.input) {
        box-sizing: border-box;
        padding-right: 8px;
        margin-top: 12px;
        width: 50%;
      }
    `}</style>
  </React.Fragment>
)

const mapStateToProps = (state: Object): Object => ({
  appList: applicationsListSelector(state),
})

export default connect(mapStateToProps)(ApplicationVersionForm)
