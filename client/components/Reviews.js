import React from 'react'
import {Card} from 'react-bootstrap'
import Rating from './Rating'

const Reviews = props => {
  return (
    <div>
      <h4>Reviews</h4>
      {props.reviews &&
        props.reviews.map(review => (
          <Card key={review.id}>
            <Card.Header>
              Reviewed by <i>{review.user.name}</i>
              <Rating rating={review.rating} />
            </Card.Header>
            <Card.Body>
              <Card.Text>{review.content}</Card.Text>
            </Card.Body>
          </Card>
        ))}
    </div>
  )
}

export default Reviews
