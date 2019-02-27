import axios from 'axios'

// ACTION TYPES

const FETCH_PRODUCTS = 'FETCH_PRODUCTS'
const SELECT_PRODUCT = 'SELECT_PRODUCT'

// ACTION CREATORS
const fetchProducts = products => ({
  type: FETCH_PRODUCTS,
  products
})

const fetchProduct = product => ({
  type: SELECT_PRODUCT,
  product
})

// THUNKS

export const fetchProductsThunk = () => async dispatch => {
  const {data} = await axios.get('/api/products')
  dispatch(fetchProducts(data))
}

export const fetchProductThunk = id => async dispatch => {
  console.log('this is id passed to thunk', id)
  const {data} = await axios.get(`/api/products/${id}`)
  dispatch(fetchProduct(data))
}

// REDUCER
const initialState = {
  allProducts: [],
  singleProduct: {}
}

const products = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PRODUCTS:
      return {...state, allProducts: action.products}
    case SELECT_PRODUCT:
      return {...state, singleProduct: action.product}
    default:
      return state
  }
}

export default products
