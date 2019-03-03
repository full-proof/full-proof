import React from 'react'
import {Tabs, Tab, Jumbotron, Button} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import AllOrders from './AllOrders'

class UserHome extends React.Component {
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
        <Tab eventKey="orders" title="Orders">
          <AllOrders userId={this.props.userId} />
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
    userId: state.user.id
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  name: PropTypes.string
}
