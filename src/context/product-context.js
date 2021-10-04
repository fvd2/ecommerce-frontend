import { createContext, useCallback, useState } from 'react'

const ProductContextProvider = ({ children }) => {
	const [products, setProducts] = useState([])

    const handleProducts = useCallback((productData) => {
        setProducts(productData)
    }, [])

	const productValues = {
		products,
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
