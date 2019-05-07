import { combineReducers } from 'redux'
import {
  RECEIVE_PRODUCTS,
  ADD_TO_CART,
  REMOVE_FROM_CART,
  // REMOVE_PRODUCT_FROM_CART,
  CLEAR_CART
} from '../../actions/types'

const products = (state, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      return {
        ...state,
        inStock: state.inStock - 1
      }
    case REMOVE_FROM_CART:
      return {
        ...state,
        inStock: state.inStock + 1
      }
    // TODO: add stock from removed
    // case REMOVE_PRODUCT_FROM_CART: 
    //   return {
    //     ...state,
    //     inStock: state.inStock + 1
    //   }
    case CLEAR_CART:
      return state
    default:
      return state
  }
}

const byId = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_PRODUCTS:
      return {
        ...state,
        ...action.products.reduce((obj, product) => {
          obj[product._id] = product
          return obj
        }, {})
      }
    default:
      const { productId } = action;
      if (productId) {
        return {
          ...state,
          [productId]: products(state[productId], action)
        }
      }
      return state
  }
}

const visibleIds = (state = [], action) => {
  switch (action.type) {
    case RECEIVE_PRODUCTS:
      return action.products.map(product => product._id)
    default:
      return state
  }
}

export default combineReducers({
  byId,
  visibleIds
})

export const getProduct = (state, _id) =>
  state.byId[_id]

export const getVisibleProducts = state =>
  state.visibleIds.map(_id => getProduct(state, _id))
