import { useContext } from 'react'
import { ProductContext } from '../context/product-context'
import { Link } from 'react-router-dom'

const collections = [
	{
		name: "Women's",
		href: '#',
		imageSrc:
			'https://tailwindui.com/img/ecommerce-images/home-page-04-collection-01.jpg',
		imageAlt: 'Woman wearing a comfortable cotton t-shirt.'
	},
	{
		name: "Men's",
		href: '#',
		imageSrc:
			'https://tailwindui.com/img/ecommerce-images/home-page-04-collection-02.jpg',
		imageAlt: 'Man wearing a comfortable and casual cotton t-shirt.'
	},
	{
		name: 'Desk Accessories',
		href: '#',
		imageSrc:
			'https://tailwindui.com/img/ecommerce-images/home-page-04-collection-03.jpg',
		imageAlt:
			'Person sitting at a wooden desk with paper note organizer, pencil and tablet.'
	}
]
const trendingProducts = [
	{
		id: 1,
		name: 'Leather Long Wallet',
		color: 'Natural',
		price: '$75',
		href: '#',
		imageSrc:
			'https://tailwindui.com/img/ecommerce-images/home-page-04-trending-product-02.jpg',
		imageAlt: 'Hand stitched, orange leather long wallet.'
	}
]
const perks = [
	{
		name: 'Free returns',
		imageUrl:
			'https://tailwindui.com/img/ecommerce/icons/icon-returns-light.svg',
		description:
			'Not what you expected? Place it back in the parcel and attach the pre-paid postage stamp.'
	},
	{
		name: 'Same day delivery',
		imageUrl:
			'https://tailwindui.com/img/ecommerce/icons/icon-calendar-light.svg',
		description:
			'We offer a delivery service that has never been done before. Checkout today and receive your products within hours.'
	},
	{
		name: 'All year discount',
		imageUrl:
			'https://tailwindui.com/img/ecommerce/icons/icon-gift-card-light.svg',
		description:
			'Looking for a deal? You can use the code "ALLYEAR" at checkout and get money off all year round.'
	},
	{
		name: 'For the planet',
		imageUrl:
			'https://tailwindui.com/img/ecommerce/icons/icon-planet-light.svg',
		description:
			'We’ve pledged 1% of sales to the preservation and restoration of the natural environment.'
	}
]

const offers = [
	{
		name: 'Download the app',
		description: 'Get an exclusive $5 off code',
		href: '#'
	},
	{
		name: "Return when you're ready",
		description: '60 days of free returns',
		href: '#'
	},
	{
		name: 'Sign up for our newsletter',
		description: '15% off your first order',
		href: '#'
	}
]

function classNames(...classes) {
	return classes.filter(Boolean).join(' ')
}

