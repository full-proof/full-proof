import React from 'react'
import {Card, ListGroup} from 'react-bootstrap'
import EditAddress from './EditAddress'

class Address extends React.Component {
  constructor() {
    super()
    this.state = {
      user: {}
    }
  }

  render() {
    const defaultAddress = {
      name: 'Customer Name',
      address_line1: 'Address Line 1',
      address_line2: 'Address Line 2 (Optional)',
      city: 'Somewhere',
      state_province: 'Timbuk2',
      postalCode: 12345
    }

    let address
    const user = this.state.user
    if (user.id) address = user.address
    else address = defaultAddress

    return (
      <Card style={{width: '30rem'}}>
        <Card.Body>
          <Card.Title>Shipping Address</Card.Title>
          <ListGroup>
            <ListGroup.Item>{address.name}</ListGroup.Item>
            <ListGroup.Item>{address.address_line1}</ListGroup.Item>
            <ListGroup.Item>{address.address_line2}</ListGroup.Item>
            <ListGroup.Item>{address.city}</ListGroup.Item>
            <ListGroup.Item>{address.state_province}</ListGroup.Item>
            <ListGroup.Item>{address.postalCode}</ListGroup.Item>
            <EditAddress />
          </ListGroup>
        </Card.Body>
      </Card>
    )
  }
}

export default Address
