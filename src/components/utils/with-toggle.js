// @flow
import * as React from 'react'

type Props = {
  children: Function,
}

type State = {
  open: boolean,
}

class WithToggle extends React.Component<Props, State> {
  state = {
    open: false,
  }

  toggleDialog = (bool: boolean): Function => (): void => {
    this.setState(state => ({
      ...state,
      open: bool,
    }))
  }

  render(): React.Node {
    const { children } = this.props
    const { open } = this.state

    return children(open, this.toggleDialog)
  }
}

export default WithToggle
