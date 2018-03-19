// @flow
/* globals SyntheticEvent */
import * as React from 'react'

type Props = {
  children: Function,
}

type State = {
  fields: Object,
  selects: Object,
  extras: Object,
}

class Form extends React.Component<Props, State> {
  props: Props
  state: State

  state = {
    fields: {},
    selects: {},
    extras: {},
  }

  onChange = (field: string): Function => (evt: SyntheticEvent<HTMLInputElement>): void => {
    evt.preventDefault()
    const { value } = evt.currentTarget
    this.setState(state => ({
      ...state,
      fields: { ...state.fields, [field]: value },
    }))
  }

  onSelectChange = (field: string, extra: boolean = false): Function => (evt): void => {
    const key = extra ? 'extras' : 'selects'
    this.setState(state => ({
      ...state,
      [key]: { ...state[key], [field]: evt.target.value },
    }))
  }

  onSubmit = (evt: SyntheticEvent<HTMLButtonElement | HTMLFormElement>): void => {
    evt.preventDefault()
    const { fields, selects, extras } = this.state

    console.log({ ...fields, ...selects, ...extras })
    setTimeout(this.reset, 2000) // MOCK FOR TESTS
  }

  reset = (): void => this.setState(state => ({ ...state, fields: {}, selects: {} }))

  render(): React.Node {
    const { selects, fields, extras } = this.state
    return this.props.children({
      onChange: this.onChange,
      onSubmit: this.onSubmit,
      onSelectChange: this.onSelectChange,
      selectState: selects,
      fieldState: fields,
      extraState: extras,
    })
  }
}

export default Form
