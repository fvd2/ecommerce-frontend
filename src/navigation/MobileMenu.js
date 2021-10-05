import { Fragment } from 'react'
import { Dialog, Tab, Transition } from '@headlessui/react'
import { XIcon } from '@heroicons/react/outline'
import { Link } from 'react-router-dom'

const MobileMenu = ({ user, onSignOut, isOpen, onOpen, onClose, classNames, navigation }) => {

	return (
		<>
			{/* Mobile menu */}
			<Transition.Root show={isOpen} as={Fragment}>
				<Dialog
					as="div"
					className="fixed inset-0 flex z-40 lg:hidden"
					onClose={onOpen}>
					<Transition.Child
						as={Fragment}
						enter="transition-opacity ease-linear duration-300"
						enterFrom="opacity-0"
						enterTo="opacity-100"
						leave="transition-opacity ease-linear duration-300"
						leaveFrom="opacity-100"
						leaveTo="opacity-0">
						<Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-25" />
					</Transition.Child>

					<Transition.Child
						as={Fragment}
						enter="transition ease-in-out duration-300 transform"
						enterFrom="-translate-x-full"
						enterTo="translate-x-0"
						leave="transition ease-in-out duration-300 transform"
						leaveFrom="translate-x-0"
						leaveTo="-translate-x-full">
						<div className="relative max-w-xs w-full bg-white shadow-xl pb-12 flex flex-col overflow-y-auto">
							<div className="px-4 pt-5 pb-2 flex">
								<button
									type="button"
									className="-m-2 p-2 rounded-md inline-flex items-center justify-center text-gray-400"
									onClick={onClose}>
									<span className="sr-only">Close menu</span>
									<XIcon
										className="h-6 w-6"
										aria-hidden="true"
									/>
								</button>
							</div>

							{/* Links */}
							<Tab.Group as="div" className="mt-2">
								<div className="border-b border-gray-200">
									<Tab.List className="-mb-px flex px-4 space-x-8">
										{navigation.categories.map(category => (
											<Tab
												key={category.name}
												className={({ selected }) =>
													classNames(
														selected
															? 'text-indigo-600 border-indigo-600'
															: 'text-gray-900 border-transparent',
														'flex-1 whitespace-nowrap py-4 px-1 border-b-2 text-base font-medium'
													)
												}>
												{category.name}
											</Tab>
										))}
									</Tab.List>
								</div>
								<Tab.Panels as={Fragment}>
									{navigation.categories.map(category => (
										<Tab.Panel
											key={category.name}
											className="pt-10 pb-8 px-4 space-y-10">
											{category.sections.map(section => (
												<div key={section.name}>
													<p
														id={`${category.id}-${section.id}-heading-mobile`}
														className="font-medium text-gray-900">
														{section.name}
													</p>
													<ul
														aria-labelledby={`${category.id}-${section.id}-heading-mobile`}
														className="mt-6 flex flex-col space-y-6">
														{section.items.map(
															item => (
																<li
																	key={
																		item.name
																	}
																	className="flow-root">
																	<a
																		href={
																			item.href
																		}
																		className="-m-2 p-2 block text-gray-500">
																		{
																			item.name
																		}
																	</a>
																</li>
															)
														)}
													</ul>
												</div>
											))}
										</Tab.Panel>
									))}
								</Tab.Panels>
							</Tab.Group>
							{!user.email ? (
								<div className="border-t border-gray-200 py-6 px-4 space-y-6">
									<div className="flow-root">
										<Link
											to="/account/signin"
											className="-m-2 p-2 block font-medium text-gray-900">
											Sign in
										</Link>
									</div>
									<div className="flow-root">
										<Link
											to="/account/register"
											className="-m-2 p-2 block font-medium text-gray-900">
											Create account
										</Link>
									</div>
								</div>
							) : (
								<div className="border-t border-gray-200 py-6 px-4 space-y-6">
									<div className="flow-root">
										<Link
											to="/account/"
											className="-m-2 p-2 block font-medium text-gray-900">
											Account
										</Link>
									</div>
									<div className="flow-root">
										<button
											onClick={onSignOut}
											className="-m-2 p-2 block font-medium text-gray-900">
											Sign out
										</button>
									</div>
								</div>
							)}
						</div>
					</Transition.Child>
				</Dialog>
			</Transition.Root>
		</>
	)
}

export default MobileMenu
