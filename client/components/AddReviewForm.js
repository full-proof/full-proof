import React from 'react'
import {Form, Button, Col} from 'react-bootstrap'

export class AddReviewForm extends React.Component {
  constructor() {
    super()
    this.state = {
      content: '',
      rating: 0
    }
  }
  componentDidMount() {}

  render() {
    return (
      <Form>
        <Col>
          <Form.Group controlId="exampleForm.ControlSelect1">
            <Form.Label>Rating</Form.Label>
            <Form.Control as="select">
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
            </Form.Control>
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId="exampleForm.ControlTextarea1">
            <Form.Label>Comments</Form.Label>
            <Form.Control as="textarea" rows="3" />
          </Form.Group>
        </Col>
        <Button variant="success">Add Your Review!</Button>
      </Form>
    )
  }
}

// const mapStateToProps = state => {
//   return {
//     orders: state.orders
//   }
// }

// const mapDispatchToProps = dispatch => {
//   return {
//     fetchOrders: () => dispatch(fetchOrdersThunk())
//   }
// }

// export default connect(mapStateToProps, mapDispatchToProps)(AllOrders)
