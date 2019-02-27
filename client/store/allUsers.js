import axios from 'axios'

// ACTION TYPES
const SET_ALL_USERS = 'SET_ALLUSERS'

// ACTION CREATORS
const setAllUsers = users => ({type: SET_ALL_USERS, users})

// THUNK CREATORS
export const fetchAllUsers = () => {
  return async dispatch => {
    try {
      const {data} = await axios.get('/api/users')
      dispatch(setAllUsers(data))
    } catch (err) {
      console.error(err)
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
