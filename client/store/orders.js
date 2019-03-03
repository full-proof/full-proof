import axios from 'axios'

// ACTION TYPES

const FETCH_ORDERS = 'FETCH_ORDERS'
const FETCH_SINGLE_ORDER = 'FETCH_SINGLE_ORDER'
const FILTER_ORDERS = 'FILTER_ORDERS'
const UPDATE_ORDER = 'UPDATE_ORDER'

// ACTION CREATORS
const fetchOrders = orders => ({
  type: FETCH_ORDERS,
  orders
})

const fetchSingleOrder = order => ({
  type: FETCH_SINGLE_ORDER,
  order
})

export const filterOrders = statusArr => ({
  type: FILTER_ORDERS,
  statusArr
})

const updateOrder = cart => ({
  type: UPDATE_ORDER,
  cart
})
// THUNKS

export const fetchOrdersThunk = () => async dispatch => {
  const {data} = await axios.get('/api/orders')
  dispatch(fetchOrders(data))
}

export const fetchUserOrdersThunk = userId => async dispatch => {
  const {data} = await axios.get(`/api/users/${userId}/orders`)
  dispatch(fetchOrders(data))
}

export const fetchSingleOrderThunk = id => async dispatch => {
  const {data} = await axios.get(`/api/orders/${id}`)
  dispatch(fetchSingleOrder(data))
}

export const updateOrderThunk = (singleProduct, quantity) => async dispatch => {
  const {data} = await axios.post('/api/orders', {singleProduct, quantity})
  dispatch(updateOrder(data))
}

// REDUCER

const initialState = {
  allOrders: [],
  filteredOrders: [],
  singleOrder: {},
  cart: {}
}

const orders = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ORDERS:
      return {...state, filteredOrders: action.orders, allOrders: action.orders}
    case FILTER_ORDERS:
      return {
        ...state,
        filteredOrders: state.allOrders.filter(order =>
          action.statusArr.includes(order.status)
        )
      }
    case FETCH_SINGLE_ORDER:
      return {...state, singleOrder: action.order}
    case UPDATE_ORDER:
      return {...state, cart: action.cart}
    default:
      return state
  }
}

export default orders
