import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import UserContextProvider from './context/user-context'
import App from './App'
import './index.css'

ReactDOM.render(
	<React.StrictMode>
		<UserContextProvider>
			<Router>
				<App />
			</Router>
		</UserContextProvider>
	</React.StrictMode>,
	document.getElementById('root')
)
