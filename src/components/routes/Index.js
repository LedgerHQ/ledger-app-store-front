import * as React from 'react'
import Typography from 'material-ui/Typography'
import Title from '../common/title'
import ConnectedLayout from '../common/layout'

const Index = () => (
  <ConnectedLayout title="App Store - Index">
    <div>
      <Title>Ledger Manager Admin</Title>
      <Typography variant="subheading">log in to continue</Typography>
    </div>
    <style jsx>{`
      div {
        margin-top: 10%;
        text-align: center;
      }
    `}</style>
  </ConnectedLayout>
)

export default Index
