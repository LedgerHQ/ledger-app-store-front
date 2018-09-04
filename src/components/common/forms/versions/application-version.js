// @flow
import * as React from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import FormControl from '@material-ui/core/FormControl'
import Checkbox from '@material-ui/core/Checkbox'

import Form from '../../../utils/form'
import { cleanMerge } from '../../../../utils/merge'
import { makeEventObject } from '../../../../utils/object'

type Props = {
  applications: Object[],
  deviceVersions: Object[],
  finalFirmwareVersions: Object[],
  applicationVersions: Object[],
  icons: Object[],
  providers: Object[],
  initFields: Object,
  method: 'POST' | 'DELETE' | 'PUT',
  createResource: Function,
  success: boolean,
}

const baseFields = {
  app: '',
  name: '',
  description: '',
  display_name: '',
  notes: '',
  hash: '',
  perso: 'perso_11',
  icon: '',
  picture: '',
  firmware: '',
  firmware_key: '',
  delete: '',
  version: '',
  required_application_versions: [],
  delete_key: '',
  device_versions: [],
  se_firmware_final_versions: [],
  providers: [],
}

const ApplicationVersion = ({
  applications,
  finalFirmwareVersions,
  applicationVersions,
  deviceVersions,
  icons,
  createResource,
  providers,
  method,
  success,
  initFields,
}: Props): React.Node => {
  const init = cleanMerge(baseFields, initFields)
  return (
    <React.Fragment>
      <Form type="application_versions" initFields={init} method={method} success={success}>
        {({ onChange, onSelectChange, onSubmit, fields }) => (
          <form className="form" onSubmit={onSubmit(createResource)}>
            <TextField
              id="app"
              select
              required
              label="application"
              value={fields.app}
              onChange={evt => {
                const app = applications.find(obj => obj.id === evt.target.value)
                if (app) {
                  const appEvent = makeEventObject(evt, app.id)
                  const nameEvent = makeEventObject(evt, app.name)
                  const iconEvent = makeEventObject(evt, app.name.toLowerCase())
                  onSelectChange('app')(appEvent)
                  onChange('name')(nameEvent)
                  onChange('icon')(iconEvent)
                  onChange('display_name')(nameEvent)
                }
              }}
              className="input"
            >
              {applications.map(app => (
                <MenuItem key={app.id} value={app.id}>
                  {app.name}
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
              id="version"
              label="version (M.m.p)"
              type="string"
              onChange={onChange('version')}
              value={fields.version}
              className="input"
              required
            />
            <TextField
              id="display_name"
              label="display name"
              type="string"
              onChange={onChange('display_name')}
              value={fields.display_name}
              className="input"
            />
            <TextField
              id="hash"
              label="hash"
              type="string"
              onChange={onChange('hash')}
              value={fields.hash}
              className="input"
            />
            <TextField
              id="perso"
              label="perso"
              type="string"
              onChange={onChange('perso')}
              value={fields.perso}
              className="input"
              required
            />
            <TextField
              id="firmware"
              label="firmware"
              type="string"
              onChange={evt => {
                const key = makeEventObject(evt, `${evt.target.value}_key`)
                const def = makeEventObject(evt, `${evt.target.value}`)
                const del = makeEventObject(evt, `${evt.target.value}_del`)
                const delKey = makeEventObject(evt, `${evt.target.value}_del_key`)
                onChange('firmware')(def)
                onChange('delete')(del)
                onChange('firmware_key')(key)
                onChange('delete_key')(delKey)
              }}
              value={fields.firmware}
              className="input"
              required
            />
            <TextField
              id="firmware_key"
              label="firmware key"
              type="string"
              onChange={onChange('firmware_key')}
              value={fields.firmware_key}
              className="input"
              required
            />
            <TextField
              id="delete"
              label="delete"
              type="string"
              onChange={onChange('delete')}
              value={fields.delete}
              className="input"
              required
            />
            <TextField
              id="delete_key"
              label="delete key"
              type="string"
              onChange={onChange('delete_key')}
              value={fields.delete_key}
              className="input"
              required
            />
            <TextField
              id="icon"
              label="icon"
              type="string"
              onChange={onChange('icon')}
              value={fields.icon}
              className="input"
            />
            <FormControl className="input">
              <InputLabel htmlFor="picture">picture</InputLabel>
              <Select
                input={<Input id="picture" />}
                onChange={onSelectChange('picture')}
                value={fields.picture}
                renderValue={selected =>
                  icons
                    .filter(icon => icon.id === selected)
                    .map(icon => icon.name)
                    .join(', ')
                }
              >
                {icons.map(icon => (
                  <MenuItem key={`${icon.name}_${icon.id}`} value={icon.id}>
                    <Checkbox checked={fields.picture === icon.id} />
                    <img src={icon.file} alt={icon.name} style={{ maxHeight: 30 }} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
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
                  <MenuItem key={`${provider.name}_${provider.id}`} value={provider.id}>
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
                    .filter(version => selected.includes(version.id))
                    .map(el => el.name)
                    .join(', ')
                }
              >
                {deviceVersions.map(version => (
                  <MenuItem key={`${version.name}_${version.id}`} value={version.id}>
                    <Checkbox checked={fields.device_versions.indexOf(version.id) > -1} />
                    {`${version.topName} - ${version.name}`}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl className="input">
              <InputLabel htmlFor="se_firmware_final_versions">se firmwares version(s)</InputLabel>
              <Select
                multiple
                input={<Input id="se_firmware_final_versions" />}
                onChange={onSelectChange('se_firmware_final_versions')}
                value={fields.se_firmware_final_versions}
                renderValue={selected =>
                  finalFirmwareVersions
                    .filter(version => selected.includes(version.id))
                    .map(el => el.name)
                    .join(', ')
                }
              >
                {finalFirmwareVersions.map(version => (
                  <MenuItem key={`${version.name}_${version.id}`} value={version.id}>
                    <Checkbox
                      checked={fields.se_firmware_final_versions.indexOf(version.id) > -1}
                    />
                    {`${version.topName} - ${version.name}`}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl className="input">
              <InputLabel htmlFor="required_application_versions">
                required application version(s)
              </InputLabel>
              <Select
                disabled={fields.se_firmware_final_versions.length < 1}
                multiple
                input={<Input id="required_application_versions" />}
                onChange={onSelectChange('required_application_versions')}
                value={fields.required_application_versions}
                renderValue={selected =>
                  applicationVersions
                    .filter(version => selected.includes(version.id))
                    .map(el => el.name)
                    .join(', ')
                }
              >
                {applicationVersions
                  .filter(
                    version =>
                      finalFirmwareVersions.filter(
                        se =>
                          version.se_firmware_final_versions.includes(se.id) &&
                          fields.se_firmware_final_versions.includes(se.id),
                      ).length > 0,
                  )
                  .map(version => (
                    <MenuItem key={`${version.name}_${version.id}`} value={version.id}>
                      <Checkbox
                        checked={fields.required_application_versions.indexOf(version.id) > -1}
                      />
                      {`${version.name} - ${version.version}`}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
            <TextField
              id="description"
              label="description"
              type="string"
              onChange={onChange('description')}
              value={fields.description}
              className="input full"
              multiline
            />
            <TextField
              id="notes"
              label="notes"
              type="string"
              onChange={onChange('notes')}
              value={fields.notes}
              className="input full"
              multiline
            />
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

        .form :global(.full) {
          width: 100%;
        }

        .label {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: 20px !important;
        }

        .file {
          display: none !important;
        }

        .form .submit {
          padding: 12px 0;
        }
      `}</style>
    </React.Fragment>
  )
}

export default ApplicationVersion
