import React from 'react'
import Jumbotron from 'react-bootstrap/Jumbotron'

const UnauthorizedRequest = () => {
  return (
    <Jumbotron>
      <h1>Bad Request:</h1>
      <p>You do not have authorization to make this request.</p>
    </Jumbotron>
  )
}

export default UnauthorizedRequest
