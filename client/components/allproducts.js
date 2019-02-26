import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'
import ListGroupItem from 'react-bootstrap/ListGroupItem'

export const AllProducts = props => {
  const products = props.products

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
            <Card.Link href="#">Product Detail</Card.Link>
            <Card.Link href="#">Place in Cart</Card.Link>
            {product.review.rating}
          </Card.Body>
        </Card>
      ))}
    </div>
  )
}

const mapStateToProps = state => {
  return {
    products: state.products
  }
}

export default connect(mapStateToProps)(AllProducts)
