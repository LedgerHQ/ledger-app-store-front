// @flow
import * as React from 'react'
import equals from 'ramda/src/equals'
import not from 'ramda/src/not'
import Typography from '@material-ui/core/Typography'

type Props = {
  file: *,
  defaultText: string,
}

type State = {
  result: *,
}

class ImgReader extends React.Component<Props, State> {
  state = {
    result: null,
  }

  componentDidMount() {
    this.reader = new FileReader()
    this.reader.addEventListener('load', () => {
      this.setState({ result: this.reader.result })
    })

    if (this.props.file) {
      this.reader.readAsDataURL(this.props.file)
    }
  }

  componentDidUpdate({ file: prevFile }: Props) {
    const { file } = this.props
    const { result } = this.state

    if (!file && !!result) {
      this.setState({ result: null }) // eslint-disable-line
    } else if (file && not(equals(prevFile, file))) {
      this.reader.readAsDataURL(file)
    }
  }

  reader: *

  render() {
    const { file, defaultText, ...otherProps } = this.props
    const { result } = this.state
    return result ? (
      <img alt="preview" src={result} {...otherProps} />
    ) : (
      <Typography style={{ padding: 8, display: 'inline-block' }} component="span">
        {defaultText}
      </Typography>
    )
  }
}

export default ImgReader
