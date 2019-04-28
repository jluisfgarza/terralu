import axios from "axios";
import * as types from './types'

const receiveProducts = products => ({
  type: types.RECEIVE_PRODUCTS,
  products
})

export const getAllProducts = () => dispatch => {
  axios
    .get("/api/products")
    .then(res => { 
      // products = res.data
      dispatch(receiveProducts(res.data))
    })
    .catch(err => {
      console.log("Could not fetch Products");
    });
}

const addToCartUnsafe = productId => ({
  type: types.ADD_TO_CART,
  productId
})

export const addToCart = productId => (dispatch, getState) => {
  if (getState().products.byId[productId].inStock > 0) {
    dispatch(addToCartUnsafe(productId))
  } else alert ("Ya no hay inventario!")
}

const removeFromCartUnsafe = productId => ({
  type: types.REMOVE_FROM_CART,
  productId
})

export const removeFromCart = productId => (dispatch, getState) => {
    dispatch(removeFromCartUnsafe(productId))
}

const removeProductFromCartUnsafe = product => ({
  type: types.REMOVE_PRODUCT_FROM_CART,
  product
})

export const removeProductFromCart = product => (dispatch, getState) => {
  // if (getState().products.byId[productId].inStock > 0) {
    dispatch(removeProductFromCartUnsafe(product))
  // }
}

const clearCartUnsafe = () => ({
  type: types.CLEAR_CART,
})

export const clearCart = () => (dispatch, getState) => {
    dispatch(clearCartUnsafe())
}

export const checkout = products => (dispatch, getState) => {
  // const { cart } = getState()

  // dispatch({
  //   type: types.CHECKOUT_REQUEST
  // })

  // buyProducts: (payload, cb, timeout) => setTimeout(() => cb(), timeout || TIMEOUT)
  // buyProducts(products, () => {
  //   dispatch({
  //     type: types.CHECKOUT_SUCCESS,
  //     cart
  //   })
    // Replace the line above with line below to rollback on failure:
    // dispatch({ type: types.CHECKOUT_FAILURE, cart })
  // })
}
