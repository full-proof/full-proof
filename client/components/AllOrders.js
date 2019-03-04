import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {Table, Button, ToggleButtonGroup, ToggleButton} from 'react-bootstrap'
import {
  fetchOrdersThunk,
  fetchUserOrdersThunk,
  filterOrders
} from '../store/orders'

export class AllOrders extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      sortByStatus: []
    }

    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
    this.props.userId
      ? this.props.fetchUserOrders(this.props.userId)
      : this.props.fetchOrders()
  }

  handleChange(statusArr) {
    this.setState({sortByStatus: statusArr}, () => {
      this.props.sortOrders(this.state.sortByStatus)
      if (this.state.sortByStatus.length === 0) {
        this.props.sortOrders([
          'Cancelled',
          'Completed',
          'Created',
          'Processing',
          'In Cart'
        ])
      }
    })
  }

  render() {
    const orders = this.props.filteredOrders || []
    console.log('ORDER ---> ', orders)
    return (
      <div>
        <div>
          <h4>Filter by category:</h4>
          <ToggleButtonGroup
            type="checkbox"
            value={this.state.sortByStatus}
            onChange={this.handleChange}
          >
            <ToggleButton value="In Cart">In Cart</ToggleButton>
            <ToggleButton value="Created">Created</ToggleButton>
            <ToggleButton value="Processing">Processing</ToggleButton>
            <ToggleButton value="Completed">Completed</ToggleButton>
            <ToggleButton value="Cancelled">Cancelled</ToggleButton>
          </ToggleButtonGroup>
        </div>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Order Number</th>
              <th>Status</th>
              <th>Order Date</th>
              {!this.props.userId && <th>User</th>}
              <th>Total</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => {
              return (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>{order.status}</td>
                  <td>{new Date(order.createdAt).toString()}</td>
                  {!this.props.userId && (
                    <td>
                      <Link to={`/users/${order.user.id}`}>
                        {order.user.name}
                      </Link>
                    </td>
                  )}
                  <td>
                    ${order.products
                      .reduce(
                        (runningTotal, product) =>
                          runningTotal + Number(product.orderedProducts.price),
                        0
                      )
                      .toFixed(2)}
                  </td>
                  <td>
                    <Link to={`/orders/${order.id}`}>
                      <Button>View Details</Button>
                    </Link>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </Table>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    allOrders: state.orders.allOrders,
    filteredOrders: state.orders.filteredOrders
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchOrders: () => dispatch(fetchOrdersThunk()),
    fetchUserOrders: userId => dispatch(fetchUserOrdersThunk(userId)),
    sortOrders: sortByStatus => dispatch(filterOrders(sortByStatus))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllOrders)
