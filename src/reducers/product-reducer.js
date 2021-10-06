import update from 'immutability-helper'

const ProductReducer = (state, action) => {
	let updatedState
	switch (action.type) {
		// if available: populate cart with data from db
		case 'set':
			const productsIndexMap = new Map(
				action.payload.products.map((product, index) => [
					product._id,
					index
				])
			)
			updatedState = update(state, {
				products: {
					$set: action.payload.products,
			    },
                productsIndexMap: { 
                    $set: productsIndexMap 
                }
			})
			return updatedState
		default:
			return state
	}
}

export default ProductReducer
