// @flow
import * as React from 'react'
import TextField from 'material-ui/TextField'
import Button from 'material-ui/Button'

import Form from '../../../utils/form'

type Props = {
  initFields?: Object,
  method: 'POST' | 'DELETE' | 'PUT',
  createResource: Function,
}

const ProviderForm = ({ createResource, initFields, method }: Props): React.Node => (
  <React.Fragment>
    <Form type="providers" initFields={initFields || {}} method={method}>
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

ProviderForm.defaultProps = {
  initFields: {
    name: '',
    description: '',
  },
}

export default ProviderForm
