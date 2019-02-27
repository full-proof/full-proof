import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Table, Checkbox} from 'react-bootstrap'
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

export class AllUsers extends React.Component {
  componentDidMount() {
    console.log('component did mount?')
    this.props.fetchAllUsers()
  }

  render() {
    console.log('all the users', allTheUsers)
    const users = allTheUsers

    return (
      <h1>Hello</h1>
      // <Table striped bordered hover>
      //   <thead>
      //     <tr>
      //       <th>Name</th>
      //       <th>Email</th>
      //       <th>Is Administrator</th>
      //       <th>Password Expired</th>
      //     </tr>
      //   </thead>
      //   <tbody>
      //     {users.map(user => {
      //       return (
      //         <tr key={user.id}>
      //           <td>{user.name}</td>
      //           <td>{user.email}</td>
      //           <td>
      //             <Checkbox checked={user.isAdmin} />
      //           </td>
      //           <td>
      //             <Checkbox checked={user.passwordExpired} />
      //           </td>
      //         </tr>
      //       )
      //     })}
      //   </tbody>
      // </Table>
    )
  }
}

const mapStateToProps = state => {
  return {
    users: state.allUsers
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
