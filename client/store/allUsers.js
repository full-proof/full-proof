import axios from 'axios'

// ACTION TYPES
const SET_ALL_USERS = 'SET_ALLUSERS'

// ACTION CREATORS
const setAllUsers = users => ({type: SET_ALL_USERS, users})

// THUNK CREATORS
export const fetchAllUsers = () => {
  return async dispatch => {
    try {
      console.log('hitting')
      const {data} = await axios.fetch('/api/users')
      dispatch(setAllUsers(data))
    } catch (err) {
      console.err(err)
    }
  }
}

const initialState = []

const allUsers = (state = initialState, action) => {
  switch (action.type) {
    case SET_ALL_USERS:
      return action.users
    default:
      return state
  }
}

export default allUsers
