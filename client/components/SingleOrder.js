import React from 'react'
import {connect} from 'react-redux'
import {Table, Form} from 'react-bootstrap'
import {fetchSingleOrderThunk, updateOrderThunk} from '../store/orders'
import {Link} from 'react-router-dom'

export class SingleOrder extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      orderStatus: '',
      statuses: ['Created', 'Completed', 'Processing', 'Cancelled', 'In Cart']
    }
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
    this.props.fetchSingleOrderThunk(this.props.match.params.id)
  }
  handleChange(event) {
    const orderId = this.props.match.params.id
    this.setState({orderStatus: event.target.value}, () =>
      this.props.updateOrderThunk(orderId, this.state.orderStatus)
    )
  }

  render() {
    const order = this.props.singleOrder || {}
    const productArray = this.props.singleOrder.products || []
    const user = this.props.user || {}
    const statuses = this.state.statuses
    return order.user ? (
      <div>
        <h3>Order Info</h3>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>User</th>
              <th>Status</th>
              <th>Total</th>
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
                <td>
                  {user.isAdmin ? (
                    <Form.Control
                      as="select"
                      value={this.state.orderStatus}
                      onChange={this.handleChange}
                    >
                      <option value={order.status}>{order.status}</option>
                      {statuses
                        .map((status, idx) => (
                          <option key={idx} value={status}>
                            {status}
                          </option>
                        ))
                        .filter(option => option.props.value !== order.status)}
                    </Form.Control>
                  ) : (
                    order.status
                  )}
                </td>
                <td>
                  ${order.products
                    .reduce(
                      (runningTotal, product) =>
                        runningTotal + Number(product.orderedProducts.price),
                      0
                    )
                    .toFixed(2)}
                </td>
                <td>{new Date(order.createdAt).toString()}</td>
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
                <td>${product.orderedProducts.price}</td>
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
    singleOrder: state.orders.singleOrder,
    user: state.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchSingleOrderThunk: id => dispatch(fetchSingleOrderThunk(id)),
    updateOrderThunk: (orderId, updateInfo) =>
      dispatch(updateOrderThunk(orderId, updateInfo))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleOrder)
