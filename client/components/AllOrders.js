import React from 'react'
import {connect} from 'react-redux'
import {Table, Button, ToggleButtonGroup, ToggleButton} from 'react-bootstrap'
import {fetchOrdersThunk, sortOrders} from '../store/orders'

export class AllOrders extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      sortByStatus: []
    }

    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
    this.props.fetchOrders()
  }

  handleChange(statusArr) {
    this.setState({sortByStatus: statusArr}, () =>
      this.props.sortOrders(this.state.sortByStatus)
    )
  }

  render() {
    const orders = this.props.filteredOrders || []
    return (
      <div>
        <ToggleButtonGroup
          type="checkbox"
          value={this.state.sortByStatus}
          onChange={this.handleChange}
        >
          <ToggleButton value="In Cart">In Cart</ToggleButton>{' '}
          <ToggleButton value="Created">Created</ToggleButton>
          <ToggleButton value="Processing">Processing</ToggleButton>
          <ToggleButton value="Completed">Completed</ToggleButton>
          <ToggleButton value="Cancelled">Cancelled</ToggleButton>
        </ToggleButtonGroup>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Order Number</th>
              <th>Status</th>
              <th>Order Date</th>
              <th>User</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => {
              return (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>{order.status}</td>
                  <td>{order.createdAt}</td>
                  <td>
                    <a href={`/users/${order.user.id}`}>{order.user.name}</a>
                  </td>
                  <td>
                    <Button href={`/orders/${order.id}`}>View Details</Button>
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
    sortOrders: sortByStatus => dispatch(sortOrders(sortByStatus))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllOrders)
