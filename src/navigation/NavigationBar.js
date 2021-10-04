import { Fragment, useContext, useEffect } from 'react'
import useHttp from '../hooks/useHttp'
import { UserContext } from '../context/user-context'
import { ProductContext } from '../context/product-context'
import { Popover, Transition } from '@headlessui/react'
import { MenuIcon, ShoppingBagIcon } from '@heroicons/react/outline'
import { NavLink } from 'react-router-dom'

const NavigationBar = ({ onOpenMobileMenu, classNames, navigation }) => {
	const { user, accessToken, updateAccessToken, updateUser } = useContext(UserContext)
	const { products, updateProducts } = useContext(ProductContext)
	const { loading, error, fetchData } = useHttp()

	// load product data

	useEffect(() => {
		const fetchProducts = async () => {
			await fetchData({ url:
				`${process.env.REACT_APP_API_URL}/products/`}, updateProducts
			)
		}
		fetchProducts()
	}, [fetchData])

	// load user data

	useEffect(() => {
		const fetchUserData = async accessToken => {
			const handleResponse = async data => {
				if (data) {
					if (data.error === 'Invalid token') {
						await fetchData(
							{
								url: `${process.env.REACT_APP_API_URL}/auth/token`,
								method: 'POST',
								credentials: 'include'
							},
							updateAccessToken
						)
					} else {
						updateUser({ email: data.email })
					}
				} else {
					updateUser({ email: null })
				}
			}

			await fetchData(
				{
					url: `${process.env.REACT_APP_API_URL}/users/`,
					headers: {
						authorization: 'Bearer ' + accessToken
					}
				},
				handleResponse
			)
		}
		fetchUserData(accessToken)
	}, [accessToken, updateUser, updateAccessToken, fetchData])

	const handleSignOut = async () => {
		try {
			await fetchData(
				{
					url: `${process.env.REACT_APP_API_URL}/auth/logout`,
					method: 'POST',
					authorization: 'Bearer ' + accessToken,
					credentials: 'include'
				},
				() => {}
			)
			updateUser({ email: null })
		} catch (err) {
			console.error(`Failed to log user out ${err}`)
		}
	}

	return (
		<div>
			<header className="relative bg-white">
				<p className="bg-indigo-600 h-10 flex items-center justify-center text-sm font-medium text-white px-4 sm:px-6 lg:px-8">
					Get free delivery on orders over $100
				</p>

				<nav
					aria-label="Top"
					className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="border-b border-gray-200">
						<div className="h-16 flex items-center">
							<button
								type="button"
								className="bg-white p-2 rounded-md text-gray-400 lg:hidden"
								onClick={onOpenMobileMenu}>
								<span className="sr-only">Open menu</span>
								<MenuIcon
									className="h-6 w-6"
									aria-hidden="true"
								/>
							</button>

							{/* Logo */}
							<div className="ml-4 flex lg:ml-0">
								<NavLink to="/">
									<span className="sr-only">Workflow</span>
									<img
										className="h-8 w-auto"
										src="https://tailwindui.com/img/logos/workflow-mark.svg?color=indigo&shade=600"
										alt=""
									/>
								</NavLink>
							</div>

							{/* Flyout menus */}
							<Popover.Group className="hidden lg:ml-8 lg:block lg:self-stretch">
								<div className="h-full flex space-x-8">
									{navigation.categories.map(category => (
										<Popover
											key={category.name}
											className="flex">
											{({ open }) => (
												<>
													<div className="relative flex">
														<Popover.Button
															className={classNames(
																open
																	? 'border-indigo-600 text-indigo-600'
																	: 'border-transparent text-gray-700 hover:text-gray-800',
																'relative z-10 flex items-center transition-colors ease-out duration-200 text-sm font-medium border-b-2 -mb-px pt-px'
															)}>
															{category.name}
														</Popover.Button>
													</div>

													<Transition
														as={Fragment}
														enter="transition ease-out duration-200"
														enterFrom="opacity-0"
														enterTo="opacity-100"
														leave="transition ease-in duration-150"
														leaveFrom="opacity-100"
														leaveTo="opacity-0">
														<Popover.Panel className="absolute z-10 top-full inset-x-0 text-sm text-gray-500">
															{/* Presentational element used to render the bottom shadow, if we put the shadow on the actual panel it pokes out the top, so we use this shorter element to hide the top of the shadow */}
															<div
																className="absolute inset-0 top-1/2 bg-white shadow"
																aria-hidden="true"
															/>

															<div className="relative bg-white">
																<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
																	<div className="grid grid-cols-2 gap-y-10 gap-x-8 py-16">
																		<div className="col-start-2 grid grid-cols-2 gap-x-8">
																			{category.featured.map(
																				item => (
																					<div
																						key={
																							item.name
																						}
																						className="group relative text-base sm:text-sm">
																						<div className="aspect-w-1 aspect-h-1 rounded-lg bg-gray-100 overflow-hidden group-hover:opacity-75">
																							<img
																								src={
																									item.imageSrc
																								}
																								alt={
																									item.imageAlt
																								}
																								className="object-center object-cover"
																							/>
																						</div>
																						<a
																							href={
																								item.href
																							}
																							className="mt-6 block font-medium text-gray-900">
																							<span
																								className="absolute z-10 inset-0"
																								aria-hidden="true"
																							/>
																							{
																								item.name
																							}
																						</a>
																						<p
																							aria-hidden="true"
																							className="mt-1">
																							Shop
																							now
																						</p>
																					</div>
																				)
																			)}
																		</div>
																		<div className="row-start-1 grid grid-cols-3 gap-y-10 gap-x-8 text-sm">
																			{category.sections.map(
																				section => (
																					<div
																						key={
																							section.name
																						}>
																						<p
																							id={`${section.name}-heading`}
																							className="font-medium text-gray-900">
																							{
																								section.name
																							}
																						</p>
																						<ul
																							aria-labelledby={`${section.name}-heading`}
																							className="mt-6 space-y-6 sm:mt-4 sm:space-y-4">
																							{section.items.map(
																								item => (
																									<li
																										key={
																											item.name
																										}
																										className="flex">
																										<a
																											href={
																												item.href
																											}
																											className="hover:text-gray-800">
																											{
																												item.name
																											}
																										</a>
																									</li>
																								)
																							)}
																						</ul>
																					</div>
																				)
																			)}
																		</div>
																	</div>
																</div>
															</div>
														</Popover.Panel>
													</Transition>
												</>
											)}
										</Popover>
									))}

									{navigation.pages.map(page => (
										<a
											key={page.name}
											href={page.href}
											className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800">
											{page.name}
										</a>
									))}
								</div>
							</Popover.Group>

							{!user.email ? (
								<div className="ml-auto flex items-center">
									<div className="hidden md:flex md:flex-1 md:items-center md:justify-end md:space-x-6">
										<NavLink
											to="/account/signin"
											className="text-sm font-medium text-gray-700 hover:text-gray-800">
											Sign in
										</NavLink>
										<span
											className="h-6 w-px bg-gray-200"
											aria-hidden="true"
										/>
										<NavLink
											to="/account/register"
											className="text-sm font-medium text-gray-700 hover:text-gray-800">
											Account
										</NavLink>
									</div>
								</div>
							) : (
								<div className="ml-auto flex items-center">
									<div className="hidden md:flex md:flex-1 md:items-center md:justify-end md:space-x-6">
										<NavLink
											to="/account/"
											className="text-sm font-medium text-gray-700 hover:text-gray-800">
											Account
										</NavLink>
										<span
											className="h-6 w-px bg-gray-200"
											aria-hidden="true"
										/>
										<button
											onClick={handleSignOut}
											className="text-sm font-medium text-gray-700 hover:text-gray-800">
											Sign out
										</button>
									</div>
								</div>
							)}

							{/* Cart */}
							<div className="ml-4 flow-root lg:ml-6">
								<NavLink
									to="/cart"
									className="group -m-2 p-2 flex items-center">
									<ShoppingBagIcon
										className="flex-shrink-0 h-6 w-6 text-gray-400 group-hover:text-gray-500"
										aria-hidden="true"
									/>
									<span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">
										0
									</span>
									<span className="sr-only">
										items in cart, view bag
									</span>
								</NavLink>
							</div>
						</div>
					</div>
				</nav>
			</header>
		</div>
	)
}

export default NavigationBar
