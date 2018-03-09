// @flow
import * as React from 'react'
import { Switch, Route, withRouter } from 'react-router-dom'
import Reboot from 'material-ui/Reboot'
// $FlowFixMeot
import { hot } from 'react-hot-loader'

import LoginConnected from './routes/login'
import ConnectedLayout from './common/layout'
import ProtectedRoute from './utils/protected-route'
import DashboardConnected from './routes/dashboard'
import Index from './routes/Index'

const App = (): React.Node => (
  <React.Fragment>
    <Reboot />
    <ConnectedLayout>
      <Switch>
        <ProtectedRoute path="/dashboard" component={DashboardConnected} />
        <Route path="/" component={Index} exact />
        <Route path="/login" component={LoginConnected} exact />
      </Switch>
    </ConnectedLayout>

    <style jsx global>{`
      html,
      body,
      #app {
        height: 100%;
      }
    `}</style>
  </React.Fragment>
)

export default hot(module)(withRouter(App))