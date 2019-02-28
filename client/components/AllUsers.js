import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Table, Button} from 'react-bootstrap'
import {fetchAllUsers, updateUser, deleteUser} from '../store/allUsers'

class AllUsers extends React.Component {
  componentDidMount() {
    this.props.fetchAllUsers()
  }

  render() {
    const users = this.props.allUsers

    return (
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Is Administrator</th>
            <th>Password Expired</th>
            <th>Delete User</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => {
            return (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <input
                    type="checkbox"
                    checked={user.isAdmin}
                    onChange={() =>
                      this.props.toggleAdmin(user.id, !user.isAdmin)
                    }
                  />
                </td>
                <td>
                  <input
                    type="checkbox"
                    checked={user.passwordExpired}
                    onChange={() =>
                      this.props.togglePasswordExpired(
                        user.id,
                        !user.passwordExpired
                      )
                    }
                  />
                </td>
                <td>
                  <Button
                    variant="danger"
                    onClick={() => {
                      this.props.deleteUser(user.id)
                    }}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </Table>
    )
  }
}

const mapStateToProps = state => {
  return {
    allUsers: state.allUsers
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchAllUsers: () => dispatch(fetchAllUsers()),
    toggleAdmin: (userId, isAdmin) => dispatch(updateUser(userId, {isAdmin})),
    togglePasswordExpired: (userId, passwordExpired) =>
      dispatch(updateUser(userId, {passwordExpired})),
    deleteUser: userId => dispatch(deleteUser(userId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllUsers)
