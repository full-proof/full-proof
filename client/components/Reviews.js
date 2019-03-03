import React from 'react'
import {Card} from 'react-bootstrap'
import Rating from './Rating'

const Reviews = props => {
  return (
    <div>
      {props.reviews &&
        props.reviews.map(review => (
          <Card key={review.id}>
            <Card.Header>
              {review.user.name}
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
