// @flow
import * as React from 'react'
import TextField from 'material-ui/TextField'
import Button from 'material-ui/Button'

import Form from '../../utils/form'

const FirmwareVersionForm = (): React.Node => (
  <React.Fragment>
    <Form>
      {({ onChange, onSubmit, fieldState }) => (
        <form onSubmit={onSubmit} className="form">
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
            id="notes"
            label="notes"
            type="string"
            onChange={onChange('notes')}
            value={fieldState.notes || ''}
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
            id="final_perso"
            label="final_perso"
            type="string"
            onChange={onChange('final_perso')}
            value={fieldState.final_perso || ''}
            className="input"
          />
          <TextField
            id="final_target_id"
            label="final_target_id"
            type="string"
            onChange={onChange('final_target_id')}
            value={fieldState.final_target_id || ''}
            className="input"
          />
          <TextField
            id="final_firmware"
            label="final_firmware"
            type="string"
            onChange={onChange('final_firmware')}
            value={fieldState.final_firmware || ''}
            className="input"
          />
          <TextField
            id="final_firmware_key"
            label="final_firmware_key"
            type="string"
            onChange={onChange('final_firmware_key')}
            value={fieldState.final_firmware_key || ''}
            className="input"
          />
          <TextField
            id="final_hash"
            label="final_hash"
            type="string"
            onChange={onChange('final_hash')}
            value={fieldState.final_hash || ''}
            className="input"
          />
          <TextField
            id="osu_perso"
            label="osu_perso"
            type="string"
            onChange={onChange('osu_perso')}
            value={fieldState.osu_perso || ''}
            className="input"
          />
          <TextField
            id="osu_target_id"
            label="osu_target_id"
            type="string"
            onChange={onChange('osu_target_id')}
            value={fieldState.osu_target_id || ''}
            className="input"
          />
          <TextField
            id="osu_firmware"
            label="osu_firmware"
            type="string"
            onChange={onChange('osu_firmware')}
            value={fieldState.osu_firmware || ''}
            className="input"
          />
          <TextField
            id="osu_firmware_key"
            label="osu_firmware_key"
            type="string"
            onChange={onChange('osu_firmware_key')}
            value={fieldState.osu_firmware_key || ''}
            className="input"
          />
          <TextField
            id="osu_hash"
            label="osu_hash"
            type="string"
            onChange={onChange('osu_hash')}
            value={fieldState.osu_hash || ''}
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

export default FirmwareVersionForm
