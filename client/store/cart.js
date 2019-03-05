import axios from 'axios'

// ACTION TYPES
const UPDATE_CART = 'UPDATE_CART'
const FETCH_CART = 'FETCH_CART'

// ACTION CREATORS
const fetchCart = cart => ({
  type: FETCH_CART,
  cart
})

const updateCart = cart => ({
  type: UPDATE_CART,
  cart
})

// THUNKS

export const fetchCartThunk = () => async (dispatch, getState) => {
  const state = getState()
  let userId = state.user.id
  const {data} = await axios.get(`/api/cart/${userId}`)
  dispatch(fetchCart(data))
}

export const updateCartThunk = (singleProduct, quantity) => async (
  dispatch,
  getState
) => {
  const state = getState()
  let userId = state.user.id
  await axios.put(`/api/cart/${userId}`, {singleProduct, quantity})
  dispatch(fetchCartThunk())
}

// export const updateQuantityThunk

// export const removeFromCartThunk = (product) => async (dispatch, getState) => {
//   const state = getState()
//   let userId = state.user.id
//   const {data} = await axios.delete(`/api/cart/${userId}`, product)
//   dispatch(updateCart(data))
// }

// REDUCER

const cart = (state = {}, action) => {
  switch (action.type) {
    case FETCH_CART:
      return action.cart
    case UPDATE_CART:
      return action.cart
    default:
      return state
  }
}

export default cart
