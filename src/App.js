import { useReducer, useCallback } from 'react'
import { Switch, Route } from 'react-router-dom'
import Account from './account/Account'
import Cart from './Cart'
import cartReducer from './reducers/cart-reducer'
import Category from './products/Category'
import Checkout from './order/Checkout'
import Footer from './Footer'
import Navigation from './navigation/Navigation'
import OrderSummary from './order/OrderSummary'
import ProductDetails from './products/ProductDetails'
import Register from './account/Register'
import ScrollToTop from './ScrollToTop'
import Signin from './account/Signin'
import Storefront from './storefront/Storefront'

const footerNavigation = {
	brands: [
		{
			name: 'HEAD',
			href: '#'
		},
		{
			name: 'Wilson',
			href: '#'
		},
		{
			name: 'Babolat',
			href: '#'
		},
		{
			name: 'Yonex',
			href: '#'
		},
		{
			name: 'Pacific',
			href: '#'
		},
		{
			name: 'PROKENNEX',
			href: '#'
		},
		{
			name: 'Prince',
			href: '#'
		},
		{
			name: 'Lacoste',
			href: '#'
		},
		{
			name: 'Dunlop',
			href: '#'
		},
		{
			name: 'Technifibre',
			href: '#'
		}
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
	const [cart, dispatch] = useReducer(cartReducer, {
		_id: '',
		userId: null,
		products: []
	})

	const handleInitialCart = useCallback(async cartData => {
		dispatch({ type: 'init', payload: await cartData })
	}, [])

	const handleCartUpdate = (type, payload) => {
		dispatch({ type, payload })
	}

	return (
		<>
			<Navigation onFetchCart={handleInitialCart} />
			<ScrollToTop />

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
