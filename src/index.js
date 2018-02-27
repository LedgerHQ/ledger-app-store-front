import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles'
import blue from 'material-ui/colors/blue'
import pink from 'material-ui/colors/pink'

import configureStore from './store'
import App from './components/app'

const store = configureStore({})

const theme = createMuiTheme({
  palette: {
    primary: blue,
    secondary: pink,
  },
})

render(
  <Provider store={store}>
    <MuiThemeProvider theme={theme}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('app'),
)

module.hot.accept()
