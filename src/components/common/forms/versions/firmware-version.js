// @flow
import * as React from 'react'
import TextField from 'material-ui/TextField'
import Button from 'material-ui/Button'

import Form from '../../../utils/form'

const FirmwareVersionForm = (): React.Node => (
  <React.Fragment>
    <Form>
      {({ onChange, onSubmit, fields }) => (
        <form onSubmit={onSubmit} className="form">
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
            id="notes"
            label="notes"
            type="string"
            onChange={onChange('notes')}
            value={fields.notes || ''}
            className="input"
          />
          <TextField
            id="final_perso"
            label="final_perso"
            type="string"
            onChange={onChange('final_perso')}
            value={fields.final_perso || ''}
            className="input"
          />
          <TextField
            id="final_target_id"
            label="final_target_id"
            type="string"
            onChange={onChange('final_target_id')}
            value={fields.final_target_id || ''}
            className="input"
          />
          <TextField
            id="final_firmware"
            label="final_firmware"
            type="string"
            onChange={onChange('final_firmware')}
            value={fields.final_firmware || ''}
            className="input"
          />
          <TextField
            id="final_firmware_key"
            label="final_firmware_key"
            type="string"
            onChange={onChange('final_firmware_key')}
            value={fields.final_firmware_key || ''}
            className="input"
          />
          <TextField
            id="final_hash"
            label="final_hash"
            type="string"
            onChange={onChange('final_hash')}
            value={fields.final_hash || ''}
            className="input"
          />
          <TextField
            id="osu_perso"
            label="osu_perso"
            type="string"
            onChange={onChange('osu_perso')}
            value={fields.osu_perso || ''}
            className="input"
          />
          <TextField
            id="osu_target_id"
            label="osu_target_id"
            type="string"
            onChange={onChange('osu_target_id')}
            value={fields.osu_target_id || ''}
            className="input"
          />
          <TextField
            id="osu_firmware"
            label="osu_firmware"
            type="string"
            onChange={onChange('osu_firmware')}
            value={fields.osu_firmware || ''}
            className="input"
          />
          <TextField
            id="osu_firmware_key"
            label="osu_firmware_key"
            type="string"
            onChange={onChange('osu_firmware_key')}
            value={fields.osu_firmware_key || ''}
            className="input"
          />
          <TextField
            id="osu_hash"
            label="osu_hash"
            type="string"
            onChange={onChange('osu_hash')}
            value={fields.osu_hash || ''}
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
