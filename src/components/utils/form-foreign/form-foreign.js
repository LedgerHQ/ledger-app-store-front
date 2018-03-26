// @flow
import * as React from 'react'
import { connect } from 'react-redux'
import Button from 'material-ui/Button'

import Form from '../form'
import ForeignKeyInput from './foreign-key-input'
import { allResourcesSelector } from '../../../selectors/resources-selectors'

type Resource = {
  name: string,
  label: string,
  key?: string,
  data: Object[],
}

type Props = {
  children: Function,
  resources: Array<Resource>,
}

// const resourcesBase = [
//   { name: 'firmwares', label: 'Firmwares', data: firmwares },
//   { name: 'applications', label: 'Applications', data: applications, list: appList },
// ]

const FormForeign = ({ resources, children }: Props): React.Node => (
  <Form>
    {({ onSubmit, onSelectChange, onChange, fields }) => (
      <form onSubmit={onSubmit}>
        {children({ onSubmit, onSelectChange, onChange, fields })}
        <ForeignKeyInput
          fieldState={fields}
          onSelectChange={onSelectChange}
          resources={resources}
        />
        <div className="submit">
          <Button onClick={onSubmit} size="large" variant="raised" color="secondary">
            Submit
          </Button>
        </div>

        <style jsx>{`
          .submit {
            padding: 12px 0;
          }
        `}</style>
      </form>
    )}
  </Form>
)

const mapStateToProps = (state: Object): Object => ({
  resources: allResourcesSelector(state),
})

export default connect(mapStateToProps)(FormForeign)
