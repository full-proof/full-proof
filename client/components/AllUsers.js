import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Table, InputGroup} from 'react-bootstrap'
import {fetchAllUsers} from '../store/allUsers'

const allTheUsers = [
  {
    id: 1,
    name: 'cody',
    email: 'cody@email.com',
    password: '123',
    isAdmin: true
  }
]

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
                  <InputGroup.Checkbox
                    checked={user.isAdmin}
                    onChange={this.props.toggleAdmin}
                  />
                </td>
                <td>
                  <InputGroup.Checkbox
                    checked={user.passwordExpired}
                    onChange={this.props.togglePasswordExpired}
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
    toggleAdmin: () => {}, //todo
    togglePasswordExpired: () => {} //todo
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllUsers)
