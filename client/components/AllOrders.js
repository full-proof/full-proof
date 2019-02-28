import React from 'react'
import {connect} from 'react-redux'
import {Table} from 'react-bootstrap'
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
          </tr>
        </thead>
        <tbody>
          {orders.map(order => {
            return (
              <tr key={order.id} href={`/orders/${order.id}`}>
                <td>{order.id}</td>
                <td>{order.status}</td>
                <td>{order.createdAt}</td>
                <td>{order.user.name}</td>
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
