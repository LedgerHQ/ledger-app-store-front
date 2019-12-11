// @flow
import * as React from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import FormControl from '@material-ui/core/FormControl'
import Checkbox from '@material-ui/core/Checkbox'

import Form from '../../../utils/form'
import { cleanMerge } from '../../../../utils/merge'

type Props = {
  createResource: Function,
  providers: Array<Object>,
  categories: Array<Object>,
  publishers: Array<Object>,
  initFields: Object,
  method: 'POST' | 'DELETE' | 'PUT',
  success: boolean,
}

const baseFields = {
  providers: [],
  category: '',
  publisher: '',
  name: '',
  description: '',
  currencyId: '',
  authorName: '',
  contactURL: '',
  supportURL: '',
  sourceURL: '',
  compatibleWalletsJSON: '',
}

const ApplicationForm = ({
  createResource,
  providers,
  categories,
  publishers,
  initFields,
  method,
  success,
}: Props): React.Node => {
  const init = cleanMerge(baseFields, initFields)

  return (
    <React.Fragment>
      <Form initFields={init} type="applications" method={method} success={success}>
        {({ onChange, onSubmit, fields, onSelectChange }) => {
          let compatibleWalletsJSONerr
          if (fields.compatibleWalletsJSON) {
            try {
              const obj = JSON.parse(fields.compatibleWalletsJSON)
              if (!obj || !Array.isArray(obj)) {
                compatibleWalletsJSONerr = 'This is not a JSON array. Must be [{..}]'
              }
              // eslint-disable-next-line no-plusplus
              for (let i = 0; i < obj.length; i++) {
                const v = obj[i]
                if (!v || typeof v !== 'object') {
                  compatibleWalletsJSONerr = `Must be an array of objects: [{..}, {..}]. Unexpected value at position ${i}`
                  break
                }
                if (!(v.name && typeof v.name === 'string')) {
                  compatibleWalletsJSONerr = `at [${i}]: name required (string). [{ name: "foo" }]`
                  break
                }
                if (v.url && typeof v.url !== 'string') {
                  compatibleWalletsJSONerr = `at [${i}]: if url defined, it must be a string!`
                  break
                }
              }
            } catch (e) {
              compatibleWalletsJSONerr = `Invalid JSON: ${e.message}`
            }
          }

          return (
            <form onSubmit={onSubmit(createResource)} className="form">
              <TextField
                id="name"
                label="name"
                type="string"
                onChange={onChange('name')}
                value={fields.name}
                className="input"
                required
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
                <InputLabel htmlFor="publisher">publisher</InputLabel>
                <Select
                  input={<Input id="publisher" />}
                  onChange={onSelectChange('publisher')}
                  value={fields.publisher}
                >
                  {publishers.map(publisher => (
                    <MenuItem key={publisher.name} value={publisher.id}>
                      {publisher.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl className="input">
                <InputLabel htmlFor="category">category</InputLabel>
                <Select
                  input={<Input id="category" />}
                  onChange={onSelectChange('category')}
                  value={fields.category}
                >
                  <MenuItem value="">None</MenuItem>
                  {categories.map(category => (
                    <MenuItem key={category.name} value={category.id}>
                      {category.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <TextField
                id="currencyId"
                label="currencyId (for coin apps)"
                placeholder="Ledger Live currency id"
                type="string"
                onChange={onChange('currencyId')}
                value={fields.currencyId}
                className="input"
              />
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
                id="authorName"
                label="author name (empty for Ledger)"
                placeholder="Leave empty if Ledger"
                type="string"
                onChange={onChange('authorName')}
                value={fields.authorName}
                className="input full"
              />
              <TextField
                id="contactURL"
                label="URL to contact author (http:// or mailto:)"
                placeholder="http:// or mailto:"
                type="url"
                onChange={onChange('contactURL')}
                value={fields.contactURL}
                className="input full"
              />
              <TextField
                id="supportURL"
                label="URL to support page"
                type="url"
                onChange={onChange('supportURL')}
                value={fields.supportURL}
                className="input full"
              />
              <TextField
                id="sourceURL"
                label="URL to source code"
                placeholder="https://github.com/..."
                type="url"
                onChange={onChange('sourceURL')}
                value={fields.sourceURL || ''}
                className="input full"
              />
              <TextField
                id="compatibleWalletsJSON"
                label="compatible wallets"
                placeholder="JSON array of {name,url}"
                type="string"
                onChange={onChange('compatibleWalletsJSON')}
                error={!!compatibleWalletsJSONerr}
                helperText={compatibleWalletsJSONerr}
                value={fields.compatibleWalletsJSON}
                className="input full"
              />

              <div className="submit">
                <Button type="submit" size="large" variant="raised" color="secondary">
                  Submit
                </Button>
              </div>
            </form>
          )
        }}
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

export default ApplicationForm
