// @flow
import * as React from 'react'
import TextField from 'material-ui/TextField'
import Button from 'material-ui/Button'

import Form from '../../utils/form'

const ApplicationForm = (): React.Node => (
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
            id="description"
            label="description"
            type="string"
            onChange={onChange('description')}
            value={fieldState.description || ''}
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

export default ApplicationForm
