import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import UserContextProvider from './context/user-context'
import App from './App'
import './index.css'
import ProductContextProvider from './context/product-context'

ReactDOM.render(
	<React.StrictMode>
		<UserContextProvider>
			<ProductContextProvider>
				<Router>
					<App />
				</Router>
			</ProductContextProvider>
		</UserContextProvider>
	</React.StrictMode>,
	document.getElementById('root')
)
