import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { BrowserRouter } from 'react-router-dom'
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles'
import blue from 'material-ui/colors/blue'
import pink from 'material-ui/colors/pink'

import configureStore from './store'
import App from './components/app'

const { store, persistor } = configureStore({})

const theme = createMuiTheme({
  palette: {
    primary: blue,
    secondary: pink,
  },
})

render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <MuiThemeProvider theme={theme}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </MuiThemeProvider>
    </PersistGate>
  </Provider>,
  document.getElementById('app'),
)

module.hot.accept()
