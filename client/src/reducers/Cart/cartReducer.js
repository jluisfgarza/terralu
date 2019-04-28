import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  REMOVE_PRODUCT_FROM_CART,
  CLEAR_CART,
  CHECKOUT_REQUEST,
  CHECKOUT_FAILURE
} from '../../actions/types'

const initialState = {
  addedIds: [],
  quantityById: {}
}

const addedIds = (state = initialState.addedIds, action) => {
  switch (action.type) {
    case ADD_TO_CART: {
      if (state.indexOf(action.productId) !== -1) {
        return state
      }
      return [ ...state, action.productId ]
    }
    case REMOVE_FROM_CART: {
      if (state.indexOf(action.productId) !== -1) {
        return state
      }
      return [ ...state, action.productId ]
    }
    case REMOVE_PRODUCT_FROM_CART: {
      let indexToDel = state.findIndex((p) => p.id === action._id);
      return [...state.slice(0, indexToDel), ...state.slice(indexToDel+1)];
    }
    case CLEAR_CART: {
      return initialState.addedIds
    }
    default:
      return state
  }
}

const quantityById = (state = initialState.quantityById, action) => {
  switch (action.type) {
    case ADD_TO_CART: {
        const { productId } = action
      return { ...state,
        [productId]: (state[productId] || 0) + 1,
      }
    }
    case REMOVE_FROM_CART: {
      const { productId } = action
        return { ...state, [productId]: (state[productId] || 0) - 1,
      }
    }
    case REMOVE_PRODUCT_FROM_CART: {
      delete state[action.product._id];
      return state;
    }
    case CLEAR_CART: {
      return initialState.quantityById
    }
    default:
      return state
  }
}

export const getQuantity = (state, productId) =>
  state.quantityById[productId] || 0

export const getAddedIds = state => state.addedIds

const cart = (state = initialState, action) => {
  switch (action.type) {
    case CHECKOUT_REQUEST:
      return initialState
    case CHECKOUT_FAILURE:
      return action.cart
    default:
      return {
        addedIds: addedIds(state.addedIds, action),
        quantityById: quantityById(state.quantityById, action)
      }
  }
}

export default cart
