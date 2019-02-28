import React from 'react'
import {Card} from 'react-bootstrap'

const Reviews = props => {
  return (
    <div>
      {props.reviews &&
        props.reviews.map(review => (
          <Card key={review.id}>
            <Card.Header>
              {`${review.user.name}
              ${review.rating}`}
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
