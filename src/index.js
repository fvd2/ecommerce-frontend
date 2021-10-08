import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import CartContextProvider from './context/cart-context'
import ProductContextProvider from './context/product-context'
import UserContextProvider from './context/user-context'
import App from './App'
import './index.css'

ReactDOM.render(
	<React.StrictMode>
		<UserContextProvider>
			<ProductContextProvider>
				<CartContextProvider>
					<Router basename={'/ecom'}>
						<App />
					</Router>
				</CartContextProvider>
			</ProductContextProvider>
		</UserContextProvider>
	</React.StrictMode>,
	document.getElementById('root')
)
