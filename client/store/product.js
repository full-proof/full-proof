import axios from 'axios'

// ACTION TYPES

const FETCH_PRODUCTS = 'FETCH_PRODUCTS'
const fetchProducts = products => ({
  type: FETCH_PRODUCTS,
  products
})

const initialState = {
  allProducts: [],
  singleProduct: {}
}

// THUNKS

export const fetchProductsThunk = () => async dispatch => {
  const {data} = await axios.get('/api/products')
  dispatch(fetchProducts(data))
}

// REDUCER

const products = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PRODUCTS:
      return {...state, allProducts: action.products}
    default:
      return state
  }
}

export default products
