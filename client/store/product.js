/* eslint-disable complexity */
/* eslint-disable no-case-declarations */
import axios from 'axios'

// ACTION TYPES

const FETCH_PRODUCTS = 'FETCH_PRODUCTS'
const SELECT_PRODUCT = 'SELECT_PRODUCT'

const ADD_REVIEW = 'ADD_REVIEW'

const CLEAR_FILTERED_PRODUCTS = 'CLEAR_FILTERED_PRODUCTS'

const FETCH_CATEGORIES = 'FETCH_CATEGORIES'
const FILTER_PRODUCTS_BY_CATEGORY = 'FILTER_PRODUCTS_BY_CATEGORY'

const FILTER_PRODUCTS_BY_TITLE = 'FILTER_PRODUCTS_BY_TITLE'

const ADD_PRODUCT = 'ADD_PRODUCT'

const UPDATE_PRODUCT = 'UPDATE_PRODUCT'

const ADD_CATEGORY = 'ADD_CATEGORY'

// ACTION CREATORS
const fetchProducts = products => ({
  type: FETCH_PRODUCTS,
  products
})

const fetchProduct = product => ({
  type: SELECT_PRODUCT,
  product
})

const addProduct = product => ({
  type: ADD_PRODUCT,
  product
})

const updateProduct = updatedProduct => ({
  type: UPDATE_PRODUCT,
  updatedProduct
})

const addCategory = category => ({
  type: ADD_CATEGORY,
  category
})

const addReview = newReview => ({
  type: ADD_REVIEW,
  newReview
})

const fetchCategories = categories => ({
  type: FETCH_CATEGORIES,
  categories
})

export const filterProductsByCategory = category => ({
  type: FILTER_PRODUCTS_BY_CATEGORY,
  category
})

export const filterProductsByTitle = title => ({
  type: FILTER_PRODUCTS_BY_TITLE,
  title
})

export const clearFilteredProducts = () => ({type: CLEAR_FILTERED_PRODUCTS})

// THUNKS

export const fetchProductsThunk = () => async dispatch => {
  const {data} = await axios.get('/api/products')
  dispatch(fetchProducts(data))
}

export const fetchProductThunk = id => async dispatch => {
  const {data} = await axios.get(`/api/products/${id}`)
  dispatch(fetchProduct(data))
}

export const addProductThunk = product => async dispatch => {
  const {data} = await axios.post(`/api/products`, product)
  const newProduct = data
  dispatch(addProduct(newProduct))
}


export const updateProductThunk = (productId, updateInfo) => async dispatch => {
  const {data} = await axios.put(`/api/products/${productId}`, updateInfo)
  const updatedProduct = data
  dispatch(updateProduct(updatedProduct))
}

export const addCategoryThunk = category => async dispatch => {
  const {data} = await axios.post(`/api/products/categories`, category)
  const newCategory = data
  dispatch(addCategory(newCategory))
}

export const addReviewThunk = (productId, user, review) => async dispatch => {
  const {data} = await axios.post(`/api/reviews`, {
    productId,
    userId: user.id,
    review
  })
  const newReview = data

  newReview.user = {name: user.name}
  dispatch(addReview(newReview))
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
      return {
        ...state,
        allProducts: action.products,
        filteredProducts: action.products
      }
    case ADD_PRODUCT:
      return {...state, allProducts: [...state.allProducts, action.product]}
    case UPDATE_PRODUCT:
      return {...state, singleProduct: action.updatedProduct}
    case ADD_CATEGORY:
      return {...state, categories: [...state.categories, action.category]}
    case CLEAR_FILTERED_PRODUCTS:
      return {...state, filteredProducts: state.allProducts}
    case FILTER_PRODUCTS_BY_CATEGORY:
      return {
        ...state,
        filteredProducts: state.allProducts.filter(product => {
          const foundCategory = product.categories.find(
            currentCategory => action.category === currentCategory.title
          )
          return foundCategory || false
        })
      }
    case FILTER_PRODUCTS_BY_TITLE:
      return {
        ...state,
        filteredProducts: state.filteredProducts.filter(product =>
          product.title.toLowerCase().includes(action.title.toLowerCase())
        )
      }
    case FETCH_CATEGORIES:
      return {...state, categories: action.categories}
    case SELECT_PRODUCT:
      return {...state, singleProduct: action.product}
    case ADD_REVIEW:
      const newSingleProduct = {...state.singleProduct}
      newSingleProduct.reviews.unshift(action.newReview)
      return {...state, singleProduct: newSingleProduct}
    default:
      return state
  }
}

export default products
