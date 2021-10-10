import { Switch, Route } from 'react-router-dom'
import Account from './account/Account'
import AllProducts from './products/AllProducts'
import Cart from './Cart'
import Category from './products/Category'
import Footer from './Footer'
import Navigation from './navigation/Navigation'
import OrderConfirmation from './order/checkout/OrderConfirmation'
import ProductDetails from './products/ProductDetails'
import Register from './account/Register'
import ScrollToTop from './ScrollToTop'
import Signin from './account/Signin'
import Storefront from './storefront/Storefront'
import CheckoutForm from './order/checkout/CheckoutForm'
import PageNotFound from './PageNotFound'

const App = () => {
	return (
		<>
			<Navigation />
			<ScrollToTop />
			<Switch>
				<Route path={'/order/checkout/:id'}>
					<CheckoutForm />
				</Route>
				<Route path={'/order/:id'}>
					<OrderConfirmation />
				</Route>
				<Route path={'/categories/:id'}>
					<Category />
				</Route>
				<Route path={'/products/:id'}>
					<ProductDetails />
				</Route>
				<Route path={'/products'}>
					<AllProducts />
				</Route>
				<Route path={'/account/signin'}>
					<Signin />
				</Route>
				<Route path={'/account/register'}>
					<Register />
				</Route>
				<Route path={'/account/'}>
					<Account />
				</Route>
				<Route path={'/cart'}>
					<Cart />
				</Route>
				<Route exact path="/">
					<Storefront />
				</Route>
				<Route path={['*', '/404']}>
					<PageNotFound />
				</Route>
			</Switch>
			<Footer />
		</>
	)
}

export default App
