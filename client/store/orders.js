import axios from 'axios'

// ACTION TYPES

const FETCH_ORDERS = 'FETCH_ORDERS'
const FETCH_SINGLE_ORDER = 'FETCH_SINGLE_ORDER'

// ACTION CREATORS
const fetchOrders = orders => ({
  type: FETCH_ORDERS,
  orders
})

const fetchSingleOrder = order => ({
  type: FETCH_SINGLE_ORDER,
  order
})

// THUNKS

export const fetchOrdersThunk = () => async dispatch => {
  const {data} = await axios.get('/api/orders')
  dispatch(fetchOrders(data))
}

export const fetchSingleOrderThunk = id => async dispatch => {
  console.log('this is the thunk')
  const {data} = await axios.get(`/api/orders/${id}`)
  dispatch(fetchSingleOrder(data))
}

// REDUCER

const initialState = {
  allOrders: [],
  singleOrder: {}
}

const orders = (state = initialState, action) => {
  // refactor after changing initial state (and change AllOrder accordingly)
  switch (action.type) {
    case FETCH_ORDERS:
      return {...state, allOrders: action.orders}
    case FETCH_SINGLE_ORDER:
      return {...state, singleOrder: action.order}
    default:
      return state
  }
}

export default orders
