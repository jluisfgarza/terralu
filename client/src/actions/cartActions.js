import shop from '../api/shop'
import * as types from './types'

const receiveProducts = products => ({
  type: types.RECEIVE_PRODUCTS,
  products
})

export const getAllProducts = () => dispatch => {
  shop.getProducts(products => {
    dispatch(receiveProducts(products))
  })
}

const addToCartUnsafe = productId => ({
  type: types.ADD_TO_CART,
  productId
})

export const addToCart = productId => (dispatch, getState) => {
  if (getState().products.byId[productId].inStock > 0) {
    dispatch(addToCartUnsafe(productId))
  }
}

const removeFromCartUnsafe = productId => ({
  type: types.REMOVE_FROM_CART,
  productId
})

export const removeFromCart = productId => (dispatch, getState) => {
  // if (getState().products.byId[productId].inStock > 0) {
    dispatch(removeFromCartUnsafe(productId))
  // }
}

export const checkout = products => (dispatch, getState) => {
  const { cart } = getState()

  dispatch({
    type: types.CHECKOUT_REQUEST
  })
  shop.buyProducts(products, () => {
    dispatch({
      type: types.CHECKOUT_SUCCESS,
      cart
    })
    // Replace the line above with line below to rollback on failure:
    // dispatch({ type: types.CHECKOUT_FAILURE, cart })
  })
}
