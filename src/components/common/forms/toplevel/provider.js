// @flow
import * as React from 'react'
import TextField from 'material-ui/TextField'
import Button from 'material-ui/Button'

import Form from '../../../utils/form'
import { cleanMerge } from '../../../../utils/merge'

type Props = {
  initFields: Object,
  method: 'POST' | 'DELETE' | 'PUT',
  createResource: Function,
  success: boolean,
}

const baseFields = {
  name: '',
  description: '',
}

const ProviderForm = ({ createResource, initFields, method, success }: Props): React.Node => {
  const init = cleanMerge(baseFields, initFields)
  return (
    <React.Fragment>
      <Form type="providers" initFields={init} method={method} success={success}>
        {({ onChange, onSubmit, fields }) => (
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
            <TextField
              id="description"
              label="description"
              type="string"
              onChange={onChange('description')}
              value={fields.description}
              className="input"
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

        .form .submit {
          padding: 12px 0;
        }
      `}</style>
    </React.Fragment>
  )
}

export default ProviderForm
