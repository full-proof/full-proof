import React from 'react'
import {connect} from 'react-redux'
import {Table} from 'react-bootstrap'
import {fetchCartThunk} from '../store/cart'

export class Cart extends React.Component {
  componentDidMount() {
    this.props.fetchCart()
  }

  render() {
    const cart = this.props.cart || {}
    const cartProducts = this.props.cart.products || []

    return cart.id ? (
      <div>
        <h3>Cart Info</h3>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Status</th>
              <th>Order Date</th>
            </tr>
          </thead>
          <tbody>
            {
              <tr key={cart.id}>
                <td>{cart.id}</td>
                <td>{cart.status}</td>
                <td>{cart.createdAt}</td>
              </tr>
            }
          </tbody>
        </Table>
        <h3>Products in Cart</h3>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Product ID</th>
              <th>Product Name</th>
              <th>Price</th>
              <th>Quantity</th>
            </tr>
          </thead>
          <tbody>
            {cartProducts.map(product => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>
                  <a href={`/products/${product.id}`}>{product.title}</a>
                </td>
                <td>{product.orderedProducts.price}</td>
                <td>{product.orderedProducts.quantity}</td>
              </tr>
            ))}
          </tbody>
        </Table>
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
    fetchCart: () => dispatch(fetchCartThunk())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
