import React from 'react'
import {Form, Button, Col} from 'react-bootstrap'

export class AddReviewForm extends React.Component {
  constructor() {
    super()
    this.state = {
      content: '',
      rating: 1
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  componentDidMount() {}

  handleSubmit(event) {
    console.log('this is state', this.state)
    event.preventDefault()
    this.setState({
      content: '',
      rating: 1
    })
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value})
  }

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <Col>
          <Form.Group controlId="exampleForm.ControlSelect1">
            <Form.Label>Rating</Form.Label>
            <Form.Control
              as="select"
              name="rating"
              value={this.state.rating}
              onChange={this.handleChange}
            >
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
            <Form.Control
              as="textarea"
              rows="3"
              name="content"
              value={this.state.content}
              onChange={this.handleChange}
            />
          </Form.Group>
        </Col>
        <Button type="submit">Add Your Review!</Button>
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