const Storefront = () => {
	const productCtx = useContext(ProductContext)

	const allProducts = productCtx.products.map(item => ({
		_id: item._id,
		brand: item.brand,
		title: item.title,
		price: item.price,
		imageSrc: item.images[0].src
	}))

	const trendingRackets = [
        {
            "_id": "615c13d540b9d83fa691eb42",
            "brand": "Babolat",
            "title": "Rafael Nadal Pure Aero",
            "price": "259.95",
            "imageSrc": "https://firebasestorage.googleapis.com/v0/b/compete-abdab.appspot.com/o/3a.jpg?alt=media&token=b81ca23b-e310-46be-8dd9-723463dd78cc"
        },
        {
            "_id": "615c13d540b9d83fa691eb47",
            "brand": "Lacoste",
            "title": "L20",
            "price": "290.00",
            "imageSrc": "https://firebasestorage.googleapis.com/v0/b/compete-abdab.appspot.com/o/8a.jpg?alt=media&token=469c0738-6dad-4a05-9c92-7f6c7b2df731"
        },
        {
            "_id": "615c13d540b9d83fa691eb4d",
            "brand": "HEAD",
            "title": "Graphene 360+ Speed MP",
            "price": "250.00",
            "imageSrc": "https://firebasestorage.googleapis.com/v0/b/compete-abdab.appspot.com/o/14a.jpg?alt=media&token=9872fe9d-c103-4870-9211-edd274c39ad6"
        },
        {
            "_id": "615c13d540b9d83fa691eb52",
            "brand": "Prince",
            "title": "Phantom 100X",
            "price": "239.95",
            "imageSrc": "https://firebasestorage.googleapis.com/v0/b/compete-abdab.appspot.com/o/19a.jpg?alt=media&token=db5648e9-d89f-4bbc-a1e3-e9dea04ba736"
        }
    ]
    
	return (
		<main>
			{/* Hero */}
			<div className="flex flex-col border-b border-gray-200 lg:border-0">
				<div className="relative">
					<div
						aria-hidden="true"
						className="hidden absolute w-1/2 h-full bg-gray-100 lg:block"
					/>
					<div className="relative bg-gray-100 lg:bg-transparent">
						<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 lg:grid lg:grid-cols-2">
							<div className="max-w-2xl mx-auto py-24 lg:py-64 lg:max-w-none">
								<div className="lg:pr-16">
									<h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl xl:text-6xl">
										Focus on what matters
									</h1>
									<p className="mt-4 text-xl text-gray-600">
										Lorem ipsum dolor sit amet, consectetur
										adipiscing elit, sed do eiusmod tempor
										incididunt ut labore et dolore magna
										aliqua.
									</p>
									<div className="mt-6">
										<a
											href="#"
											className="inline-block bg-indigo-600 border border-transparent py-3 px-8 rounded-md font-medium text-white hover:bg-indigo-700">
											Shop Tennis Rackets
										</a>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="w-full h-48 sm:h-64 lg:absolute lg:top-0 lg:right-0 lg:w-1/2 lg:h-full">
						<img
							src="https://firebasestorage.googleapis.com/v0/b/compete-abdab.appspot.com/o/julian-schiemann-Z4Sxy1_3wdY-unsplash.jpg?alt=media&token=b70f86c5-f161-434e-9fad-9ed54ae59517"
							alt=""
							className="w-full h-full object-center object-cover"
						/>
					</div>
				</div>
			</div>

			<section aria-labelledby="trending-heading">
				<div className="max-w-7xl mx-auto py-24 px-4 sm:px-6 sm:py-32 lg:pt-32 lg:px-8">
					<div className="md:flex md:items-center md:justify-between">
						<h2
							id="favorites-heading"
							className="text-2xl font-extrabold tracking-tight text-gray-900">
							Trending rackets
						</h2>
					</div>

					<div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-4 md:gap-y-0 lg:gap-x-8">
						{trendingRackets.map(product => (
							<div key={product._id} className="group relative rounded-lg border border-1 border-gray-200 shadow-lg p-5">
								<div className="w-full h-56 rounded-md overflow-hidden group-hover:opacity-75 lg:h-72 xl:h-80">
									<img
										src={product.imageSrc}
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

			<section
				aria-labelledby="perks-heading"
				className="bg-gray-50 border-t border-gray-200">
				<h2 id="perks-heading" className="sr-only">
					Our perks
				</h2>

				<div className="max-w-7xl mx-auto py-24 px-4 sm:px-6 sm:py-32 lg:px-8">
					<div className="grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 lg:gap-x-8 lg:gap-y-0">
						{perks.map(perk => (
							<div
								key={perk.name}
								className="text-center md:flex md:items-start md:text-left lg:block lg:text-center">
								<div className="md:flex-shrink-0">
									<div className="flow-root">
										<img
											className="-my-1 h-24 w-auto mx-auto"
											src={perk.imageUrl}
											alt=""
										/>
									</div>
								</div>
								<div className="mt-6 md:mt-0 md:ml-4 lg:mt-6 lg:ml-0">
									<h3 className="text-sm font-semibold tracking-wide uppercase text-gray-900">
										{perk.name}
									</h3>
									<p className="mt-3 text-sm text-gray-500">
										{perk.description}
									</p>
								</div>
							</div>
						))}
					</div>
				</div>
			</section>
		</main>
	)
}

export default Storefront
