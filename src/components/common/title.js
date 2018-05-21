// @flow
import * as React from 'react'
import Typography from '@material-ui/core/Typography'

type Props = {
  children: React.Node,
}

const Title = ({ children, ...rest }: Props): React.Node => (
  <Typography variant="title" {...rest}>
    {children}
  </Typography>
)

export default Title
