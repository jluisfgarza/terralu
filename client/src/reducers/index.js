import { combineReducers } from "redux";
import authReducer from "./Auth/authReducer";
import errorReducer from "./Auth/errorReducer";
import cart, * as fromCart from './Cart/cartReducer'
import products, * as fromProducts from './Cart/productsReducer'

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  cart,
  products
})

const getAddedIds = state => fromCart.getAddedIds(state.cart)
const getQuantity = (state, _id) => fromCart.getQuantity(state.cart, _id)
const getProduct = (state, _id) => fromProducts.getProduct(state.products, _id)

export const getTotal = state =>
  getAddedIds(state)
    .reduce((total, _id) =>
      total + getProduct(state, _id).price * getQuantity(state, _id),
      0
    )
    .toFixed(2)

export const getCartProducts = state =>
  getAddedIds(state).map(_id => ({
    ...getProduct(state, _id),
    quantity: getQuantity(state, _id)
  }))
