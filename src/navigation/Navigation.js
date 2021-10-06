import { useContext, useEffect, useRef, useState } from 'react'
import useHttp from '../hooks/useHttp'
import { UserContext } from '../context/user-context'
import { CartContext } from '../context/cart-context'
import { ProductContext } from '../context/product-context'
import MobileMenu from './MobileMenu'
import NavigationBar from './NavigationBar'
import { useHistory } from 'react-router-dom'

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
						{ name: 'ALL', href: '/products' },
						{
							name: 'HEAD',
							href: '/categories/HEAD'
						},
						{
							name: 'Wilson',
							href: '/categories/Wilson'
						},
						{
							name: 'Babolat',
							href: '/categories/Babolat'
						},
						{
							name: 'Yonex',
							href: '/categories/Yonex'
						},
						{
							name: 'Pacific',
							href: '/categories/Pacific'
						},
						{
							name: 'PROKENNEX',
							href: '/categories/PROKENNEX'
						},
						{
							name: 'Prince',
							href: '/categories/Prince'
						},
						{
							name: 'Lacoste',
							href: '/categories/Lacoste'
						},
						{
							name: 'Dunlop',
							href: '/categories/Dunlop'
						},
						{
							name: 'Technifibre',
							href: '/categories/Technifibre'
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

const Navigation = () => {
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
	const mountedRef = useRef(true)
	const { user, accessToken, updateAccessToken, updateUser } =
		useContext(UserContext)
	const { dispatch, cartSize } = useContext(CartContext)
	const { products, productsIndexMap, updateProducts } =
		useContext(ProductContext)
	const { loading, error, fetchData } = useHttp()
	const history = useHistory()

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
		return () => updateUser({ email: null })
	}, [accessToken, updateUser, updateAccessToken, fetchData])

	// load product data
	useEffect(() => {
		const fetchProducts = async () => {
			await fetchData(
				{ url: `${process.env.REACT_APP_API_URL}/products/` },
				updateProducts
			)
		}
		if (mountedRef.current) {
			fetchProducts()
		} else return
		return () => updateProducts([])
	}, [fetchData, updateProducts])

	// load existing or create new shopping session
	useEffect(() => {
		const handleInitialCart = async cartData => {
			dispatch({ type: 'init', payload: await cartData })
		}
		const setCart = async () => {
			await fetchData(
				{
					url: `${process.env.REACT_APP_API_URL}/cart/`,
					credentials: 'include',
					headers: {
						authorization: 'Bearer ' + accessToken
					}
				},
				handleInitialCart
			)
		}
		if (mountedRef.current) {
			setCart()
		} else return
		return () => {
			mountedRef.current = false
		}
	}, [fetchData, dispatch, accessToken])

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
				cartSize={cartSize}
				onOpenMobileMenu={openMobileMenu}
				classNames={classNames}
				navigation={navigation}
			/>
		</div>
	)
}

export default Navigation
