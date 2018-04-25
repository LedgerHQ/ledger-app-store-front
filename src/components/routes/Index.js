import * as React from 'react'
import { connect } from 'react-redux'
import Typography from 'material-ui/Typography'
import Title from '../common/title'
import ConnectedLayout from '../common/layout'
import { isLoggedInSelector } from '../../selectors/auth-selectors'

type Props = {
  loggedIn: boolean,
}

const Index = ({ loggedIn }: Props): React.Node => (
  <ConnectedLayout title="App Store - Index">
    <div>
      <Title>Ledger Manager Admin</Title>
      <Typography variant="subheading">
        {loggedIn ? 'go to dashboard to work on resources' : 'log in to continue'}
      </Typography>
    </div>
    <style jsx>{`
      div {
        margin-top: 10%;
        text-align: center;
      }
    `}</style>
  </ConnectedLayout>
)

const mapStateToProps = (state: Object): Object => ({
  loggedIn: isLoggedInSelector(state),
})

export default connect(mapStateToProps)(Index)
