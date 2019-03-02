import React from 'react'
import {Card} from 'react-bootstrap'

//This is a really silly way to do this, but the better way(please see
//the commented out generateStars method below) is getting caught
//by the linter that Husky runs on commit no matter how I re-write it
const starTypes = {
  1: ['filled', 'unfilled', 'unfilled', 'unfilled', 'unfilled'],
  2: ['filled', 'filled', 'unfilled', 'unfilled', 'unfilled'],
  3: ['filled', 'filled', 'filled', 'unfilled', 'unfilled'],
  4: ['filled', 'filled', 'filled', 'filled', 'unfilled'],
  5: ['filled', 'filled', 'filled', 'filled', 'filled']
}

class Reviews extends React.Component {
  render() {
    return (
      <div>
        {this.props.reviews &&
          this.props.reviews.map(review => (
            <Card key={review.id}>
              <Card.Header>
                {review.user.name}
                {starTypes[review.rating].map((star, idx) => {
                  return <img key={idx} src={`/star_rating/${star}.png`} />
                })}
              </Card.Header>
              <Card.Body>
                <Card.Text>{review.content}</Card.Text>
              </Card.Body>
            </Card>
          ))}
      </div>
    )
  }

  //
  // generateStars = rating => {
  //   let stars = []
  //   for (let i = 1; i <= 5; i++) {
  //     let starType = ''
  //     const startType = i <= rating ? 'filled' : 'unfilled'

  //     stars.push(<img key={i} src={`/star_rating/${starType}.png`} />)
  //   }
  //   return stars
  // }
}

export default Reviews
