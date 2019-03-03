import React from 'react'
import Rating from './Rating'

class RatingWidget extends React.Component {
  constructor() {
    super()
    this.state = {
      rating: 1
    }
  }

  render() {
    return (
      <div>
        <Rating
          rating={this.state.rating}
          clickHandler={event => {
            const newRating = event.target.getAttribute('value')
            this.setState({rating: newRating})
            this.props.onRatingChange && this.props.onRatingChange(newRating)
          }}
        />
      </div>
    )
  }
}

export default RatingWidget
