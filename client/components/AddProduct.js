import React from 'react'
import {Container, Row, Col, Form, Button, FormLabel} from 'react-bootstrap'
import {connect} from 'react-redux'
import {addProductThunk} from '../store/product'

export class AddProduct extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      price: 0,
      quantity: 0,
      description: '',
      imgUrl: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }
  handleSubmit(event) {
    event.preventDefault()
    let {title, price, quantity, description, imgUrl} = this.state
    const newProduct = {
      title,
      price: Number(price),
      quantity: Number(quantity),
      description,
      imgUrl
    }
    ;(function defaultValues() {
      if (newProduct.description.length === 0) delete newProduct.description
      if (newProduct.imgUrl.length === 0) delete newProduct.imgUrl
    })()
    this.props.addProductThunk(newProduct)
  }

  render() {
    return (
      <Container fluid="true">
        <h4>Add a new product</h4>
        <form onSubmit={this.handleSubmit}>
          <Form.Group>
            <Row>
              <Col>
                <FormLabel>Product Title</FormLabel>
                <Form.Control
                  required
                  type="text"
                  placeholder="Enter title"
                  name="title"
                  onChange={this.handleChange}
                  value={this.state.title}
                />
              </Col>
              <Col>
                <FormLabel>Price</FormLabel>
                <Form.Control
                  required
                  type="text"
                  placeholder="Enter price"
                  name="price"
                  onChange={this.handleChange}
                  value={this.state.price}
                />
              </Col>
              <Col>
                <FormLabel>Quantity</FormLabel>
                <Form.Control
                  required
                  type="text"
                  placeholder="Enter quantity"
                  name="quantity"
                  onChange={this.handleChange}
                  value={this.state.quantity}
                />
              </Col>
            </Row>
            <Col>
              <FormLabel>Description</FormLabel>
              <Form.Control
                type="text"
                placeholder="Enter description"
                style={{height: '10rem'}}
                name="description"
                onChange={this.handleChange}
                value={this.state.description}
              />
            </Col>
            <Col>
              <FormLabel>Image</FormLabel>
              <Form.Control
                type="text"
                placeholder="Enter image URL"
                name="imgUrl"
                onChange={this.handleChange}
                value={this.state.imgUrl}
              />
            </Col>
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </form>
      </Container>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  addProductThunk: product => dispatch(addProductThunk(product))
})

export default connect(null, mapDispatchToProps)(AddProduct)
