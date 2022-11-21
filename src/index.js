import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { UserProvider } from './context/user_context'
import { Auth0Provider } from '@auth0/auth0-react'
import {Provider} from 'react-redux'
import {store} from './store'

ReactDOM.render(

<Auth0Provider domain={process.env.REACT_APP_AUTH_DOMAIN} clientId={process.env.REACT_APP_AUTH_CLIENT_ID} redirectUri={window.location.origin} cacheLocation='localstorage'>
    <UserProvider>
        <Provider store={store}>
            <App />
        </Provider>
    </UserProvider>
</Auth0Provider>



,

document.getElementById('root'))
