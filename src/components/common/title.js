// @flow
import * as React from 'react'
import Typography from 'material-ui/Typography'

type Props = {
  children: React.Node,
}

const Title = ({ children }: Props): React.Node => (
  <Typography variant="title">{children}</Typography>
)

export default Title
