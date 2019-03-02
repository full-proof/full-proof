import React from 'react'
import {connect} from 'react-redux'
import {
  Card,
  ListGroup,
  ListGroupItem,
  ButtonGroup,
  Button,
  Form
} from 'react-bootstrap'
import {
  fetchProductsThunk,
  fetchCategoriesThunk,
  filterProductsByCategory,
  filterProductsByTitle
} from '../store/product'
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
    console.log('title', title)
    this.props.filterProductsByTitle(title)
  }

  render() {
    const products = this.props.filteredProducts || []
    // console.log('these are propSSS', this.props)
    const categories = this.props.categories || []
    return (
      <div>
        <h4>Filter by category:</h4>
        <ButtonGroup type="checkbox" value={this.state.filterByCategory}>
          {categories.map(category => (
            <Button
              key={category.id}
              onClick={this.handleCategoryChange}
              value={category.title}
            >
              {category.title}
            </Button>
          ))}
        </ButtonGroup>
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
        {/* {need to dynamize} */}
        {products.map(product => (
          <Card key={product.id} style={{width: '18rem'}}>
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
              <Link to={`/products/${product.id}`}>Product Details</Link>
              <Card.Link href="#">Place in Cart</Card.Link>
              {/* {product.review.rating} */}
            </Card.Body>
          </Card>
        ))}
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
    filterProductsByTitle: title => dispatch(filterProductsByTitle(title))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllProducts)
