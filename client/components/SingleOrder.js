import React from 'react'
import {connect} from 'react-redux'
import {Table} from 'react-bootstrap'
import {fetchSingleOrderThunk} from '../store/orders'

export class SingleOrder extends React.Component {
  componentDidMount() {
    this.props.fetchSingleOrderThunk(this.props.match.params.id)
  }

  render() {
    console.log(this.props)
    const productArray = this.props.singleOrder

    return (
      <p>Hey</p>
      // order.user ? <Table striped bordered hover>
      //   <thead>
      //     <tr>
      //       <th>Order Number</th>
      //       <th>Status</th>
      //       <th>Order Date</th>
      //       <th>User</th>
      //     </tr>
      //   </thead>
      //   <tbody>
      //     {
      //       <tr key={order.id}>
      //         <td>{order.id}</td>
      //         <td>{order.status}</td>
      //         <td>{order.createdAt}</td>
      //         <td>{order.user.name}</td>
      //       </tr>
      //     }
      //   </tbody>
      // </Table> : <p>Loading</p>
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
