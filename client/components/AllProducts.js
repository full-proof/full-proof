import React from 'react'
import {connect} from 'react-redux'
import {
  Card,
  ListGroup,
  ListGroupItem,
  ToggleButtonGroup,
  ToggleButton
} from 'react-bootstrap'
import {fetchProductsThunk, fetchCategoriesThunk} from '../store/product'

export class AllProducts extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      sortByCategory: []
    }
    this.handleChange = this.handleChange.bind(this)
  }
  componentDidMount() {
    this.props.fetchProducts()
    this.props.fetchCategories()
  }
  handleChange(categoryArr) {
    this.setState({sortByCategory: categoryArr}, () => {
      this.props.sortByCategory(this.state.sortByCategory)
    })
  }

  render() {
    const products = this.props.products
    const categories = this.props.categories || []
    console.log('cats', categories)
    console.log('props', this.props)
    return (
      <div>
        <ToggleButtonGroup
          type="checkbox"
          value={this.state.sortByCategory}
          onChange={this.handleChange}
        >
          {categories.map(category => (
            <ToggleButton key={category.id} value={category.title}>
              {category.title}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
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
    categories: state.products.categories
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchProducts: () => dispatch(fetchProductsThunk()),
    fetchCategories: () => dispatch(fetchCategoriesThunk())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllProducts)
