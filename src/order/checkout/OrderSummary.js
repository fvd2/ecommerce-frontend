import { Link } from 'react-router-dom'

const OrderSummary = ({ order, vatAmount }) => {
	return (
		<div className="grid col-start-2 row-start-2 col-span-1 mt-10 border-t border-gray-200 pt-10">
			<div>
				<h2 className="text-lg font-medium text-gray-900">
					Order summary
				</h2>

				<div className="mt-4 bg-white border border-gray-200 rounded-lg shadow-sm">
					<h3 className="sr-only">Items in your cart</h3>
					<ul className="divide-y divide-gray-200">
						{order.products.map(item => (
							<li
								key={item.productId}
								className="flex py-6 px-4 sm:px-6">
								<div className="flex-shrink-0">
									<img
										src={item.images[0].src}
										alt="Tennis racket"
										className="w-20 rounded-md"
									/>
								</div>

								<div className="ml-6 flex-1 flex flex-col">
									<div className="flex">
										<div className="min-w-0 flex-1">
											<h4 className="text-md">
												<p className="font-medium italic text-gray-700 hover:text-gray-800">
													{item.brand}
												</p>
											</h4>
											<h4 className="text-sm">
												<Link
													to={`/products/${item._id}`}
													className="font-medium text-gray-700 hover:text-gray-800">
													{item.title}
												</Link>
											</h4>
											<p className="mt-1 text-sm text-gray-500">
												Size: {item.size}
											</p>
											<p className="mt-1 text-sm font-medium text-gray-900">
												€{item.price.toFixed(2)}
											</p>
										</div>
									</div>
								</div>
							</li>
						))}
					</ul>
					<dl className="border-t border-gray-200 py-6 px-4 space-y-6 sm:px-6">
						<div className="flex items-center justify-between">
							<dt className="text-sm">Subtotal excl. 21% VAT</dt>
							<dd className="text-sm font-medium text-gray-900">
								€{(order.totalAmount - vatAmount).toFixed(2)}
							</dd>
						</div>
						<div className="flex items-center justify-between">
							<dt className="text-sm">Shipping</dt>
							<dd className="text-sm font-medium text-gray-900">
								€0.00
							</dd>
						</div>
						<div className="flex items-center justify-between">
							<dt className="text-sm">Value Added Tax (21%)</dt>
							<dd className="text-sm font-medium text-gray-900">
								€{vatAmount}
							</dd>
						</div>
						<div className="flex items-center justify-between border-t border-gray-200 pt-6">
							<dt className="text-base font-medium">
								Total incl. 21% VAT
							</dt>
							<dd className="text-base font-medium text-gray-900">
								€{order.totalAmount.toFixed(2)}
							</dd>
						</div>
					</dl>
					<div className="border-t border-gray-200 py-6 px-4 sm:px-6">
						<button
							type="submit"
							className="w-full bg-indigo-600 border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500">
							Pay order
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}

export default OrderSummary
