import { useReducer, useCallback } from 'react'
import { Switch, Route } from 'react-router-dom'
import Navigation from './navigation/Navigation'
import Storefront from './storefront/Storefront'
import Category from './products/Category'
import ProductDetails from './products/ProductDetails'
import Footer from './Footer'
import Checkout from './order/Checkout'
import OrderSummary from './order/OrderSummary'
import Signin from './account/Signin'
import Cart from './Cart'
import Register from './account/Register'
import Account from './account/Account'
import cartReducer from './reducers/cart-reducer'

const footerNavigation = {
	shop: [
		{ name: 'Bags', href: '#' },
		{ name: 'Tees', href: '#' },
		{ name: 'Objects', href: '#' },
		{ name: 'Home Goods', href: '#' },
		{ name: 'Accessories', href: '#' }
	],
	company: [
		{ name: 'Who we are', href: '#' },
		{ name: 'Sustainability', href: '#' },
		{ name: 'Press', href: '#' },
		{ name: 'Careers', href: '#' },
		{ name: 'Terms & Conditions', href: '#' },
		{ name: 'Privacy', href: '#' }
	],
	account: [
		{ name: 'Manage Account', href: '#' },
		{ name: 'Returns & Exchanges', href: '#' },
		{ name: 'Redeem a Gift Card', href: '#' }
	],
	connect: [
		{ name: 'Contact Us', href: '#' },
		{ name: 'Twitter', href: '#' },
		{ name: 'Instagram', href: '#' },
		{ name: 'Pinterest', href: '#' }
	]
}

const App = () => {
	const [cart, dispatch] = useReducer(cartReducer, {_id: '', userId: null, products: []})

	const handleInitialCart = useCallback(async cartData => {
		dispatch({ type: 'init', payload: await cartData })
	}, [])

	const handleCartUpdate = (type, payload) => {
		dispatch({ type, payload })
	}

	return (
		<>
			<Navigation onFetchCart={handleInitialCart} />
			<Switch>
				<Route path={'/order/:id/checkout'}>
					<Checkout />
				</Route>
				<Route path={'/order/:id'}>
					<OrderSummary />
				</Route>
				<Route path={'/categories/:id'}>
					<Category onAddToCart={handleCartUpdate} />
				</Route>
				<Route path={'/products/:id'}>
					<ProductDetails onAddToCart={handleCartUpdate} />
				</Route>
				<Route path="/account/signin">
					<Signin />
				</Route>
				<Route path="/account/register">
					<Register />
				</Route>
				<Route path="/account/">
					<Account />
				</Route>
				<Route path="/cart">
					<Cart cart={cart} onUpdate={handleCartUpdate} />
				</Route>
				<Route exact path="/">
					<Storefront />
				</Route>
			</Switch>
			<Footer footerNavigation={footerNavigation} />
		</>
	)
}

export default App
