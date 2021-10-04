import update from 'immutability-helper'

const cartReducer = (state, action) => {
	let updatedState
	switch (action.type) {
		case 'init':
			updatedState = update(state, {
				$set: action.payload
			})
			return updatedState
		case 'add':
			// if product and size not in cart: add, else: increment
			const currentIndex = state.products.findIndex(
				prod => (prod.productId === action.payload.product._id && prod.size === action.payload.size)
			)
			console.log(state.products)
			console.log(action.payload)
			console.log(currentIndex)
			if (currentIndex === -1) { // product AND size not matched: add new
				updatedState = update(state, {
					products: {
						$push: [
							{
								productId: action.payload.product._id,
								productQuantity: 1,
								size: action.payload.size
							}
						]
					}
				})
			} else { // product AND size matched: increment
				updatedState = update(state, {
					products: {
						[currentIndex]: {
							$set: {
								productId: action.payload.product._id,
								productQuantity: state.products[currentIndex]
									.productQuantity+1,
								size: state.products[currentIndex]
								.size
							}
						}
					}
				})
			}
			return updatedState
		case 'delete':
			updatedState = update(state)
			return updatedState
		case 'updateQ':
			updatedState = update(state, {
				products: {
					[action.payload.index]: {
						productQuantity: {
							$set: action.payload.value
						}
					}
				}
			})
			return updatedState
		case 'incr':
			updatedState = update(state)
			return updatedState
		case 'decr':
			updatedState = update(state)
			return updatedState
		default:
			return state
	}
}

export default cartReducer
