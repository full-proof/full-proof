import React from 'react'
import {connect} from 'react-redux'
import {
  Container,
  Row,
  Col,
  Card,
  ListGroup,
  ListGroupItem,
  Collapse,
  Form,
  FormLabel,
  Button
} from 'react-bootstrap'
import {fetchProductThunk, updateProductThunk} from '../store/product'

export class EditSingleProduct extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      edit: false,
      title: '',
      price: Number,
      quantity: Number,
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
    const productId = this.props.singleProduct.id
    const singleProduct = this.props.singleProduct
    let {title, price, quantity, description, imgUrl} = this.state
    const updateInfo = {
      title,
      price: Number(price),
      quantity: Number(quantity),
      description,
      imgUrl
    }
    ;(function defaultValues() {
      for (let key in updateInfo) {
        if (updateInfo[key].length === 0) updateInfo[key] = singleProduct[key]
      }
    })()
    this.props.updateProductThunk(productId, updateInfo)
  }

  render() {
    const product = this.props.singleProduct || {}
    console.log('product', product)
    const {edit} = this.state
    // console.log('props?', this.props)
    return (
      <div>
        <Button
          onClick={() => this.setState({edit: !edit})}
          aria-controls="example-collapse-text"
          aria-expanded={edit}
        >
          Edit Product
        </Button>
        <Collapse in={this.state.edit}>
          <Container fluid="true">
            <form onSubmit={this.handleSubmit}>
              <Form.Group>
                <Row>
                  <Col>
                    <FormLabel>Product Title</FormLabel>
                    <Form.Control
                      column
                      type="text"
                      placeholder={product.title}
                      name="title"
                      onChange={this.handleChange}
                      value={this.state.title}
                    />
                  </Col>
                  <Col>
                    <FormLabel>Price</FormLabel>
                    <Form.Control
                      column
                      type="text"
                      placeholder={product.price}
                      name="price"
                      onChange={this.handleChange}
                      value={this.state.price}
                    />
                  </Col>
                  <Col>
                    <FormLabel>Quantity</FormLabel>
                    <Form.Control
                      column
                      type="text"
                      placeholder={product.quantity}
                      name="quantity"
                      onChange={this.handleChange}
                      value={this.state.quantity}
                    />
                  </Col>
                </Row>
                <Col>
                  <FormLabel>Description</FormLabel>
                  <Form.Control
                    column
                    type="text"
                    placeholder={product.description}
                    style={{height: '10rem'}}
                    name="description"
                    onChange={this.handleChange}
                    value={this.state.description}
                  />
                </Col>
                <Col>
                  <FormLabel>Image</FormLabel>
                  <Form.Control
                    column
                    type="text"
                    placeholder={product.imgUrl}
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
        </Collapse>

        <Card key={product.id} style={{width: '40rem'}}>
          {product.imgUrl ? (
            <Card.Img variant="top" src={product.imgUrl} />
          ) : null}
          <Card.Body>
            <Card.Title>{product.title}</Card.Title>
            <Card.Text>{product.description}</Card.Text>
          </Card.Body>
          <ListGroup className="list-group-flush">
            <ListGroupItem>
              <strong>Price:</strong> ${product.price}
            </ListGroupItem>
            <ListGroupItem>
              <strong>Quantity:</strong> {product.quantity}
            </ListGroupItem>
          </ListGroup>
        </Card>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    singleProduct: state.products.singleProduct,
    loggedinUser: state.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchProduct: id => dispatch(fetchProductThunk(id)),
    updateProductThunk: (productId, updateInfo) =>
      dispatch(updateProductThunk(productId, updateInfo))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditSingleProduct)
