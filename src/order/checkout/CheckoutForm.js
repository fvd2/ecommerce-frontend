import { useContext, useEffect, useState } from 'react'
import useHttp from '../../hooks/useHttp'
import { useParams, useHistory } from 'react-router'
import { UserContext } from '../../context/user-context'
import { RadioGroup } from '@headlessui/react'
import { CheckCircleIcon } from '@heroicons/react/solid'
import { Formik, Form, Field } from 'formik'
import OrderSummary from './OrderSummary'

const deliveryMethods = [
	{
		id: 1,
		title: 'Standard',
		turnaround: '4–10 business days',
		price: '€0.00'
	},
	{
		id: 2,
		title: 'Express',
		turnaround: '2–5 business days',
		price: '€0.00'
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
	const [vatAmount, setVatAmount] = useState(0)
	const { loading, error, fetchData } = useHttp()
	const params = useParams()
	const history = useHistory()
	const { user } = useContext(UserContext)

	useEffect(() => {
		if (order && order.products.length > 0) {
			setVatAmount(
				order.products
					.map(item => item.vatAmount)
					.reduce((prev, curr) => prev + curr, 0)
					.toFixed(2)
			)
		}
	}, [order])

	// load order data
	useEffect(() => {
		// navigate to order confirmation if status !== 'saved'
		const handleOrderData = async orderData => {
			if (orderData.status === 'saved') {
				setOrder(orderData)
			} else {
				setTimeout(() => {
					history.push(`/order/${params.id}`)
				}, 500)
			}
		}

		const getOrderData = async () => {
			await fetchData(
				{
					url: `${process.env.REACT_APP_API_URL}/orders/${params.id}`
				},
				handleOrderData
			)
		}
		getOrderData()
	}, [params.id, fetchData, history])

	const handleOrderUpdate = async orderData => {
		// TODO: add checkbox and functionality to store data in existing user's account
		// store entered data (e.g. billing info) in order object
		const {
			firstName: givenName,
			lastName: familyName,
			...otherData
		} = orderData
		const updateObj = {
			billingAddress: { givenName, familyName, ...otherData },
			shippingAddress: { givenName, familyName, ...otherData }
		}
		await fetchData(
			{
				url: `${process.env.REACT_APP_API_URL}/orders/${params.id}`,
				method: 'PATCH',
				credentials: 'include',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ id: params.id, ...updateObj })
			},
			() => {}
		)

		// initiate payment process and redirect to external checkoutUrl
		await fetchData(
			{
				url: `${process.env.REACT_APP_API_URL}/orders/${params.id}/pay`,
				method: 'POST',
				credentials: 'include',
				headers: { 'Content-Type': 'application/json' }
			},
			({ checkoutUrl }) => {
				window.open(checkoutUrl)
			}
		)
	}

	return (
		<div className="bg-gray-50">
			<div className="max-w-2xl mx-auto pt-16 pb-24 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
				<h2 className="sr-only">Checkout</h2>
				<Formik
					initialValues={{
						email: user.email ? user.email : '',
						phone: user.phone ? user.phone : '',
						firstName: user.firstName ? user.firstName : '',
						lastName: user.lastName ? user.lastName : '',
						streetAndNumber: user.streetAndNumber
							? user.streetAndNumber
							: '',
						streetAdditional: user.streetAdditional
							? user.streetAdditional
							: '',
						postalCode: user.postalCode ? user.postalCode : '',
						city: user.city ? user.city : '',
						country: user.country ? user.country : 'NL'
					}}
					// TODO: add additional validation
					validate={values => {
						const errors = {}
						if (!values.email) {
							errors.email = 'Required'
						}
						if (!values.phone) {
							errors.city = 'Required'
						}
						if (
							!/[A-Za-z0-9]+@[A-Za-z0-9]{2,}\.[A-Za-z]{2,}/i.test(
								values.email
							)
						) {
							errors.email = 'Please enter a valid e-mail address'
						}
						if (!values.firstName) {
							errors.firstName = 'Required'
						}
						if (!values.lastName) {
							errors.lastName = 'Required'
						}
						if (!values.streetAndNumber) {
							errors.streetAndNumber = 'Required'
						}
						if (!values.postalCode) {
							errors.postalCode = 'Required'
						}
						if (!values.city) {
							errors.city = 'Required'
						}
						if (!values.country) {
							errors.country = 'Required'
						}
					}}
					onSubmit={(values, { setSubmitting }) => {
						handleOrderUpdate(values)
						setSubmitting(false)
					}}>
					{({ values, errors, handleSubmit }) => (
						// TODO
						// 1a) add billing information checkbox: same as shipping?
						// 1b) if not: separate form
						// 2) pre-populate user data (not working now)
						<Form
							onSubmit={handleSubmit}
							className="lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16">
							<div className="grid col-start-1 col-span-1">
								<h2 className="text-lg font-medium text-gray-900">
									Contact information
								</h2>
								<Field>
									{({ field }) => (
										<div className="mt-4">
											<label
												htmlFor="email-address"
												className={`block text-sm font-medium ${
													errors.email
														? 'text-red-700'
														: 'text-gray-700'
												} `}>
												Email address
											</label>
											<div className="mt-1">
												<input
													{...field}
													value={values.email}
													type="email"
													id="email"
													name="email"
													autoComplete="email"
													required
													className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
												/>
											</div>
										</div>
									)}
								</Field>
							</div>

							<div className="grid col-start-1 col-span-1 mt-10 border-t border-gray-200 pt-10">
								<h2 className="text-lg font-medium text-gray-900">
									Shipping information
								</h2>

								<div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4 sm:border-b sm:border-gray-200">
									<Field>
										{({ field }) => (
											<div>
												<label
													htmlFor="firstName"
													className="block text-sm font-medium text-gray-700">
													First name
												</label>
												<div className="mt-1">
													<input
														{...field}
														value={values.firstName}
														type="text"
														id="firstName"
														name="firstName"
														autoComplete="given-name"
														required
														className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
													/>
												</div>
											</div>
										)}
									</Field>

									<Field>
										{({ field }) => (
											<div>
												<label
													htmlFor="lastName"
													className="block text-sm font-medium text-gray-700">
													Last name
												</label>
												<div className="mt-1">
													<input
														{...field}
														value={values.lastName}
														type="text"
														id="lastName"
														name="lastName"
														autoComplete="family-name"
														required
														className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
													/>
												</div>
											</div>
										)}
									</Field>

									<Field>
										{({ field }) => (
											<div className="sm:col-span-2">
												<label
													htmlFor="streetAndNumber"
													className="block text-sm font-medium text-gray-700">
													Street address and number
												</label>
												<div className="mt-1">
													<input
														{...field}
														value={
															values.streetAndNumber
														}
														type="text"
														name="streetAndNumber"
														id="streetAndNumber"
														required
														autoComplete="street-address"
														className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
													/>
												</div>
											</div>
										)}
									</Field>

									<Field>
										{({ field }) => (
											<div className="sm:col-span-2">
												<label
													htmlFor="streetAdditional"
													className="block text-sm font-medium text-gray-700">
													Apartment, suite, etc.
												</label>
												<div className="mt-1">
													<input
														{...field}
														value={
															values.streetAdditional
														}
														type="text"
														name="streetAdditional"
														id="streetAdditional"
														className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
													/>
												</div>
											</div>
										)}
									</Field>

									<Field>
										{({ field }) => (
											<div>
												<label
													htmlFor="postalCode"
													className="block text-sm font-medium text-gray-700">
													Postal code
												</label>
												<div className="mt-1">
													<input
														{...field}
														value={
															values.postalCode
														}
														type="text"
														name="postalCode"
														id="postalCode"
														required
														autoComplete="postal-code"
														className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
													/>
												</div>
											</div>
										)}
									</Field>

									<Field>
										{({ field }) => (
											<div>
												<label
													htmlFor="city"
													className="block text-sm font-medium text-gray-700">
													City
												</label>
												<div className="mt-1">
													<input
														{...field}
														value={values.city}
														type="text"
														name="city"
														id="city"
														required
														className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
													/>
												</div>
											</div>
										)}
									</Field>

									<Field>
										{({ field }) => (
											<div className="sm:col-span-2">
												<label
													htmlFor="country"
													className="block text-sm font-medium text-gray-700">
													Country
												</label>
												<div className="mt-1">
													<select
														{...field}
														value={values.country}
														id="country"
														required
														name="country"
														autoComplete="country"
														className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
														<option value="NL">
															Netherlands
														</option>
													</select>
												</div>
											</div>
										)}
									</Field>

									<Field>
										{({ field }) => (
											<div className="sm:col-span-2">
												<label
													htmlFor="phone"
													className="block text-sm font-medium text-gray-700">
													Phone
												</label>
												<div className="mt-1">
													<input
														{...field}
														value={values.phone}
														type="text"
														name="phone"
														required
														id="phone"
														autoComplete="tel"
														className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
													/>
												</div>
											</div>
										)}
									</Field>
								</div>
							</div>

							<div className="grid col-start-2 row-start-1 sm:mt-10 sm:pt-10 sm:border-t sm:border-gray-200 lg:border-0 lg:mt-0 lg:pt-0">
								<RadioGroup
									value={selectedDeliveryMethod}
									onChange={setSelectedDeliveryMethod}>
									<RadioGroup.Label className="text-lg font-medium text-gray-900">
										Delivery method
									</RadioGroup.Label>

									<div className="mt-4 grid col-start-2 row-start-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
										{deliveryMethods.map(deliveryMethod => (
											<RadioGroup.Option
												key={deliveryMethod.id}
												value={deliveryMethod}
												className={({
													checked,
													active
												}) =>
													classNames(
														checked
															? 'border-transparent'
															: 'border-gray-300',
														active
															? 'ring-2 ring-indigo-500'
															: '',
														'relative bg-white border rounded-lg shadow-sm p-4 flex cursor-pointer focus:outline-none'
													)
												}>
												{({ checked, active }) => (
													<>
														<div className="flex-1 flex">
															<div className="flex flex-col">
																<RadioGroup.Label
																	as="span"
																	className="block text-sm font-medium text-gray-900">
																	{
																		deliveryMethod.title
																	}
																</RadioGroup.Label>
																<RadioGroup.Description
																	as="span"
																	className="mt-1 flex items-center text-sm text-gray-500">
																	{
																		deliveryMethod.turnaround
																	}
																</RadioGroup.Description>
																<RadioGroup.Description
																	as="span"
																	className="mt-6 text-sm font-medium text-gray-900">
																	{
																		deliveryMethod.price
																	}
																</RadioGroup.Description>
															</div>
														</div>
														{checked ? (
															<CheckCircleIcon
																className="h-5 w-5 text-indigo-600"
																aria-hidden="true"
															/>
														) : null}
														<div
															className={classNames(
																active
																	? 'border'
																	: 'border-2',
																checked
																	? 'border-indigo-500'
																	: 'border-transparent',
																'absolute -inset-px rounded-lg pointer-events-none'
															)}
															aria-hidden="true"
														/>
													</>
												)}
											</RadioGroup.Option>
										))}
									</div>
								</RadioGroup>
							</div>
							{order && (
								<OrderSummary
									order={order}
									vatAmount={vatAmount}
								/>
							)}
						</Form>
					)}
				</Formik>
			</div>
		</div>
	)
}

export default CheckoutForm
