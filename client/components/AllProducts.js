import React from 'react'
import {connect} from 'react-redux'
import {Card, ListGroup, ListGroupItem} from 'react-bootstrap'
import {fetchProductsThunk} from '../store/product'

export class AllProducts extends React.Component {
  componentDidMount() {
    this.props.fetchProducts()
  }

  render() {
    const products = this.props.products
    return (
      <div>
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
    products: state.products.allProducts
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchProducts: () => dispatch(fetchProductsThunk())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllProducts)
