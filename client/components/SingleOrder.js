import React from 'react'
import {connect} from 'react-redux'
import {Table} from 'react-bootstrap'
import {fetchSingleOrderThunk} from '../store/orders'

export class SingleOrder extends React.Component {
  componentDidMount() {
    this.props.fetchSingleOrderThunk()
  }

  render() {
    const order = this.props.order

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
              <tr key={order.id}>
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
