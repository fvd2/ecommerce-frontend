import { useContext } from 'react'
import { UserContext } from '../context/user-context'
import { Formik, Form, Field } from 'formik'
import useHttp from '../hooks/useHttp'

const Account = () => {
	const { user, accessToken } = useContext(UserContext)
	const { loading, error, fetchData } = useHttp()

	const handleSettingsUpdate = async userData => {
		const {
			firstName: givenName,
			lastName: familyName,
			...otherData
		} = userData
		const updateObj = {
			billingAddress: { givenName, familyName, ...otherData },
			shippingAddress: { givenName, familyName, ...otherData }
		}
		await fetchData({
			url: `${process.env.REACT_APP_API_URL}/users/update`,
			method: 'POST',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json',
				authorization: 'Bearer ' + accessToken
			},
			body: JSON.stringify(updateObj)
		})
	}

	console.log(user)

	return (
		user &&
		user.email && (
			<>
				<div className="bg-gray-50">
					<div className="max-w-2xl mx-auto pt-16 pb-24 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
						<h2 className="sr-only">Checkout</h2>
						<Formik
							initialValues={{
								email: user.email ? user.email : '',
								givenName:
									user.shippingAddress &&
									user.shippingAddress.givenName
										? user.shippingAddress.givenName
										: '',
								familyName:
									user.shippingAddress &&
									user.shippingAddress.familyName
										? user.shippingAddress.familyName
										: '',
								streetAndNumber:
									user.shippingAddress &&
									user.shippingAddress.streetAndNumber
										? user.shippingAddress.streetAndNumber
										: '',
								streetAdditional:
									user.shippingAddress &&
									user.shippingAddress.streetAdditional
										? user.shippingAddress.streetAdditional
										: '',
								postalCode:
									user.shippingAddress &&
									user.shippingAddress.postalCode
										? user.shippingAddress.postalCode
										: '',
								city:
									user.shippingAddress &&
									user.shippingAddress.city
										? user.shippingAddress.city
										: '',
								country:
									user.shippingAddress &&
									user.shippingAddress.country
										? user.shippingAddress.country
										: 'NL',
								phone:
									user.shippingAddress &&
									user.shippingAddress.phone
										? user.shippingAddress.phone
										: ''
							}}
							// TODO: add additional validation
							validate={values => {
								const errors = {}
								if (!values.phone) {
									errors.city = 'Required'
								}
								if (!/^\+?[1-9]\d{5,14}$/i.test(values.phone)) {
									errors.phone =
										'Please enter your phone number including country code (e.g. +31 6 1111 1111)'
								}
								if (!values.givenName) {
									errors.givenName = 'Required'
								}
								if (!values.familyName) {
									errors.familyName = 'Required'
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
								return errors
							}}
							onSubmit={(values, { setSubmitting }) => {
								handleSettingsUpdate(values)
								setSubmitting(false)
							}}>
							{({ values, errors, handleSubmit }) => (
								<Form
									onSubmit={handleSubmit}
									className="lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16">
									<div className="grid col-start-1 col-span-1">
										<h2 className="text-lg font-medium text-gray-900">
											Shipping information
										</h2>

										<div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4 sm:border-b sm:border-gray-200">
											<Field>
												{({ field }) => (
													<div>
														<label
															htmlFor="givenName"
															className="block text-sm font-medium text-gray-700">
															First name
														</label>
														<div className="mt-1">
															<input
																{...field}
																value={
																	values.givenName
																}
																type="text"
																id="givenName"
																name="givenName"
																autoComplete="given-name"
																required
																className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
															/>
														</div>
														<span
															className={`pt-2 block text-xs font-medium ${
																errors.givenName
																	? 'text-red-700'
																	: 'text-gray-700'
															}`}>
															{errors.givenName}
														</span>
													</div>
												)}
											</Field>

											<Field>
												{({ field }) => (
													<div>
														<label
															htmlFor="familyName"
															className="block text-sm font-medium text-gray-700">
															Last name
														</label>
														<div className="mt-1">
															<input
																{...field}
																value={
																	values.familyName
																}
																type="text"
																id="familyName"
																name="familyName"
																autoComplete="family-name"
																required
																className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
															/>
														</div>
														<span
															className={`pt-2 block text-xs font-medium ${
																errors.familyName
																	? 'text-red-700'
																	: 'text-gray-700'
															}`}>
															{errors.familyName}
														</span>
													</div>
												)}
											</Field>

											<Field>
												{({ field }) => (
													<div className="sm:col-span-2">
														<label
															htmlFor="streetAndNumber"
															className="block text-sm font-medium text-gray-700">
															Street address and
															number
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
														<span
															className={`pt-2 block text-xs font-medium ${
																errors.streetAndNumber
																	? 'text-red-700'
																	: 'text-gray-700'
															}`}>
															{
																errors.streetAndNumber
															}
														</span>
													</div>
												)}
											</Field>

											<Field>
												{({ field }) => (
													<div className="sm:col-span-2">
														<label
															htmlFor="streetAdditional"
															className="block text-sm font-medium text-gray-700">
															Apartment, suite,
															etc.
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
														<span
															className={`pt-2 block text-xs font-medium ${
																errors.streetAdditional
																	? 'text-red-700'
																	: 'text-gray-700'
															}`}>
															{
																errors.streetAdditional
															}
														</span>
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
														<span
															className={`pt-2 block text-xs font-medium ${
																errors.postalCode
																	? 'text-red-700'
																	: 'text-gray-700'
															}`}>
															{errors.postalCode}
														</span>
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
																value={
																	values.city
																}
																type="text"
																name="city"
																id="city"
																required
																className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
															/>
														</div>
														<span
															className={`pt-2 block text-xs font-medium ${
																errors.city
																	? 'text-red-700'
																	: 'text-gray-700'
															}`}>
															{errors.city}
														</span>
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
																value={
																	values.country
																}
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
																value={
																	values.phone
																}
																type="text"
																name="phone"
																required
																id="phone"
																autoComplete="tel"
																className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
															/>
														</div>
														<span
															className={`pt-2 block text-xs font-medium ${
																errors.phone
																	? 'text-red-700'
																	: 'text-gray-700'
															}`}>
															{errors.phone}
														</span>
													</div>
												)}
											</Field>
											<button
												type="submit"
												disabled={
													Object.keys(errors).length >
													0
												}
												className={Object.keys(errors).length >
													0 ? 
													'w-full col-span-2 bg-indigo-600 disabled:opacity-30 cursor-not-allowed border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500' :
													'w-full col-span-2 bg-indigo-600 border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500'
												
												}>
												Update contact information
											</button>
										</div>
									</div>
								</Form>
							)}
						</Formik>
					</div>
				</div>
			</>
		)
	)
}

export default Account
