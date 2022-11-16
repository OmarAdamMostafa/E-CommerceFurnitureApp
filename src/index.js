import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { SidebarProvider } from './context/sidebar_context'
import { ProductsProvider } from './context/products_context'
import { FilterProvider } from './context/filter_context'
import { CartProvider } from './context/cart_context'
import { UserProvider } from './context/user_context'
import { Auth0Provider } from '@auth0/auth0-react'

ReactDOM.render(

<Auth0Provider domain={process.env.REACT_APP_AUTH_DOMAIN} clientId={process.env.REACT_APP_AUTH_CLIENT_ID} redirectUri={window.location.origin} cacheLocation='localstorage'>
    <UserProvider>
        <SidebarProvider>
            <ProductsProvider>
                <FilterProvider>
                    <CartProvider>
                        <App />
                    </CartProvider>
                </FilterProvider>
            </ProductsProvider>
        </SidebarProvider>
    </UserProvider>
</Auth0Provider>


,

document.getElementById('root'))
