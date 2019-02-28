import axios from 'axios'

// ACTION TYPES
const SET_ALL_USERS = 'SET_ALLUSERS'
const SET_UPDATED_USER = 'SET_UPDATED_USER'
const REMOVE_DELETED_USER = 'REMOVE_DELETED_USER'

// ACTION CREATORS
const setAllUsers = users => ({type: SET_ALL_USERS, users})
const setUpdatedUser = updatedUser => ({type: SET_UPDATED_USER, updatedUser})
const removeDeletedUser = deletedUserId => ({
  type: REMOVE_DELETED_USER,
  deletedUserId
})

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

export const updateUser = (userId, updatedInfo) => {
  return async dispatch => {
    try {
      const {data} = await axios.put(`/api/users/${userId}`, updatedInfo)
      dispatch(setUpdatedUser(data))
    } catch (err) {
      console.error(err)
    }
  }
}

export const deleteUser = userId => {
  return async dispatch => {
    try {
      await axios.delete(`/api/users/${userId}`)
      dispatch(removeDeletedUser(userId))
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
    case SET_UPDATED_USER:
      return state.map(user => {
        if (user.id === action.updatedUser.id) {
          return action.updatedUser
        } else {
          return user
        }
      })
    case REMOVE_DELETED_USER:
      return state.filter(user => user.id !== action.deletedUserId)
    default:
      return state
  }
}

export default allUsers
