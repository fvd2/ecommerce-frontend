import { useEffect, useState } from 'react'
import useHttp from '../../hooks/useHttp'
import { useParams } from 'react-router'
import { Link } from 'react-router-dom'

const OrderConfirmation = () => {
	const [order, setOrder] = useState()
	const { loading, error, fetchData } = useHttp()
	const params = useParams()

	// load order data
	useEffect(() => {
		const handleOrderData = async orderData => {
			setOrder(orderData)
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
	}, [params.id, fetchData])

  const orderStatusResponse = {
    paid: {
      headline: 'Thank you!',
      title: 'Next up: shipping',
      description: 'Your payment was confirmed. As soon as we ship your order we will e-mail you its tracking information.'
    },
    failed: {
      headline: 'Something went wrong!',
      title: 'Payment not confirmed',
      description: 'Please contact our helpdesk at +31 20 11 11 11 11 or helpdesk@thisisafakewebshop.com, and we will help you find a way to pay for your order.'
    },
    open: {
      headline: 'Something went wrong!',
      title: 'Payment not confirmed',
      description: 'Please contact our helpdesk at +31 20 11 11 11 11 or helpdesk@thisisafakewebshop.com, and we will help you find a way to pay for your order.'
    },
    canceled: {
      headline: 'Something went wrong!',
      title: 'Payment not confirmed',
      description: 'Please contact our helpdesk at +31 20 11 11 11 11 or helpdesk@thisisafakewebshop.com, and we will help you find a way to pay for your order.'
    },
    expired: {
      headline: 'Something went wrong!',
      title: 'Payment not confirmed',
      description: 'Please contact our helpdesk at +31 20 11 11 11 11 or helpdesk@thisisafakewebshop.com, and we will help you find a way to pay for your order.'
    },
    created: {
      headline: 'Something went wrong!',
      title: 'Payment not confirmed',
      description: 'Please contact our helpdesk at +31 20 11 11 11 11 or helpdesk@thisisafakewebshop.com, and we will help you find a way to pay for your order.'
    }
  }

	return (
		<>
			{loading && '...loading'}
			{order && (
				<div className="bg-white">
					<div className="max-w-3xl mx-auto px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
						<div className="max-w-xl">
							<h1 className="text-sm font-semibold uppercase tracking-wide text-indigo-600">
								{orderStatusResponse[order.status].headline}
							</h1>
							<p className="mt-2 text-4xl font-extrabold tracking-tight sm:text-5xl">
              {orderStatusResponse[order.status].title}
							</p>
							<p className="mt-2 text-base text-gray-500">
              {orderStatusResponse[order.status].description}
							</p>
						</div>

						<div className="mt-10 border-t border-gray-200">
							<h2 className="sr-only">Your order</h2>

							<h3 className="sr-only">Items</h3>
							{order.products.map(item => (
								<div
									key={item.productId}
									className="py-10 border-b border-gray-200 flex space-x-6">
									<img
										src={item.images[0].src}
										alt="tennis racket"
										className="flex-none w-20 h-20 object-center object-cover bg-gray-100 rounded-lg sm:w-40 sm:h-40"
									/>
									<div className="flex-auto flex flex-col">
										<div className="text-md">
											<h4 className="font-medium italic text-gray-900">
												{item.brand}
											</h4>
											<h4 className="mt-1 font-medium text-gray-900">
												<Link
													to={`/products/${item.productId}`}>
													{item.title}
												</Link>
											</h4>
										</div>
										<div className="mt-1 flex-1 flex items-start">
											<dl className="flex text-sm divide-x divide-gray-200 space-x-4 sm:space-x-6">
												<div className="flex">
													<dt className="font-medium text-gray-900">
														Quantity:
													</dt>
													<dd className="ml-2 text-gray-700">
														{item.productQuantity}
													</dd>
												</div>
												<div className="pl-4 flex sm:pl-6">
													<dt className="font-medium ml-2 text-gray-700">
														Size:
													</dt>
													<dd className="ml-2 text-gray-700">
														{item.size}
													</dd>
												</div>
												<div className="pl-4 flex sm:pl-6">
													<dt className="font-medium text-gray-900">
														Price:
													</dt>
													<dd className="ml-2 text-gray-700">
														€{item.price}
													</dd>
												</div>
											</dl>
										</div>
									</div>
								</div>
							))}

							<div className="sm:ml-40 sm:pl-6">
								<h3 className="sr-only">
									Address and payment information
								</h3>

								<dl className="grid grid-cols-2 gap-x-6 text-sm py-10">
									<div>
										<dt className="font-medium text-gray-900">
											Shipping information
										</dt>
										<dd className="mt-2 text-gray-700">
											<address className="not-italic">
												<span className="block">
													{order.user.shippingAddress
														.givenName +
														' ' +
														order.user
															.shippingAddress
															.familyName}
												</span>
												<span className="block">
													{order.user.shippingAddress
														.streetAndNumber +
														' ' +
														order.user
															.shippingAddress
															.streetAdditional}
												</span>
												<span className="block">
													{order.user.shippingAddress
														.postalCode +
														' ' +
														order.user
															.shippingAddress
															.city}
												</span>
												<span className="block">
													{
														order.user
															.shippingAddress
															.phone
													}
												</span>
											</address>
										</dd>
									</div>
									<div>
										<dt className="font-medium text-gray-900">
											Payment method
										</dt>
										<dd className="mt-2 text-gray-700">
											<div className="not-italic">
												<span className="block">
													iDeal (via mollie)
												</span>
											</div>
										</dd>
									</div>
								</dl>

								<h3 className="sr-only">Summary</h3>

								<dl className="space-y-6 border-t border-gray-200 text-sm pt-10">
									<div className="flex justify-between">
										<dt className="font-medium text-gray-900">
											Total
										</dt>
										<dd className="text-gray-900">
											€{order.totalAmount}
										</dd>
									</div>
								</dl>
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	)
}

export default OrderConfirmation
