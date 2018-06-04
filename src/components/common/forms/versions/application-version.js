// @flow
import * as React from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import Input, { InputLabel } from '@material-ui/core/Input'
import FormControl from '@material-ui/core/FormControl'
import Checkbox from '@material-ui/core/Checkbox'

import Form from '../../../utils/form'
import { cleanMerge } from '../../../../utils/merge'

type Props = {
  applications: Object[],
  deviceVersions: Object[],
  firmwareVersions: Object[],
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
  perso: '',
  icon: '',
  firmware: '',
  firmware_key: '',
  delete: '',
  delete_key: '',
  device_versions: [],
  se_firmware_versions: [],
  providers: [],
}

const ApplicationVersion = ({
  applications,
  firmwareVersions,
  deviceVersions,
  createResource,
  providers,
  method,
  initFields,
  success,
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
              onChange={onSelectChange('app')}
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
              id="notes"
              label="notes"
              type="string"
              onChange={onChange('notes')}
              value={fields.notes}
              className="input full"
              multiline
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
              id="icon"
              label="icon"
              type="string"
              onChange={onChange('icon')}
              value={fields.icon}
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
            />
            <TextField
              id="firmware"
              label="firmware"
              type="string"
              onChange={onChange('firmware')}
              value={fields.firmware}
              className="input"
            />
            <TextField
              id="firmware_key"
              label="firmware key"
              type="string"
              onChange={onChange('firmware_key')}
              value={fields.firmware_key}
              className="input"
            />
            <TextField
              id="delete"
              label="delete"
              type="string"
              onChange={onChange('delete')}
              value={fields.delete}
              className="input"
            />
            <TextField
              id="delete_key"
              label="delete key"
              type="string"
              onChange={onChange('delete_key')}
              value={fields.delete_key}
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
                    .filter(version => selected.includes(version.id))
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
              <InputLabel htmlFor="se_firmware_versions">se firmwares version(s)</InputLabel>
              <Select
                multiple
                input={<Input id="se_firmware_versions" />}
                onChange={onSelectChange('se_firmware_versions')}
                value={fields.se_firmware_versions}
                renderValue={selected =>
                  firmwareVersions
                    .filter(version => selected.includes(version.id))
                    .map(el => el.name)
                    .join(', ')
                }
              >
                {firmwareVersions.map(version => (
                  <MenuItem key={version.name} value={version.id}>
                    <Checkbox checked={fields.se_firmware_versions.indexOf(version.id) > -1} />
                    {`${version.topName} - ${version.name}`}
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

        .form .submit {
          padding: 12px 0;
        }
      `}</style>
    </React.Fragment>
  )
}

export default ApplicationVersion
