import { createStore, applyMiddleware } from 'redux'
import rootReducer from './reducers'
//import logger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'

export default function configureStore(initialState) {
    const store = createStore(
        rootReducer,
        initialState,
        // applyMiddleware(logger),
        applyMiddleware(thunkMiddleware),
    )

    if (module.hot) {
        module.hot.accept('./reducers', () => {
            const nextRootReducer = require('./reducers')
            store.replaceReducer(nextRootReducer)
        })
    }

    return store
}