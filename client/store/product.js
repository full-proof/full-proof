import axios from 'axios'

// ACTION TYPES

const FETCH_PRODUCTS = 'FETCH_PRODUCTS'
const SELECT_PRODUCT = 'SELECT_PRODUCT'
const FETCH_CATEGORIES = 'FETCH_CATEGORIES'
const FILTER_PRODUCTS = 'FILTER_PRODUCTS'

// ACTION CREATORS
const fetchProducts = products => ({
  type: FETCH_PRODUCTS,
  products
})

const fetchProduct = product => ({
  type: SELECT_PRODUCT,
  product
})

const fetchCategories = categories => ({
  type: FETCH_CATEGORIES,
  categories
})

export const filterProducts = categoryArr => ({
  type: FILTER_CATEGORIES,
  categoryArr
})

// THUNKS

export const fetchProductsThunk = () => async dispatch => {
  const {data} = await axios.get('/api/products')
  dispatch(fetchProducts(data))
}

export const fetchProductThunk = id => async dispatch => {
  const {data} = await axios.get(`/api/products/${id}`)
  dispatch(fetchProduct(data))
}

export const fetchCategoriesThunk = () => async dispatch => {
  const {data} = await axios.get('/api/products/categories')
  dispatch(fetchCategories(data))
}

// REDUCER
const initialState = {
  allProducts: [],
  filteredProducts: [],
  singleProduct: {},
  categories: []
}

const products = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PRODUCTS:
      return {...state, allProducts: action.products}
    case FILTER_PRODUCTS:
      return {...state}
    case FETCH_CATEGORIES:
      return {...state, categories: action.categories}
    case SELECT_PRODUCT:
      return {...state, singleProduct: action.product}
    default:
      return state
  }
}

export default products
