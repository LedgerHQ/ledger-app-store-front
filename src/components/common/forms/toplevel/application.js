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
        {({ onChange, onSubmit, fields, onSelectChange }) => (
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

export default ApplicationForm
