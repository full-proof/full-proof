import React from 'react'
import {connect} from 'react-redux'
import {Table, Button} from 'react-bootstrap'
import {fetchOrdersThunk} from '../store/orders'

export class AllOrders extends React.Component {
  componentDidMount() {
    this.props.fetchOrders()
  }

  render() {
    const orders = this.props.allOrders
    return (
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
    )
  }
}

const mapStateToProps = state => {
  return {
    allOrders: state.orders.allOrders
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchOrders: () => dispatch(fetchOrdersThunk())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllOrders)
