import { useContext } from 'react'
import { CartContext } from './context/cart-context'
import { Link } from 'react-router-dom'
import { XIcon } from '@heroicons/react/solid'

// generate quantity selector
const optionValues = () => {
	let items = []
	for (let i = 0; i < 100; ++i) {
		items.push(
			<option key={i} value={i}>
				{i}
			</option>
		)
	}
	return items
}

const CartItem = ({ cartItemIdx, productData, cartItem }) => {
	const { onCartUpdate } = useContext(CartContext)

	const handleQuantityChange = (event, index) => {
        if (+event.target.value === 0) {
    		onCartUpdate('delete', { index, value: event.target.value })
        }
        else {
            onCartUpdate('selectQ', { index, value: +event.target.value })
        }
	}

	const handleDelete = (event, index) => {
		onCartUpdate('delete', { index, value: event.target.value })
	}

	return (
		<li
			key={cartItem.productId + cartItem.size}
			className="flex py-6 sm:py-10">
			<div className="flex-shrink-0">
				<img
					src={
						productData.images[0].src
							? productData
									.images[0].src
							: ''
					}
					alt={'tennis racket'}
					className="w-24 h-24 rounded-md object-center object-cover sm:w-48 sm:h-48"
				/>
			</div>

			<div className="ml-4 flex-1 flex flex-col justify-between sm:ml-6">
				<div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
					<div>
						<div className="flex-column justify-between">
							<h2 className="text-md italic mb-1">
								<span className="font-medium text-gray-700 hover:text-gray-800">
									{
										productData.brand
									}
								</span>
							</h2>
							<h3 className="text-sm">
								<Link
									to={`${cartItem.productId}`}
									className="font-medium text-gray-700 hover:text-gray-800">
									{
										productData.title
									}
								</Link>
							</h3>
						</div>
						<div className="mt-1 flex text-sm">
							{cartItem.size ? (
								<p className=" text-gray-500">
									Size: {cartItem.size}
								</p>
							) : null}
						</div>
						<p className="mt-1 text-sm font-medium text-gray-900">
							€
							{
								productData.price
							}
						</p>
					</div>

					<div className="mt-4 sm:mt-0 sm:pr-9">
						<label
							htmlFor={`quantity-${cartItemIdx}`}
							className="sr-only">
							Quantity, {cartItem.productQuantity}
						</label>
						<select
							id={`quantity-${cartItemIdx}`}
							name={`quantity-${cartItemIdx}`}
							value={'' + cartItem.productQuantity}
							onChange={event =>
								handleQuantityChange(event, cartItemIdx)
							}
							className="max-w-full rounded-md border border-gray-300 py-1.5 text-base leading-5 font-medium text-gray-700 text-left shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
							{optionValues()}
						</select>

						<div className="absolute top-0 right-0">
							<button
								type="button"
								onClick={event =>
									handleDelete(event, cartItemIdx)
								}
								className="-m-2 p-2 inline-flex text-gray-400 hover:text-gray-500">
								<span className="sr-only">Remove</span>
								<XIcon className="h-5 w-5" aria-hidden="true" />
							</button>
						</div>
					</div>
				</div>
			</div>
		</li>
	)
}
export default CartItem
