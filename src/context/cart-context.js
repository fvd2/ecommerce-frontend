import { createContext, useReducer } from 'react'
import CartReducer from '../reducers/cart-reducer'

const CartContextProvider = ({ children }) => {
	const [cart, dispatch] = useReducer(CartReducer, {
		_id: '',
		userId: null,
		products: []
	})

	const handleCartUpdate = (type, payload) => {
		dispatch({ type, payload })
	}

	const cartValues = {
		cart,
		dispatch,
		cartSize: cart.products.length,
		onCartUpdate: handleCartUpdate
	}

	return (
		<CartContext.Provider value={cartValues}>
			{children}
		</CartContext.Provider>
	)
}

export const CartContext = createContext()
export default CartContextProvider
