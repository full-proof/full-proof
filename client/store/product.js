import axios from 'axios'

// ACTION TYPES

const FETCH_PRODUCTS = 'FETCH_PRODUCTS'
const SELECT_PRODUCT = 'SELECT_PRODUCT'
const ADD_REVIEW = 'ADD_REVIEW'

// ACTION CREATORS
const fetchProducts = products => ({
  type: FETCH_PRODUCTS,
  products
})

const fetchProduct = product => ({
  type: SELECT_PRODUCT,
  product
})

const addReview = newReview => ({
  type: ADD_REVIEW,
  newReview
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

export const addReviewThunk = (productId, user, review) => async dispatch => {
  const {data} = await axios.post(`/api/reviews`, {
    productId,
    userId: user.id,
    review
  })
  const newReview = data

  newReview.user = {name: user.name}
  console.log('newReview', newReview)
  dispatch(addReview(newReview))
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
    case ADD_REVIEW:
      const newSingleProduct = {...state.singleProduct}
      newSingleProduct.reviews.push(action.newReview)
      return {...state, singleProduct: newSingleProduct}
    default:
      return state
  }
}

export default products
