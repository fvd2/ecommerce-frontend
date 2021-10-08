import update from 'immutability-helper'

const CartReducer = (state, action) => {
	const postToDb = async ({ products }) => {
		await fetch(`${process.env.REACT_APP_API_URL}/cart/`, {
			method: 'PUT',
			credentials: 'include',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(products)
		})
	}
	let updatedState

	switch (action.type) {
		// if available: populate cart with data from db
		case 'init':
			updatedState = update(state, {
				$set: action.payload
			})

			return updatedState
		case 'add':
			// if product and size not in cart: add, else: increment
			const currentIndex = state.products.findIndex(
				prod =>
					prod.productId === action.payload.product._id &&
					prod.size === action.payload.size
			)
			if (currentIndex === -1) {
				// product AND size not matched: add new
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
			} else {
				// product AND size matched: increment
				updatedState = update(state, {
					products: {
						[currentIndex]: {
							$set: {
								productId: action.payload.product._id,
								productQuantity:
									state.products[currentIndex]
										.productQuantity + 1,
								size: state.products[currentIndex].size
							}
						}
					}
				})
			}
			postToDb(updatedState)
			return updatedState
		case 'delete':
			updatedState = update(state, {
				products: {
					$splice: [[[action.payload.index], 1]]
				}
			})
			postToDb(updatedState)
			return updatedState
		case 'selectQ':
			updatedState = update(state, {
				products: {
					[action.payload.index]: {
						productQuantity: {
							$set: action.payload.value
						}
					}
				}
			})
			postToDb(updatedState)
			return updatedState
		default:
			return state
	}
}

export default CartReducer
