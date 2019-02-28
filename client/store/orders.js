import axios from 'axios'

// ACTION TYPES

const FETCH_ORDERS = 'FETCH_ORDERS'

// ACTION CREATORS
const fetchOrders = orders => ({
  type: FETCH_ORDERS,
  orders
})

// THUNKS

export const fetchOrdersThunk = () => async dispatch => {
  const {data} = await axios.get('/api/orders')
  dispatch(fetchOrders(data))
}

// REDUCER

const orders = (state = [], action) => {
  // refactor after changing initial state (and change AllOrder accordingly)
  switch (action.type) {
    case FETCH_ORDERS:
      return action.orders
    default:
      return state
  }
}

export default orders
