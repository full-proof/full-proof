import React from 'react'
import {connect} from 'react-redux'
import {
  Card,
  ListGroup,
  ListGroupItem,
  ButtonGroup,
  Button
} from 'react-bootstrap'
import {
  fetchProductsThunk,
  fetchCategoriesThunk,
  filterProducts
} from '../store/product'

export class AllProducts extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      filterByCategory: ''
    }
    this.handleChange = this.handleChange.bind(this)
  }
  componentDidMount() {
    this.props.fetchProducts()
    this.props.fetchCategories()
  }
  handleChange(event) {
    this.setState({filterByCategory: event}, () => {
      this.props.filterProducts(this.state.filterByCategory)
    })
  }

  render() {
    const products = this.props.filteredProducts || []
    console.log('these are propSSS', this.props)
    const categories = this.props.categories || []

    return (
      <div>
        <ButtonGroup type="checkbox" value={this.state.filterByCategory}>
          {categories.map(category => (
            <Button
              key={category.id}
              onClick={this.handleChange}
              value={category.title}
            >
              {category.title}
            </Button>
          ))}
        </ButtonGroup>
        {/* {need to dynamize} */}
        {products.map(product => (
          <Card key={product.id} style={{width: '18rem'}}>
            <Card.Img variant="top" src={product.imgUrl} />
            <Card.Body>
              <Card.Title>{product.title}</Card.Title>
              <Card.Text>{product.description}</Card.Text>
            </Card.Body>
            <ListGroup className="list-group-flush">
              <ListGroupItem>{product.price}</ListGroupItem>
              <ListGroupItem>{product.quantity}</ListGroupItem>
            </ListGroup>
            <Card.Body>
              <Card.Link href={`/products/${product.id}`}>
                Product Detail
              </Card.Link>
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
    filterProducts: category => dispatch(filterProducts(category))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllProducts)
