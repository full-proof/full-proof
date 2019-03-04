import React from 'react'
import {Tabs, Tab, Jumbotron, Button} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import AllOrders from './AllOrders'

export class UserHome extends React.Component {
  constructor() {
    super()
    this.state = {
      key: 'profile'
    }
  }
  render() {
    const {name} = this.props

    return (
      <Tabs activeKey={this.state.key} onSelect={key => this.setState({key})}>
        <Tab eventKey="profile" title="Profile">
          <Jumbotron>
            <h3>Welcome, {name}</h3>
            <p>Please enjoy our selection of baking products!</p>
            <p>
              <Link to="/products">
                <Button variant="primary">Shop</Button>
              </Link>
            </p>
          </Jumbotron>
        </Tab>
        {this.props.user.isAdmin && (
          <Tab eventKey="adminPanel" title="Admin Panel">
            Admin Functionality
          </Tab>
        )}
        <Tab eventKey="orders" title="My Orders">
          <AllOrders userId={this.props.user.id} />
        </Tab>
      </Tabs>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    name: state.user.name,
    user: state.user
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  name: PropTypes.string
}
