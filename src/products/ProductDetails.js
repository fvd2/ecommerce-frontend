import { useContext, useEffect, useState } from 'react'
import { Tab } from '@headlessui/react'
import { StarIcon } from '@heroicons/react/solid'
import { HeartIcon } from '@heroicons/react/outline'
import Breadcrumb from './Breadcrumb'
import { ProductContext } from '../context/product-context'
import { useParams } from 'react-router'
import useHttp from '../hooks/useHttp'

const breadcrumbs = [{ id: 1, name: 'Men', href: '#' }]
const DUMMY = {
	name: 'Zip Tote Basket',
	price: '$140',
	rating: 4,
	images: [
		{
			id: 1,
			name: 'Angled view',
			src: 'https://tailwindui.com/img/ecommerce-images/product-page-03-product-01.jpg',
			alt: 'Angled front view with bag zipped and handles upright.'
		},
		{
			id: 2,
			name: 'Angled view',
			src: 'https://tailwindui.com/img/ecommerce-images/product-page-03-product-01.jpg',
			alt: 'Angled front view with bag zipped and handles upright.'
		},
		{
			id: 3,
			name: 'Angled view',
			src: 'https://tailwindui.com/img/ecommerce-images/product-page-03-product-01.jpg',
			alt: 'Angled front view with bag zipped and handles upright.'
		}
		// More images...
	],
	colors: [
		{
			name: 'Washed Black',
			bgColor: 'bg-gray-700',
			selectedColor: 'ring-gray-700'
		},
		{ name: 'White', bgColor: 'bg-white', selectedColor: 'ring-gray-400' },
		{
			name: 'Washed Gray',
			bgColor: 'bg-gray-500',
			selectedColor: 'ring-gray-500'
		}
	],
	description: `
      <p>The Zip Tote Basket is the perfect midpoint between shopping tote and comfy backpack. With convertible straps, you can hand carry, should sling, or backpack this convenient and spacious bag. The zip top and durable canvas construction keeps your goods protected for all-day use.</p>
    `,
	details: [
		{
			name: 'Features',
			items: [
				'Multiple strap configurations',
				'Spacious interior with top zip',
				'Leather handle and tabs',
				'Interior dividers',
				'Stainless strap loops',
				'Double stitched construction',
				'Water-resistant'
			]
		}
		// More sections...
	]
}

const classNames = (...classes) => {
	return classes.filter(Boolean).join(' ')
}

const ProductDetails = () => {
	const { loading, error, fetchData } = useHttp()

	const [product, setProduct] = useState({
		brand: '',
		price: '',
		title: '',
		description: '',
		images: []
	})
	const { products } = useContext(ProductContext)
	const params = useParams()

	useEffect(() => {
		const handleProduct = async productData => {
			setProduct(await productData)
		}

		const getProduct = async () => {
			if (params.id) {
				await fetchData(
					{
						url: `${process.env.REACT_APP_API_URL}/products/${params.id}`
					},
					handleProduct
				)
			}
		}
		getProduct()
	}, [params.id, fetchData])

	return (
		<div className="bg-white">
			<Breadcrumb breadcrumbs={breadcrumbs} />
			<div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
				<div className="lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-start">
					{/* Image gallery */}
					<Tab.Group as="div" className="flex flex-col-reverse">
						{/* Image selector */}
						<div className="hidden mt-6 w-full max-w-2xl mx-auto sm:block lg:max-w-none">
							<Tab.List className="grid grid-cols-4 gap-6">
								{product.images.map(image => (
									<Tab
										key={image.id}
										className="relative h-24 bg-white rounded-md flex items-center justify-center text-sm font-medium uppercase text-gray-900 cursor-pointer hover:bg-gray-50 focus:outline-none focus:ring focus:ring-offset-4 focus:ring-opacity-50">
										{({ selected }) => (
											<>
												<span className="sr-only">
													{image.name}
												</span>
												<span className="absolute inset-0 rounded-md overflow-hidden">
													<img
														src={image.src}
														alt=""
														className="w-full h-full object-center object-cover"
													/>
												</span>
												<span
													className={classNames(
														selected
															? 'ring-indigo-500'
															: 'ring-transparent',
														'absolute inset-0 rounded-md ring-2 ring-offset-2 pointer-events-none'
													)}
													aria-hidden="true"
												/>
											</>
										)}
									</Tab>
								))}
							</Tab.List>
						</div>

						<Tab.Panels className="w-full aspect-w-1 aspect-h-1">
							{product.images.map(image => (
								<Tab.Panel key={image.id}>
									<img
										src={image.src}
										alt={image.alt}
										className="w-full h-full object-center object-cover sm:rounded-lg"
									/>
								</Tab.Panel>
							))}
						</Tab.Panels>
					</Tab.Group>

					{/* Product info */}
					<div className="mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0">
						<h1 className="text-3xl font-extrabold tracking-tight text-gray-900">
							{product.title}
						</h1>

						<div className="mt-3">
							<h2 className="sr-only">Product information</h2>
							<p className="text-3xl text-gray-900">
								{product.price}
							</p>
						</div>

						{/* Reviews */}
						<div className="mt-3">
							<h3 className="sr-only">Reviews</h3>
							<div className="flex items-center">
								<div className="flex items-center">
									{[0, 1, 2, 3, 4].map(rating => (
										<StarIcon
											key={rating}
											className={classNames(
												product.rating > rating
													? 'text-indigo-500'
													: 'text-gray-300',
												'h-5 w-5 flex-shrink-0'
											)}
											aria-hidden="true"
										/>
									))}
								</div>
								<p className="sr-only">
									{product.rating} out of 5 stars
								</p>
							</div>
						</div>

						<div className="mt-6">
							<h3 className="sr-only">Description</h3>

							<div
								className="text-base text-gray-700 space-y-6"
								dangerouslySetInnerHTML={{
									__html: product.description
								}}
							/>
						</div>

						<form className="mt-6">
							<div className="mt-10 flex sm:flex-col1">
								<button
									type="submit"
									className="max-w-xs flex-1 bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500 sm:w-full">
									Add to bag
								</button>

								<button
									type="button"
									className="ml-4 py-3 px-3 rounded-md flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-500">
									<HeartIcon
										className="h-6 w-6 flex-shrink-0"
										aria-hidden="true"
									/>
									<span className="sr-only">
										Add to favorites
									</span>
								</button>
							</div>
						</form>

						<section
							aria-labelledby="details-heading"
							className="mt-12">
							<h2 id="details-heading" className="sr-only">
								Additional details
							</h2>
						</section>
					</div>
				</div>
			</div>
		</div>
	)
}

export default ProductDetails
