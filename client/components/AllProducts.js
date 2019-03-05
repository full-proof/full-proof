import React from 'react'
import {connect} from 'react-redux'
import {
  Card,
  Container,
  ListGroup,
  ListGroupItem,
  ToggleButtonGroup,
  ToggleButton,
  Button,
  Form,
  Row,
  Col
} from 'react-bootstrap'
import {
  fetchProductsThunk,
  fetchCategoriesThunk,
  filterProductsByCategory,
  clearFilteredProducts,
  filterProductsByTitle
} from '../store/product'
import {updateCartThunk} from '../store/cart'
import {Link} from 'react-router-dom'

export class AllProducts extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      filterByCategory: '',
      filterByTitle: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleCategoryChange = this.handleCategoryChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleCart = this.handleCart.bind(this)
  }
  componentDidMount() {
    this.props.fetchProducts()
    this.props.fetchCategories()
  }

  handleCategoryChange(event) {
    this.setState({filterByCategory: event.target.value}, () => {
      this.props.filterProductsByCategory(this.state.filterByCategory)
    })
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }
  handleSubmit(event) {
    event.preventDefault()
    const title = this.state.filterByTitle
    this.props.filterProductsByTitle(title)
  }

  handleCart(event, product) {
    event.preventDefault()
    this.props.updateCart(product, 1)
  }

  render() {
    const products = this.props.filteredProducts || []
    const categories = this.props.categories || []

    return (
      <div>
        <h4>Filter by category:</h4>
        <ToggleButtonGroup
          type="radio"
          name="Categories"
          defaultValue={this.state.filterByCategory || 'All Products'}
        >
          <ToggleButton
            variant="dark"
            onClick={() => this.props.clearFilteredProducts()}
            value="All Products"
          >
            All Products
          </ToggleButton>
          {categories.map(category => (
            <ToggleButton
              key={category.id}
              onClick={this.handleCategoryChange}
              value={category.title}
            >
              {category.title}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
        <h4>Filter by name:</h4>
        <form onSubmit={this.handleSubmit}>
          <Form.Group>
            <Form.Control
              style={{width: '18rem'}}
              type="text"
              placeholder="Enter name"
              name="filterByTitle"
              onChange={this.handleChange}
              value={this.state.filterByTitle}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </form>
        <Container fluid="true">
          <Row noGutters="true">
            {products.map(product => (
              <Col key={product.id}>
                <Card style={{width: '18rem'}}>
                  <Card.Img variant="top" src={product.imgUrl} />
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
                  <Card.Body>
                    <Link to={`/products/${product.id}`}>
                      <Button size="sm">Product Details</Button>
                    </Link>
                    {product.quantity > 0 ? (
                      <Button
                        size="sm"
                        onClick={event => this.handleCart(event, product)}
                      >
                        Place in Cart
                      </Button>
                    ) : (
                      <Button size="sm" disabled={true}>
                        Out of Stock
                      </Button>
                    )}
                    {/* {product.review.rating} */}
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    products: state.products.allProducts,
    filteredProducts: state.products.filteredProducts,
    categories: state.products.categories
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchProducts: () => dispatch(fetchProductsThunk()),
    fetchCategories: () => dispatch(fetchCategoriesThunk()),
    filterProductsByCategory: category =>
      dispatch(filterProductsByCategory(category)),
    clearFilteredProducts: () => dispatch(clearFilteredProducts()),
    filterProductsByTitle: title => dispatch(filterProductsByTitle(title)),
    updateCart: (product, quantity) =>
      dispatch(updateCartThunk(product, quantity))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllProducts)
