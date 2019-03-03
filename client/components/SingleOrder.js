import React from 'react'
import {connect} from 'react-redux'
import {Table} from 'react-bootstrap'
import {fetchSingleOrderThunk} from '../store/orders'
import {Link} from 'react-router-dom'

export class SingleOrder extends React.Component {
  componentDidMount() {
    this.props.fetchSingleOrderThunk(this.props.match.params.id)
  }

  render() {
    const order = this.props.singleOrder || {}
    const productArray = this.props.singleOrder.products || []
    return order.user ? (
      <div>
        <h3>Order Info</h3>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>User</th>
              <th>Status</th>
              <th>Order Date</th>
            </tr>
          </thead>
          <tbody>
            {
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>
                  <Link to={`/users/${order.user.id}`}>{order.user.name}</Link>
                </td>
                <td>{order.status}</td>
                <td>{order.createdAt}</td>
              </tr>
            }
          </tbody>
        </Table>
        <h3>Products in Order</h3>
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
            {productArray.map(product => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>
                  <Link to={`/products/${product.id}`}>{product.title}</Link>
                </td>
                <td>{product.orderedProducts.price}</td>
                <td>{product.orderedProducts.quantity}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    ) : (
      <p>Loading</p>
    )
  }
}

const mapStateToProps = state => {
  return {
    singleOrder: state.orders.singleOrder
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchSingleOrderThunk: id => dispatch(fetchSingleOrderThunk(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleOrder)
