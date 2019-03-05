import React from 'react'
import {connect} from 'react-redux'
import {Table, Button, Dropdown, DropdownButton} from 'react-bootstrap'

import {fetchCartThunk, updateCartThunk} from '../store/cart'
import {Link} from 'react-router-dom'
import EditAddress from './EditAddress'
import Address from './Address'

export class Cart extends React.Component {
  componentDidMount() {
    this.props.fetchCart()
  }

  handleUpdate = (quantity, product) => {
    this.props.updateCart(product, quantity)
  }

  handleDelete = (event, product) => {
    event.preventDefault()
    this.props.updateCart(product, 0)
  }

  render() {
    const order = this.props.cart || {}
    const cartProducts = this.props.cart.products || []
    const total = cartProducts.reduce((acc, product) => {
      return Number(product.orderedProducts.price) + acc
    }, 0)

    return order.id ? (
      <div>
        <h3>Products in Cart</h3>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Update Quantity</th>
              <th>Remove</th>
            </tr>
          </thead>
          <tbody>
            {cartProducts.length ? (
              cartProducts.map(product => (
                <tr key={product.id}>
                  <td>
                    <Link to={`/products/${product.id}`}>{product.title}</Link>
                  </td>
                  <td>${product.orderedProducts.price}</td>
                  <td>{product.orderedProducts.quantity}</td>
                  <td>
                    <DropdownButton id="dropdown-basic-button" title="Quantity">
                      <Dropdown.Item
                        eventKey={1}
                        onSelect={event => this.handleUpdate(event, product)}
                      >
                        1
                      </Dropdown.Item>
                      <Dropdown.Item
                        eventKey={2}
                        onSelect={event => this.handleUpdate(event, product)}
                      >
                        2
                      </Dropdown.Item>
                      <Dropdown.Item
                        eventKey={3}
                        onSelect={event => this.handleUpdate(event, product)}
                      >
                        3
                      </Dropdown.Item>
                      <Dropdown.Item
                        eventKey={4}
                        onSelect={event => this.handleUpdate(event, product)}
                      >
                        4
                      </Dropdown.Item>
                      <Dropdown.Item
                        eventKey={5}
                        onSelect={event => this.handleUpdate(event, product)}
                      >
                        5
                      </Dropdown.Item>
                    </DropdownButton>
                  </td>
                  <td>
                    <Button
                      onClick={event => this.handleDelete(event, product)}
                    >
                      Remove Product
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <p>No Products in Your Cart</p>
            )}
          </tbody>
        </Table>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {
              <tr>
                <td>${total.toFixed(2)}</td>
              </tr>
            }
          </tbody>
        </Table>
        <h3>Checkout Information</h3>
        <Address />
      </div>
    ) : (
      <p>No Cart</p>
    )
  }
}

const mapStateToProps = state => {
  return {
    cart: state.cart
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchCart: () => dispatch(fetchCartThunk()),
    updateCart: (product, quantity) =>
      dispatch(updateCartThunk(product, quantity))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
