import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'

import reducers from './reducers'

/* eslint-disable no-underscore-dangle */
const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
      })
    : compose
/* eslint-enable no-underscore-dangle */

export default initialState => {
  const middlewares = [thunk]
  const enhancers = composeEnhancers(applyMiddleware(...middlewares))

  const store = createStore(reducers, initialState, enhancers)

  if (module.hot) {
    module.hot.accept('./reducers', () => {
      const nextRootReducer = require('./reducers/index').default
      store.replaceReducer(nextRootReducer)
    })
  }

  return store
}
