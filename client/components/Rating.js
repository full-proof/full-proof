import React from 'react'

const Rating = props => {
  const stars = []
  for (let i = 1; i <= 5; i++) {
    stars.push(i <= props.rating ? 'filled' : 'unfilled')
  }

  return (
    <div>
      {stars.map(
        (star, idx) =>
          props.clickHandler ? (
            <img
              key={idx}
              value={idx + 1}
              src={`/star_rating/${star}.png`}
              onClick={props.clickHandler}
            />
          ) : (
            <img
              key={idx}
              value={idx + 1}
              src={`/star_rating/${star}.png`}
              width="22rem"
            />
          )
      )}
    </div>
  )
}

export default Rating
