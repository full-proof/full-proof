import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {auth} from '../store'
import {Form, Row, Col, Button} from 'react-bootstrap'

/**
 * COMPONENT
 */
const AuthForm = props => {
  const {name, displayName, handleSubmit, error} = props

  return (
    <Form onSubmit={handleSubmit} name={name}>
      {name === 'signup' && (
        <Form.Group as={Row}>
          <Col>
            <Form.Label>Name</Form.Label>
            <Form.Control name="userName" type="name" />
          </Col>
        </Form.Group>
      )}
      <Form.Group as={Row}>
        <Col>
          <Form.Label htmlFor="email">Email</Form.Label>
          <Form.Control name="email" type="email" />
        </Col>
      </Form.Group>
      <Form.Group as={Row}>
        <Col>
          <Form.Label htmlFor="password">Password</Form.Label>
          <Form.Control name="password" type="password" />
        </Col>
      </Form.Group>
      <div>
        <Button type="submit">{displayName}</Button>
      </div>
      {error && error.response && <div> {error.response.data} </div>}
      <a href="/auth/google">{displayName} with Google</a>
    </Form>
  )
}

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = state => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.user.error
  }
}

const mapSignup = state => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.user.error
  }
}

const mapDispatch = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      const formName = evt.target.name
      const email = evt.target.email.value
      const password = evt.target.password.value
      const user = {email, password}
      if (formName === 'signup') {
        user.name = evt.target.userName.value
      }
      dispatch(auth(user, formName))
    }
  }
}

export const Login = connect(mapLogin, mapDispatch)(AuthForm)
export const Signup = connect(mapSignup, mapDispatch)(AuthForm)

/**
 * PROP TYPES
 */
AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
}
