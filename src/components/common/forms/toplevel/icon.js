// @flow
/* globals SyntheticEvent */
import * as React from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import isEmpty from 'ramda/src/isEmpty'
import not from 'ramda/src/not'

import Form from '../../../utils/form'
import ImgReader from '../../img-reader'

import { cleanMerge } from '../../../../utils/merge'

type Props = {
  initFields: Object,
  method: 'POST' | 'DELETE' | 'PUT',
  createResource: Function,
  success: boolean,
  editMode: boolean,
}

type State = {
  init: Object,
  pristine: boolean,
}

const baseFields = {
  name: '',
  file: '',
}

class IconForm extends React.Component<Props, State> {
  state = {
    init: {},
    pristine: true,
  }

  componentDidMount() {
    this.init()
  }

  init = () => {
    const { initFields } = this.props
    const clean = cleanMerge(baseFields, initFields)
    this.setState({ init: clean })
  }

  onChangeIcon = (callback: (evt: SyntheticEvent<HTMLInputElement>) => void) => (
    evt: SyntheticEvent<HTMLInputElement>,
  ) => {
    const { pristine } = this.state
    if (pristine) {
      this.setState({ pristine: false })
    }

    callback(evt)
  }

  render() {
    const { createResource, method, success, editMode } = this.props
    const { init, pristine } = this.state

    return not(isEmpty(init)) ? (
      <React.Fragment>
        <Form type="icons" initFields={init} method={method} success={success}>
          {({ onChange, onSubmit, fields, onFileChange }) => (
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
              <label className="input full label" htmlFor="file">
                <Button variant="raised" component="span">
                  Upload Icon
                </Button>
                {editMode && pristine ? (
                  <img src={fields.file} alt="icon" style={{ maxWidth: 80 }} />
                ) : (
                  <ImgReader
                    file={fields.file}
                    style={{ maxWidth: 100 }}
                    defaultText="no icon selected yet"
                  />
                )}
                <input
                  className="file"
                  type="file"
                  accept="image/*"
                  id="file"
                  onChange={this.onChangeIcon(onFileChange('file'))}
                />
              </label>
              <div className="submit">
                <Button type="submit" size="large" variant="raised" color="secondary">
                  Submit
                </Button>
              </div>
            </form>
          )}
        </Form>

        <style jsx>{`
          .form {
            min-width: 300px;
          }

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
    ) : null
  }
}

export default IconForm
