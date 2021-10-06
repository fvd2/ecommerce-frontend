import {
	createContext,
	useCallback,
	useReducer,
} from 'react'
import ProductReducer from '../reducers/product-reducer'

const ProductContextProvider = ({ children }) => {
	const [productData, dispatch] = useReducer(ProductReducer, {
		products: [],
		productsIndexMap: new Map()
	})

	const handleProducts = useCallback(products => {
		dispatch({ type: 'set', payload: { products } })
	}, [])

	const productValues = {
		products: productData.products,
		productsIndexMap: productData.productsIndexMap,
		updateProducts: handleProducts
	}

	return (
		<ProductContext.Provider value={productValues}>
			{children}
		</ProductContext.Provider>
	)
}

export const ProductContext = createContext()
export default ProductContextProvider
