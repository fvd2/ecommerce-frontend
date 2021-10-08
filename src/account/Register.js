import useHttp from '../hooks/useHttp'
import { useHistory } from 'react-router'

import { Formik, Form, Field } from 'formik'

const Signin = () => {
	const history = useHistory()
	const { fetchData } = useHttp()

	const handleNewAccount = async (email, password) => {
		try {
			await fetchData(
				{
					url: `${process.env.REACT_APP_API_URL}/auth/register`,
					method: 'POST',
					body: JSON.stringify({
						email,
						password
					}),
					headers: {
						'Content-Type': 'application/json'
					}
				}
			)
		} catch (err) {
			console.error(
				`An error occurred when registering a new user: ${err}`
			)
		}
	}

	return (
		<div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
			<div className="sm:mx-auto sm:w-full sm:max-w-md">
				<h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
					Register your account
				</h2>
			</div>

			<div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
				<div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
					<Formik
						initialValues={{
							email: '',
							password: ''
						}}
						validate={values => {
							const errors = {}
							if (!values.email) {
								errors.email = 'Required'
							}
							if (
								!/[A-Za-z0-9]+@[A-Za-z0-9]{2,}\.[A-Za-z]{2,}/i.test(
									values.email
								)
							) {
								errors.email =
									'Please enter a valid e-mail address'
							}
							return errors
						}}
						onSubmit={(values, { setSubmitting }) => {
							handleNewAccount(values.email, values.password)
							setSubmitting(false)
							setTimeout(() => {
								history.push('/account/signin')
							}, 500)
						}}>
						{({ values, handleSubmit }) => (
							<Form className="space-y-6" onSubmit={handleSubmit}>
								<Field>
									{({ field }) => (
										<div>
											<label
												htmlFor="email"
												className="block text-sm font-medium text-gray-700">
												Email address
											</label>
											<div className="mt-1">
												<input
													{...field}
													value={values.email}
													id="email"
													name="email"
													type="email"
													autoComplete="email"
													required
													className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
												/>
											</div>
										</div>
									)}
								</Field>
								<Field>
									{({ field }) => (
										<div>
											<label
												htmlFor="password"
												className="block text-sm font-medium text-gray-700">
												Password
											</label>
											<div className="mt-1">
												<input
													{...field}
													value={values.password}
													id="password"
													name="password"
													type="password"
													autoComplete="current-password"
													required
													className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
												/>
											</div>
										</div>
									)}
								</Field>

								<div>
									<button
										type="submit"
										className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
										Sign in
									</button>
								</div>
							</Form>
						)}
					</Formik>
				</div>
			</div>
		</div>
	)
}

export default Signin
