// @flow
import * as React from 'react'
import { connect } from 'react-redux'
import TextField from 'material-ui/TextField'
import MenuItem from 'material-ui/Menu/MenuItem'

import FormForeign from '../../../utils/form-foreign/form-foreign'
import { applicationsListSelector } from '../../../../selectors/resources-selectors'

type Props = {
  deviceList: string[],
}

const MCUVersionForm = ({ deviceList }: Props): React.Node => (
  <React.Fragment>
    <FormForeign>
      {({ onChange, onSelectChange, fields }) => (
        <div className="form">
          <TextField
            id="device"
            select
            label="Device"
            value={fields.device || ''}
            onChange={onSelectChange('device')}
            className="input"
          >
            {deviceList.map(app => (
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
            id="description"
            label="description"
            type="string"
            onChange={onChange('description')}
            value={fields.description || ''}
            className="input"
          />
          <TextField
            id="target_id"
            label="Target id"
            type="string"
            onChange={onChange('target_id')}
            value={fields.target_id || ''}
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
  deviceList: applicationsListSelector(state), // TODO: REPLACE WITH DEVICE LIST
})

export default connect(mapStateToProps)(MCUVersionForm)
