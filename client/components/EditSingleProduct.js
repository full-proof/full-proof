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
import {
  fetchProductThunk,
  updateProductThunk,
  fetchCategoriesThunk
} from '../store/product'

export class EditSingleProduct extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      edit: false,
      title: '',
      price: 0,
      quantity: 0,
      description: '',
      imgUrl: '',
      categories: [],
      selectedCategory: {}
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.removeCategory = this.removeCategory.bind(this)
    this.addCategory = this.addCategory.bind(this)
  }

  async componentDidMount() {
    await this.props.fetchCategories()
    this.setState({
      categories: this.props.singleProductCategories,
      price: this.props.singleProduct.price,
      quantity: this.props.singleProduct.quantity
    })
  }

  removeCategory(category) {
    const index = this.state.categories.indexOf(category)
    this.setState({
      categories: this.state.categories.filter(
        cat => cat.title !== category.title
      )
    })
  }

  addCategory(category) {
    const allCategories = this.props.categories
    const categoryObj = (function() {
      for (let key in allCategories) {
        if (allCategories[key].title === category) return allCategories[key]
      }
    })()
    if (
      !this.state.categories.includes(categoryObj) &&
      this.state.selectedCategory
    )
      this.setState({categories: [...this.state.categories, categoryObj]})
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
    let {title, price, quantity, description, imgUrl, categories} = this.state
    const updateInfo = {
      title,
      price: Number(price),
      quantity: Number(quantity),
      description,
      imgUrl,
      categories
    }
    ;(function defaultValues() {
      for (let key in updateInfo) {
        if (updateInfo[key].length === 0) updateInfo[key] = singleProduct[key]
      }
    })()
    if (this.state.categories.length) {
      this.props.updateProductThunk(productId, updateInfo)
    } else {
      alert('All products must have at least one category!')
    }
  }

  render() {
    const product = this.props.singleProduct || {}
    const productCategories = product.categories || []
    const {edit} = this.state
    const productCategoriesTitles = (function() {
      const arr = []
      for (let i = 0; i < productCategories.length; i++) {
        arr.push(productCategories[i].title)
      }
      return arr
    })()

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
                    type="text"
                    placeholder={product.imgUrl}
                    name="imgUrl"
                    onChange={this.handleChange}
                    value={this.state.imgUrl}
                  />
                </Col>
                <Row>
                  <Col>
                    <h4>Current Categories</h4>
                  </Col>
                  <br />
                  {this.state.categories && this.state.categories.length ? (
                    this.state.categories.map((category, idx) => (
                      <Col key={idx}>
                        <FormLabel>{category.title}</FormLabel>
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => this.removeCategory(category)}
                        >
                          Remove
                        </Button>
                      </Col>
                    ))
                  ) : (
                    <p>(This product currently has no categories.)</p>
                  )}
                </Row>
                <h4>Add Categories</h4>
                <Row>
                  <Form.Control
                    as="select"
                    onChange={this.handleChange}
                    value={this.state.selectedCategory}
                    name="selectedCategory"
                  >
                    <option value="-">-</option>
                    {this.props.categories
                      .map((category, idx) => (
                        <option key={idx} value={category.title}>
                          {category.title}
                        </option>
                      ))
                      .filter(
                        category =>
                          !productCategoriesTitles.includes(
                            category.props.value
                          )
                      )}
                  </Form.Control>
                  <Button
                    varianty="secondary"
                    type="button"
                    onClick={() =>
                      this.addCategory(this.state.selectedCategory)
                    }
                  >
                    Add
                  </Button>
                </Row>
              </Form.Group>
              <Row>
                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </Row>
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
    singleProductCategories: state.products.singleProduct.categories,
    categories: state.products.categories,
    loggedinUser: state.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchProduct: id => dispatch(fetchProductThunk(id)),
    updateProductThunk: (productId, updateInfo) =>
      dispatch(updateProductThunk(productId, updateInfo)),
    fetchCategories: () => dispatch(fetchCategoriesThunk())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditSingleProduct)
