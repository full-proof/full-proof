import React from 'react'
import {connect} from 'react-redux'
import {Card, ListGroup, ListGroupItem} from 'react-bootstrap'
import {fetchProductThunk, addReviewThunk} from '../store/product'
import {updateOrderThunk} from '../store/orders'
import Reviews from './Reviews'
import {AddReviewForm} from './AddReviewForm'

export class SingleProduct extends React.Component {
  constructor() {
    super()
    this.state = {toggleReview: false}
    this.handleClick = this.handleClick.bind(this)
    this.handleCart = this.handleCart.bind(this)
  }
  componentDidMount() {
    this.props.fetchProduct(this.props.match.params.id)
  }

  handleClick() {
    this.setState({toggleReview: !this.state.toggleReview})
  }

  handleCart() {
    const singleProduct = this.props.singleProduct
    const quantity = 1 // need to add select for user-input
    this.props.updateOrder(singleProduct, quantity)
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
            <ListGroupItem>{product.price}</ListGroupItem>
            <ListGroupItem>{product.quantity}</ListGroupItem>
          </ListGroup>
          <Card.Body>
            <Card.Link onClick={this.handleCart}>Place in Cart</Card.Link>
            <Card.Link onClick={this.handleClick}>Add Review</Card.Link>
            {this.state.toggleReview ? (
              <AddReviewForm
                addReview={newReview => {
                  this.props.addReview(
                    product.id,
                    this.props.loggedinUser,
                    newReview
                  )
                }}
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
    updateOrder: (singleProduct, quantity) =>
      dispatch(updateOrderThunk(singleProduct, quantity))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct)
