import React from 'react'
import {connect} from 'react-redux'
import {Table, Checkbox} from 'react-bootstrap'

const AllUsers = props => {
  const users = props.users

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Is Administrator</th>
          <th>Password Expired</th>
        </tr>
      </thead>
      <tbody>
        {users.map(user => {
          return (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                <Checkbox checked={user.isAdmin} />
              </td>
              <td>
                <Checkbox checked={user.passwordExpired} />
              </td>
            </tr>
          )
        })}
      </tbody>
    </Table>
  )
}

const mapStateToProps = state => {
  return {
    users: state.users
  }
}

const mapDispatchToProps = dispatch => {
  return {
    toggleAdmin: () => {}, //todo
    togglePasswordExpired: () => {} //todo
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllUsers)
