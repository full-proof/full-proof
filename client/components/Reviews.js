import React from 'react'
import {Card} from 'react-bootstrap'

const Reviews = () => {
  return (
    <Card>
      <Card.Header>Past Reviews</Card.Header>
      <Card.Body>
        <Card.Text>this is the review content</Card.Text>
        <Card.Text>rating between 1 and 5</Card.Text>
      </Card.Body>
    </Card>
  )
}
export default Reviews
