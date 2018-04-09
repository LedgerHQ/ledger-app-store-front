import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import reducers from './reducers'
import authMiddleware from './middlewares/authMiddleware'

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth'],
}

/* eslint-disable no-underscore-dangle */
const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
      })
    : compose
/* eslint-enable no-underscore-dangle */

export default initialState => {
  const middlewares = [thunk, authMiddleware]
  const enhancers = composeEnhancers(applyMiddleware(...middlewares))

  const persistedReducers = persistReducer(persistConfig, reducers)
  const store = createStore(persistedReducers, initialState, enhancers)

  const persistor = persistStore(store)

  if (module.hot) {
    module.hot.accept('./reducers', () => {
      const nextRootReducer = require('./reducers/index').default
      store.replaceReducer(persistReducer(persistConfig, nextRootReducer))
    })
  }

  return { store, persistor }
}
