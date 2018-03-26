// @flow
/* globals SyntheticEvent */
import * as React from 'react'

type Props = {
  children: Function,
}

type State = {
  fields: Object,
}

class Form extends React.Component<Props, State> {
  props: Props
  state: State

  state = {
    fields: {},
  }

  onChange = (field: string): Function => (evt: SyntheticEvent<HTMLInputElement>): void => {
    evt.preventDefault()
    const { value } = evt.currentTarget
    this.setState(state => ({
      ...state,
      fields: { ...state.fields, [field]: value },
    }))
  }

  onSelectChange = (field: string): Function => (evt): void => {
    const { value } = evt.target
    this.setState(state => ({
      ...state,
      fields: { ...state.fields, [field]: value },
    }))
  }

  onSubmit = (evt: SyntheticEvent<HTMLButtonElement | HTMLFormElement>): void => {
    evt.preventDefault()
    const { fields } = this.state

    console.log(fields)
    setTimeout(this.reset, 2000) // MOCK FOR TESTS
  }

  reset = (): void => this.setState(state => ({ ...state, fields: {} }))

  render(): React.Node {
    const { fields } = this.state
    return this.props.children({
      onChange: this.onChange,
      onSubmit: this.onSubmit,
      onSelectChange: this.onSelectChange,
      fields,
    })
  }
}

export default Form
