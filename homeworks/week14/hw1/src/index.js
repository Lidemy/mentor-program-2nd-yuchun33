import React from 'react'
import ReactDOM from 'react-dom'
import Container from './containers/containerContainer'
import { createStore, applyMiddleware } from 'redux'
import Posts from './reducers/reducers'
import { Provider } from 'react-redux'
import promiseMiddleware from 'redux-promise-middleware'
import logger from 'redux-logger'

let store = createStore(Posts, applyMiddleware(
    promiseMiddleware(),
    logger
))

ReactDOM.render(
    <Provider store={store}>
        <Container />
    </Provider>,
    document.querySelector('#root')
)