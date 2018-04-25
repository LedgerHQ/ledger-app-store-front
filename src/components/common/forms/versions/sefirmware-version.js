// @flow
import * as React from 'react'
import Button from 'material-ui/Button'
import TextField from 'material-ui/TextField'
import MenuItem from 'material-ui/Menu/MenuItem'
import Select from 'material-ui/Select'
import Input, { InputLabel } from 'material-ui/Input'
import { FormControl } from 'material-ui/Form'
import Checkbox from 'material-ui/Checkbox'

import Form from '../../../utils/form'

type Props = {
  firmwares: Object[],
  firmwareVersions: Object[],
  deviceVersions: Object[],
  providers: Object[],
  initFields?: Object,
  method: 'POST' | 'DELETE' | 'PUT',
  createResource: Function,
}

const SeFirmwareVersion = ({
  firmwares,
  firmwareVersions,
  deviceVersions,
  createResource,
  providers,
  initFields,
  method,
}: Props): React.Node => (
  <React.Fragment>
    <Form type="firmware_versions" initFields={initFields || {}} method={method}>
      {({ onChange, onSelectChange, onSubmit, fields }) => (
        <form className="form" onSubmit={onSubmit(createResource)}>
          <TextField
            id="se_firmware"
            select
            required
            label="se firmware"
            value={fields.se_firmware}
            onChange={onSelectChange('se_firmware')}
            className="input"
          >
            {firmwares.map(firmware => (
              <MenuItem key={firmware.id} value={firmware.id}>
                {firmware.name}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            id="name"
            label="name"
            type="string"
            onChange={onChange('name')}
            value={fields.name}
            className="input"
            required
          />
          <TextField
            id="description"
            label="description"
            type="string"
            onChange={onChange('description')}
            value={fields.description}
            className="input"
          />
          <TextField
            id="display_name"
            label="display_name"
            type="string"
            onChange={onChange('display_name')}
            value={fields.display_name}
            className="input"
          />
          <TextField
            id="notes"
            label="notes"
            type="string"
            onChange={onChange('notes')}
            value={fields.notes}
            className="input"
          />
          <TextField
            id="final_perso"
            label="final perso"
            type="string"
            onChange={onChange('final_perso')}
            value={fields.final_perso}
            className="input"
          />
          <TextField
            id="final_target_id"
            label="final target id"
            type="string"
            onChange={onChange('final_target_id')}
            value={fields.final_target_id}
            className="input"
          />
          <TextField
            id="final_firmware"
            label="final firmware"
            type="string"
            onChange={onChange('final_firmware')}
            value={fields.final_firmware}
            className="input"
          />
          <TextField
            id="final_firmware_key"
            label="final firmware key"
            type="string"
            onChange={onChange('final_firmware_key')}
            value={fields.final_firmware_key}
            className="input"
          />
          <TextField
            id="final_hash"
            label="final hash"
            type="string"
            onChange={onChange('final_hash')}
            value={fields.final_hash}
            className="input"
          />
          <TextField
            id="osu_perso"
            label="osu perso"
            type="string"
            onChange={onChange('osu_perso')}
            value={fields.osu_perso}
            className="input"
          />
          <TextField
            id="osu_target_id"
            label="osu target id"
            type="string"
            onChange={onChange('osu_target_id')}
            value={fields.osu_target_id}
            className="input"
          />
          <TextField
            id="osu_firmware"
            label="osu firmware"
            type="string"
            onChange={onChange('osu_firmware')}
            value={fields.osu_firmware}
            className="input"
          />
          <TextField
            id="osu_firmware_key"
            label="osu firmware key"
            type="string"
            onChange={onChange('osu_firmware_key')}
            value={fields.osu_firmware_key}
            className="input"
          />
          <TextField
            id="osu_hash"
            label="osu hash"
            type="string"
            onChange={onChange('osu_hash')}
            value={fields.osu_hash}
            className="input"
          />
          <FormControl className="input">
            <InputLabel htmlFor="provider">provider(s)</InputLabel>
            <Select
              multiple
              input={<Input id="provider" />}
              onChange={onSelectChange('providers')}
              value={fields.providers}
              renderValue={selected =>
                providers
                  .filter(provider => selected.includes(provider.id))
                  .map(el => el.name)
                  .join(', ')
              }
            >
              {providers.map(provider => (
                <MenuItem key={provider.name} value={provider.id}>
                  <Checkbox checked={fields.providers.indexOf(provider.id) > -1} />
                  {provider.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl className="input">
            <InputLabel htmlFor="device_versions">device version(s)</InputLabel>
            <Select
              multiple
              input={<Input id="device_versions" />}
              onChange={onSelectChange('device_versions')}
              value={fields.device_versions}
              renderValue={selected =>
                deviceVersions
                  .filter(provider => selected.includes(provider.id))
                  .map(el => el.name)
                  .join(', ')
              }
            >
              {deviceVersions.map(version => (
                <MenuItem key={version.name} value={version.id}>
                  <Checkbox checked={fields.device_versions.indexOf(version.id) > -1} />
                  {`${version.topName} - ${version.name}`}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl className="input">
            <InputLabel htmlFor="previous_se_firmware_versions">se firmwares version(s)</InputLabel>
            <Select
              multiple
              input={<Input id="previous_se_firmware_versions" />}
              onChange={onSelectChange('previous_se_firmware_versions')}
              value={fields.previous_se_firmware_versions}
              renderValue={selected =>
                firmwareVersions
                  .filter(provider => selected.includes(provider.id))
                  .map(el => el.name)
                  .join(', ')
              }
            >
              {firmwareVersions.map(version => (
                <MenuItem key={version.name} value={version.id}>
                  <Checkbox
                    checked={fields.previous_se_firmware_versions.indexOf(version.id) > -1}
                  />
                  {`${version.topName} - ${version.name}`}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <div className="submit">
            <Button type="submit" size="large" variant="raised" color="secondary">
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

SeFirmwareVersion.defaultProps = {
  initFields: {
    se_firmware: '',
    name: '',
    description: '',
    display_name: '',
    notes: '',
    final_perso: '',
    final_target_id: '',
    final_firmware: '',
    final_firmware_key: '',
    final_hash: '',
    osu_perso: '',
    osu_target_id: '',
    osu_firmware: '',
    osu_firmware_key: '',
    osu_hash: '',
    device_versions: [],
    previous_se_firmware_versions: [],
    providers: [],
  },
}

export default SeFirmwareVersion
