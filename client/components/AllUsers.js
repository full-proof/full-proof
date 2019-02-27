import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Table} from 'react-bootstrap'
import {fetchAllUsers, updateUser} from '../store/allUsers'

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
      dispatch(updateUser(userId, {passwordExpired}))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllUsers)
