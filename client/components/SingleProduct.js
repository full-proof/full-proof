import React from 'react'
import {connect} from 'react-redux'
import {Card, ListGroup, ListGroupItem} from 'react-bootstrap'
import {fetchProductThunk, addReviewThunk} from '../store/product'
import {updateCartThunk} from '../store/cart'
import Reviews from './Reviews'
import {AddReviewForm} from './AddReviewForm'

export class SingleProduct extends React.Component {
  constructor() {
    super()
    this.state = {addReviewFormOpen: false}
    this.toggleAddReviewForm = this.toggleAddReviewForm.bind(this)
    this.handleCart = this.handleCart.bind(this)
  }
  componentDidMount() {
    this.props.fetchProduct(this.props.match.params.id)
  }

  toggleAddReviewForm() {
    this.setState({addReviewFormOpen: !this.state.addReviewFormOpen})
  }

  handleCart() {
    const singleProduct = this.props.singleProduct
    const quantity = 1 // need to add select for user-input
    this.props.updateCart(singleProduct, quantity)
  }

  render() {
    const product = this.props.singleProduct
    return (
      <div>
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
          <Card.Body>
            <Card.Link onClick={this.handleCart}>Place in Cart</Card.Link>
            <Card.Link onClick={this.toggleAddReviewForm}>Add Review</Card.Link>
            {this.state.addReviewFormOpen ? (
              <AddReviewForm
                addReview={newReview => {
                  this.props.addReview(
                    product.id,
                    this.props.loggedinUser,
                    newReview
                  )
                }}
                closeForm={this.toggleAddReviewForm}
              />
            ) : null}
          </Card.Body>

          <Reviews reviews={product.reviews} />
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
    addReview: (productId, loggedinUser, review) =>
      dispatch(addReviewThunk(productId, loggedinUser, review)),
    updateCart: (singleProduct, quantity) =>
      dispatch(updateCartThunk(singleProduct, quantity))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct)
