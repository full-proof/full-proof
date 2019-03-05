import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import {Button, Modal, Form} from 'react-bootstrap'

const Navbar = ({handleClick, isLoggedIn, passwordExpired}) => (
  <div>
    <h1>Full-Proof Academy</h1>
    <nav>
      {isLoggedIn ? (
        <div>
          {/* The navbar will show these links after you log in */}
          <Link to="/home">Home</Link>
          <Link to="/products">Products</Link>
          <Link to="/cart">Cart</Link>
          <a href="#" onClick={handleClick}>
            Logout
          </a>
        </div>
      ) : (
        <div>
          {/* The navbar will show these links before you log in */}
          <Link to="/products">Products</Link>
          <Link to="/login">Login</Link>
          <Link to="/signup">Sign Up</Link>
          <Link to="/cart">Cart</Link>
        </div>
      )}
    </nav>
    <Modal show={passwordExpired} enforceFocus>
      <Modal.Dialog>
        <Modal.Header closeButton>
          <Modal.Title>Password Expired!</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form.Label htmlFor="password">Enter a new password</Form.Label>
          <Form.Control name="password" type="password" />
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClick}>
            Logout
          </Button>
          <Button variant="primary">Update password</Button>
        </Modal.Footer>
      </Modal.Dialog>
    </Modal>
    <hr />
  </div>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    passwordExpired: state.user.passwordExpired
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
