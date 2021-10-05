import { useContext, useEffect, useState } from 'react'
import useHttp from '../hooks/useHttp'
import { UserContext } from '../context/user-context'
import { ProductContext } from '../context/product-context'
import MobileMenu from './MobileMenu'
import NavigationBar from './NavigationBar'
import { Link, useHistory } from 'react-router-dom'

const navigation = {
	categories: [
		{
			id: 'rackets',
			name: 'Tennis rackets',
			featured: [
				{
					_id: '615c13d540b9d83fa691eb43',
					title: 'VCORE 100 (2021)',
					brand: 'Yonex',
					href: '/products/615c13d540b9d83fa691eb43',
					price: '269.90',
					imageSrc:
						'https://firebasestorage.googleapis.com/v0/b/compete-abdab.appspot.com/o/4a.jpg?alt=media&token=b57ad54b-5555-4278-8700-64cfe5fbf24b'
				},
				{
					_id: '615c13d540b9d83fa691eb45',
					title: 'Kinetic Q+ 20',
					brand: 'PROKENNEX',
					href: '/products/615c13d540b9d83fa691eb45',
					price: '265.00',
					imageSrc:
						'https://firebasestorage.googleapis.com/v0/b/compete-abdab.appspot.com/o/6a.jpg?alt=media&token=3d8221ae-0fda-4ee3-8572-a9137709c7ae'
				},
				{
					_id: '615c13d540b9d83fa691eb4f',
					title: 'TF-X1 275',
					brand: 'Technifibre',
					href: '/products/615c13d540b9d83fa691eb4f',
					price: '219.99',
					imageSrc:
						'https://firebasestorage.googleapis.com/v0/b/compete-abdab.appspot.com/o/16a.jpg?alt=media&token=4752fdf3-d05c-4e07-aab0-41462a9deb71'
				},
				{
					_id: '615c13d540b9d83fa691eb4c',
					title: 'Pure Drive',
					brand: 'Babolat',
					href: '/products/615c13d540b9d83fa691eb4c',
					price: '219.95',
					imageSrc:
						'https://firebasestorage.googleapis.com/v0/b/compete-abdab.appspot.com/o/13a.jpg?alt=media&token=ae5c844b-8635-40fb-bc5b-3573b20c1c1d'
				}
			],
			sections: [
				{
					id: 'brands',
					name: 'Brands',
					items: [
						{
							name: 'HEAD',
							href: '#'
						},
						{
							name: 'Wilson',
							href: '#'
						},
						{
							name: 'Babolat',
							href: '#'
						},
						{
							name: 'Yonex',
							href: '#'
						},
						{
							name: 'Pacific',
							href: '#'
						},
						{
							name: 'PROKENNEX',
							href: '#'
						},
						{
							name: 'Prince',
							href: '#'
						},
						{
							name: 'Lacoste',
							href: '#'
						},
						{
							name: 'Dunlop',
							href: '#'
						},
						{
							name: 'Technifibre',
							href: '#'
						}
					]
				}
			]
		}
	]
}

const classNames = (...classes) => {
	return classes.filter(Boolean).join(' ')
}

const Navigation = ({ onFetchCart }) => {
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
	const { user, accessToken, updateAccessToken, updateUser } =
		useContext(UserContext)
	const { products, updateProducts } = useContext(ProductContext)
	const { loading, error, fetchData } = useHttp()
	const history = useHistory()

	// load existing or create new shopping session
	useEffect(() => {
		const setCart = async () => {
			await fetchData(
				{
					url: `${process.env.REACT_APP_API_URL}/cart/`,
					credentials: 'include'
				},
				onFetchCart
			)
		}
		setCart()
	}, [fetchData, onFetchCart])

	// load product data
	useEffect(() => {
		const fetchProducts = async () => {
			await fetchData(
				{ url: `${process.env.REACT_APP_API_URL}/products/` },
				updateProducts
			)
		}
		fetchProducts()
	}, [fetchData, updateProducts])

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
			setMobileMenuOpen(false)
			setTimeout(() => {
				history.push('/')
			}, 500)
		} catch (err) {
			console.error(`Failed to log user out ${err}`)
		}
	}

	const openMobileMenu = () => {
		setMobileMenuOpen(true)
	}

	const closeMobileMenu = () => {
		setMobileMenuOpen(false)
	}

	return (
		<div className="bg-white">
			<MobileMenu
				user={user}
				onSignOut={handleSignOut}
				isOpen={mobileMenuOpen}
				onOpen={openMobileMenu}
				onClose={closeMobileMenu}
				classNames={classNames}
				navigation={navigation}

			/>
			<NavigationBar
				user={user}
				onSignOut={handleSignOut}
				onOpenMobileMenu={openMobileMenu}
				classNames={classNames}
				navigation={navigation}
				onFetchCart={onFetchCart}
			/>
		</div>
	)
}

export default Navigation
