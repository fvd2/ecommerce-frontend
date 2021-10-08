import { useContext, useEffect, useState } from 'react'
import { ProductContext } from './context/product-context'
import { UserContext } from './context/user-context'
import { CartContext } from './context/cart-context'
import CartItem from './CartItem'
import useHttp from './hooks/useHttp'
import { useHistory } from 'react-router'

const Cart = () => {
	const [totalAmount, setTotalAmount] = useState(0)
	const { products, productsIndexMap } = useContext(ProductContext)
	const { cart } = useContext(CartContext)
	const { accessToken } = useContext(UserContext)
	const { fetchData } = useHttp()
	const history = useHistory()

	useEffect(() => {
		if (products.length !== 0) {
			// calculate total amount when changes are made to cart
			const total = cart.products.reduce(
				(prev, curr) =>
					prev +
					curr.productQuantity *
						products[productsIndexMap.get(curr.productId)].price,
				0
			)
			setTotalAmount(total)
			return () => setTotalAmount(0)
		}
	}, [cart.products, products, productsIndexMap])

	const initiateCheckout = async event => {
		event.preventDefault()
		const navigateToOrder = async response => {
			let url
			const orderId = response.orderId
			setTimeout(() => {
				switch (response.status) {
					case 'saved':
						url = `/order/checkout/${orderId}`
						break
					default:
						url = `/order/${orderId}`
						break
				}
				history.push(url)
			}, 500)
		}

		await fetchData(
			{
				url: `${process.env.REACT_APP_API_URL}/orders/`,
				method: 'POST',
				credentials: 'include',
				headers: {
					authorization: 'Bearer ' + accessToken
				}
			},
			navigateToOrder
		)
	}

	return products.length === 0 && totalAmount === 0 ? (
		'loading'
	) : (
		<div className="bg-white">
			<div className="max-w-2xl mx-auto pt-16 pb-24 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
				<h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
					Shopping Cart
				</h1>
				<form
					onSubmit={initiateCheckout}
					className="mt-12 lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start xl:gap-x-16">
					<section
						aria-labelledby="cart-heading"
						className="lg:col-span-7">
						<h2 id="cart-heading" className="sr-only">
							Items in your shopping cart
						</h2>

						<ul className="border-t border-b border-gray-200 divide-y divide-gray-200">
							{cart.products.map((cartItem, cartItemIdx) => (
								<CartItem
									key={cartItem.productId + cartItem.size}
									cartItem={cartItem}
									cartItemIdx={cartItemIdx}
									productData={
										products[
											productsIndexMap.get(
												cartItem.productId
											)
										]
									}
								/>
							))}
						</ul>
					</section>

					{/* Order summary */}
					{cart.products.length > 0 ? (
						<section
							aria-labelledby="summary-heading"
							className="mt-16 bg-gray-50 rounded-lg px-4 py-6 sm:p-6 lg:p-8 lg:mt-0 lg:col-span-5">
							<div className="flex items-center justify-between">
								<dt className="text-xl font-bold text-gray-900">
									Order total
								</dt>
								<dd className="text-lg font-bold text-gray-900">
									€{totalAmount.toFixed(2)}
								</dd>
							</div>

							<div className="mt-6">
								<button
									type="submit"
									className="w-full bg-indigo-600 border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500">
									Checkout
								</button>
							</div>
						</section>
					) : (
						<div className="col-start-1 col-span-10 flex-column justify-between">
							<h2 className="text-xl mt-10 mb-1">
								<span className="font-medium text-gray-700 hover:text-gray-800">
									There are currently no items in your cart.
								</span>
							</h2>
						</div>
					)}
				</form>
			</div>
		</div>
	)
}

export default Cart
