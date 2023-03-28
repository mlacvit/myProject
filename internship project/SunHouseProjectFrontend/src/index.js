import React from 'react'
import ReactDOM from 'react-dom/client'
import { Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import App from './App'
import store from './store/configureStore'
import history from './history'
import './index.scss'

const app = (
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>
)

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(app)
