import React from 'react'
import {connect} from 'react-redux'
import {Form, Button, Col} from 'react-bootstrap'
import RatingWidget from './RatingWidget'

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
    event.preventDefault()
    this.props.addReview(this.state)
    this.setState({
      content: '',
      rating: 1
    })
    this.props.closeForm()
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value})
  }

  render() {
    console.log('Form Rating', this.state.rating)
    return (
      <Form onSubmit={this.handleSubmit}>
        <Col>
          <Form.Group controlId="exampleForm.ControlSelect1">
            <Form.Label>Rating</Form.Label>
            <RatingWidget onRatingChange={rating => this.setState({rating})} />
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
//     reviews: state.products.singleProduct.reviews
//   }
// }

// const mapDispatchToProps = dispatch => {
//   return {
//     fetchOrders: () => dispatch(fetchOrdersThunk())
//   }
// }

// export default connect(mapStateToProps, mapDispatchToProps)(AddReviewForm)
