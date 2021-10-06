import { useContext, useEffect, useState } from 'react'
import { ProductContext} from '../context/product-context'
import useHttp from '../hooks/useHttp'
import { useParams } from 'react-router'
import { UserContext } from '../context/user-context'
import { RadioGroup } from '@headlessui/react'
import { CheckCircleIcon, TrashIcon } from '@heroicons/react/solid'

const deliveryMethods = [
	{
		id: 1,
		title: 'Standard',
		turnaround: '4–10 business days',
		price: '$5.00'
	},
	{
		id: 2,
		title: 'Express',
		turnaround: '2–5 business days',
		price: '$16.00'
	}
]

function classNames(...classes) {
	return classes.filter(Boolean).join(' ')
}

const CheckoutForm = () => {
	const [selectedDeliveryMethod, setSelectedDeliveryMethod] = useState(
		deliveryMethods[0]
	)
	const [order, setOrder] = useState('')
	const {loading, error, fetchData} = useHttp()
	const params = useParams()

	useEffect(() => {
		const getOrderData = async() => {
			await fetchData({
				url: `${process.env.REACT_APP_API_URL}/orders/${params.id}`,
			}, (orderData) => {setOrder(orderData)})
		}

		getOrderData()
	},[params.id, fetchData])
	return (loading ? 'loading' : order.products)
}
	// 	<div className="bg-gray-50">
	// 		<div className="max-w-2xl mx-auto pt-16 pb-24 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
	// 			<h2 className="sr-only">Checkout</h2>

	// 			<form className="lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16">
	// 				<div>
	// 					<h2 className="text-lg font-medium text-gray-900">
	// 						Contact information
	// 					</h2>

	// 					<div className="mt-4">
	// 						<label
	// 							htmlFor="email-address"
	// 							className="block text-sm font-medium text-gray-700">
	// 							Email address
	// 						</label>
	// 						<div className="mt-1">
	// 							<input
	// 								type="email"
	// 								id="email-address"
	// 								name="email-address"
	// 								autoComplete="email"
	// 								className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
	// 							/>
	// 						</div>
	// 					</div>
	// 				</div>

	// 				<div className="mt-10 border-t border-gray-200 pt-10">
	// 					<h2 className="text-lg font-medium text-gray-900">
	// 						Shipping information
	// 					</h2>

	// 					<div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
	// 						<div>
	// 							<label
	// 								htmlFor="first-name"
	// 								className="block text-sm font-medium text-gray-700">
	// 								First name
	// 							</label>
	// 							<div className="mt-1">
	// 								<input
	// 									type="text"
	// 									id="first-name"
	// 									name="first-name"
	// 									autoComplete="given-name"
	// 									className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
	// 								/>
	// 							</div>
	// 						</div>

	// 						<div>
	// 							<label
	// 								htmlFor="last-name"
	// 								className="block text-sm font-medium text-gray-700">
	// 								Last name
	// 							</label>
	// 							<div className="mt-1">
	// 								<input
	// 									type="text"
	// 									id="last-name"
	// 									name="last-name"
	// 									autoComplete="family-name"
	// 									className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
	// 								/>
	// 							</div>
	// 						</div>

	// 						<div className="sm:col-span-2">
	// 							<label
	// 								htmlFor="company"
	// 								className="block text-sm font-medium text-gray-700">
	// 								Company
	// 							</label>
	// 							<div className="mt-1">
	// 								<input
	// 									type="text"
	// 									name="company"
	// 									id="company"
	// 									className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
	// 								/>
	// 							</div>
	// 						</div>

	// 						<div className="sm:col-span-2">
	// 							<label
	// 								htmlFor="address"
	// 								className="block text-sm font-medium text-gray-700">
	// 								Address
	// 							</label>
	// 							<div className="mt-1">
	// 								<input
	// 									type="text"
	// 									name="address"
	// 									id="address"
	// 									autoComplete="street-address"
	// 									className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
	// 								/>
	// 							</div>
	// 						</div>

	// 						<div className="sm:col-span-2">
	// 							<label
	// 								htmlFor="apartment"
	// 								className="block text-sm font-medium text-gray-700">
	// 								Apartment, suite, etc.
	// 							</label>
	// 							<div className="mt-1">
	// 								<input
	// 									type="text"
	// 									name="apartment"
	// 									id="apartment"
	// 									className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
	// 								/>
	// 							</div>
	// 						</div>

	// 						<div>
	// 							<label
	// 								htmlFor="city"
	// 								className="block text-sm font-medium text-gray-700">
	// 								City
	// 							</label>
	// 							<div className="mt-1">
	// 								<input
	// 									type="text"
	// 									name="city"
	// 									id="city"
	// 									className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
	// 								/>
	// 							</div>
	// 						</div>

	// 						<div>
	// 							<label
	// 								htmlFor="country"
	// 								className="block text-sm font-medium text-gray-700">
	// 								Country
	// 							</label>
	// 							<div className="mt-1">
	// 								<select
	// 									id="country"
	// 									name="country"
	// 									autoComplete="country"
	// 									className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
	// 									<option>Canada</option>
	// 									<option>Mexico</option>
	// 									<option>United States</option>
	// 								</select>
	// 							</div>
	// 						</div>

	// 						<div>
	// 							<label
	// 								htmlFor="province"
	// 								className="block text-sm font-medium text-gray-700">
	// 								Province
	// 							</label>
	// 							<div className="mt-1">
	// 								<input
	// 									type="text"
	// 									name="province"
	// 									id="province"
	// 									className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
	// 								/>
	// 							</div>
	// 						</div>

	// 						<div>
	// 							<label
	// 								htmlFor="postal-code"
	// 								className="block text-sm font-medium text-gray-700">
	// 								Postal code
	// 							</label>
	// 							<div className="mt-1">
	// 								<input
	// 									type="text"
	// 									name="postal-code"
	// 									id="postal-code"
	// 									autoComplete="postal-code"
	// 									className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
	// 								/>
	// 							</div>
	// 						</div>

	// 						<div className="sm:col-span-2">
	// 							<label
	// 								htmlFor="phone"
	// 								className="block text-sm font-medium text-gray-700">
	// 								Phone
	// 							</label>
	// 							<div className="mt-1">
	// 								<input
	// 									type="text"
	// 									name="phone"
	// 									id="phone"
	// 									autoComplete="tel"
	// 									className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
	// 								/>
	// 							</div>
	// 						</div>
	// 					</div>
	// 				</div>

	// 				<div className="mt-10 border-t border-gray-200 pt-10">
	// 					<RadioGroup
	// 						value={selectedDeliveryMethod}
	// 						onChange={setSelectedDeliveryMethod}>
	// 						<RadioGroup.Label className="text-lg font-medium text-gray-900">
	// 							Delivery method
	// 						</RadioGroup.Label>

	// 						<div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
	// 							{deliveryMethods.map(deliveryMethod => (
	// 								<RadioGroup.Option
	// 									key={deliveryMethod.id}
	// 									value={deliveryMethod}
	// 									className={({ checked, active }) =>
	// 										classNames(
	// 											checked
	// 												? 'border-transparent'
	// 												: 'border-gray-300',
	// 											active
	// 												? 'ring-2 ring-indigo-500'
	// 												: '',
	// 											'relative bg-white border rounded-lg shadow-sm p-4 flex cursor-pointer focus:outline-none'
	// 										)
	// 									}>
	// 									{({ checked, active }) => (
	// 										<>
	// 											<div className="flex-1 flex">
	// 												<div className="flex flex-col">
	// 													<RadioGroup.Label
	// 														as="span"
	// 														className="block text-sm font-medium text-gray-900">
	// 														{
	// 															deliveryMethod.title
	// 														}
	// 													</RadioGroup.Label>
	// 													<RadioGroup.Description
	// 														as="span"
	// 														className="mt-1 flex items-center text-sm text-gray-500">
	// 														{
	// 															deliveryMethod.turnaround
	// 														}
	// 													</RadioGroup.Description>
	// 													<RadioGroup.Description
	// 														as="span"
	// 														className="mt-6 text-sm font-medium text-gray-900">
	// 														{
	// 															deliveryMethod.price
	// 														}
	// 													</RadioGroup.Description>
	// 												</div>
	// 											</div>
	// 											{checked ? (
	// 												<CheckCircleIcon
	// 													className="h-5 w-5 text-indigo-600"
	// 													aria-hidden="true"
	// 												/>
	// 											) : null}
	// 											<div
	// 												className={classNames(
	// 													active
	// 														? 'border'
	// 														: 'border-2',
	// 													checked
	// 														? 'border-indigo-500'
	// 														: 'border-transparent',
	// 													'absolute -inset-px rounded-lg pointer-events-none'
	// 												)}
	// 												aria-hidden="true"
	// 											/>
	// 										</>
	// 									)}
	// 								</RadioGroup.Option>
	// 							))}
	// 						</div>
	// 					</RadioGroup>
	// 				</div>



	// 				{/* Order summary */}
	// 				<div className="mt-10 lg:mt-0">
	// 					<h2 className="text-lg font-medium text-gray-900">
	// 						Order summary
	// 					</h2>

	// 					<div className="mt-4 bg-white border border-gray-200 rounded-lg shadow-sm">
	// 						<h3 className="sr-only">Items in your cart</h3>
	// 						<ul
	// 							role="list"
	// 							className="divide-y divide-gray-200">
	// 							{cart.products.map(item => (
	// 								<li
	// 									key={item.productId}
	// 									className="flex py-6 px-4 sm:px-6">
	// 									<div className="flex-shrink-0">
	// 										<img
	// 											src={product.imageSrc}
	// 											alt={product.imageAlt}
	// 											className="w-20 rounded-md"
	// 										/>
	// 									</div>

	// 									<div className="ml-6 flex-1 flex flex-col">
	// 										<div className="flex">
	// 											<div className="min-w-0 flex-1">
	// 												<h4 className="text-sm">
	// 													<a
	// 														href={product.href}
	// 														className="font-medium text-gray-700 hover:text-gray-800">
	// 														{product.title}
	// 													</a>
	// 												</h4>
	// 												<p className="mt-1 text-sm text-gray-500">
	// 													{product.color}
	// 												</p>
	// 												<p className="mt-1 text-sm text-gray-500">
	// 													{product.size}
	// 												</p>
	// 											</div>

	// 											<div className="ml-4 flex-shrink-0 flow-root">
	// 												<button
	// 													type="button"
	// 													className="-m-2.5 bg-white p-2.5 flex items-center justify-center text-gray-400 hover:text-gray-500">
	// 													<span className="sr-only">
	// 														Remove
	// 													</span>
	// 													<TrashIcon
	// 														className="h-5 w-5"
	// 														aria-hidden="true"
	// 													/>
	// 												</button>
	// 											</div>
	// 										</div>

	// 										<div className="flex-1 pt-2 flex items-end justify-between">
	// 											<p className="mt-1 text-sm font-medium text-gray-900">
	// 												{product.price}
	// 											</p>
	// 											</div>
	// 										</div>
	// 								</li>
	// 							))}
	// 						</ul>
	// 						<dl className="border-t border-gray-200 py-6 px-4 space-y-6 sm:px-6">
	// 							<div className="flex items-center justify-between">
	// 								<dt className="text-sm">Subtotal</dt>
	// 								<dd className="text-sm font-medium text-gray-900">
	// 									$64.00
	// 								</dd>
	// 							</div>
	// 							<div className="flex items-center justify-between">
	// 								<dt className="text-sm">Shipping</dt>
	// 								<dd className="text-sm font-medium text-gray-900">
	// 									$5.00
	// 								</dd>
	// 							</div>
	// 							<div className="flex items-center justify-between">
	// 								<dt className="text-sm">Taxes</dt>
	// 								<dd className="text-sm font-medium text-gray-900">
	// 									$5.52
	// 								</dd>
	// 							</div>
	// 							<div className="flex items-center justify-between border-t border-gray-200 pt-6">
	// 								<dt className="text-base font-medium">
	// 									Total
	// 								</dt>
	// 								<dd className="text-base font-medium text-gray-900">
	// 									$75.52
	// 								</dd>
	// 							</div>
	// 						</dl>

	// 						<div className="border-t border-gray-200 py-6 px-4 sm:px-6">
	// 							<button
	// 								type="submit"
	// 								className="w-full bg-indigo-600 border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500">
	// 								Confirm order
	// 							</button>
	// 						</div>
	// 					</div>
	// 				</div>
	// 			</form>
	// 		</div>
	// 	</div>
	// }

export default CheckoutForm
