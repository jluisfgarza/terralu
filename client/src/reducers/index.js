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
const getQuantity = (state, id) => fromCart.getQuantity(state.cart, id)
const getProduct = (state, id) => fromProducts.getProduct(state.products, id)

export const getTotal = state =>
  getAddedIds(state)
    .reduce((total, id) =>
      total + getProduct(state, id).price * getQuantity(state, id),
      0
    )
    .toFixed(2)

export const getCartProducts = state =>
  getAddedIds(state).map(id => ({
    ...getProduct(state, id),
    quantity: getQuantity(state, id)
  }))
