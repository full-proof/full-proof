import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const FETCH_USER = 'FETCH_USER'
const REMOVE_USER = 'REMOVE_USER'

/**
 * INITIAL STATE
 */
const defaultUser = {}

/**
 * ACTION CREATORS
 */
const fetchUser = user => ({type: FETCH_USER, user})
const removeUser = () => ({type: REMOVE_USER})

/**
 * THUNK CREATORS
 */
export const me = () => async dispatch => {
  try {
    const res = await axios.get('/auth/me')
    dispatch(fetchUser(res.data || defaultUser))
  } catch (err) {
    console.error(err)
  }
}

export const auth = (user, method) => async dispatch => {
  let res
  try {
    res = await axios.post(`/auth/${method}`, {...user})
  } catch (authError) {
    return dispatch(fetchUser({error: authError}))
  }

  try {
    dispatch(fetchUser(res.data))
    history.push('/home')
  } catch (dispatchOrHistoryErr) {
    console.error(dispatchOrHistoryErr)
  }
}

export const logout = () => async dispatch => {
  try {
    await axios.post('/auth/logout')
    dispatch(removeUser())
    history.push('/login')
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function(state = defaultUser, action) {
  switch (action.type) {
    case FETCH_USER:
      return action.user
    case REMOVE_USER:
      return defaultUser
    default:
      return state
  }
}
