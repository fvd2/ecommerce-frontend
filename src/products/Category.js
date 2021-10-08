import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { Link } from 'react-router-dom'
import useHttp from '../hooks/useHttp'

const Category = () => {
	const [productsInCategory, setProductsInCategory] = useState([])
	const params = useParams()
	const { fetchData } = useHttp()

	useEffect(() => {
		const handleProductData = async productData => {
			setProductsInCategory(await productData)
		}

		const getCategoryData = async () => {
			if (params.id) {
				await fetchData(
					{
						url: `${process.env.REACT_APP_API_URL}/products/category/${params.id}`
					},
					handleProductData
				)
			}
		}
		getCategoryData()
	}, [params.id, fetchData])

	return (
			<section aria-labelledby="trending-heading">
				<div className="max-w-7xl mx-auto py-24 px-4 sm:px-6 sm:py-32 lg:pt-32 lg:px-8">
					<div className="md:flex md:items-center md:justify-between">
						<h2
							id="favorites-heading"
							className="text-2xl font-extrabold tracking-tight text-gray-900">
							Shop {params.id}
						</h2>
					</div>

					<div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-4 md:gap-y-0 lg:gap-x-8">
						{productsInCategory.map(product => (
							<div
								key={product._id}
								className="group relative rounded-lg border border-1 border-gray-200 shadow-lg p-5">
								<div className="w-full h-56 rounded-md overflow-hidden group-hover:opacity-75 lg:h-72 xl:h-80">
									<img
										src={product.images[0].src}
										alt="tennis racket"
										className="w-full h-full object-center object-contain"
									/>
								</div>
								<h3 className="mt-4 text-sm text-gray-700">
									<Link to={`/products/${product._id}`}>
										<span className="absolute inset-0" />
										{product.title}
									</Link>
								</h3>
								<p className="mt-1 text-sm text-gray-500">
									{product.brand}
								</p>
								<p className="mt-1 text-sm font-medium text-gray-900">
									€{product.price}
								</p>
							</div>
						))}
					</div>
				</div>
			</section>
	)
}

export default Category
