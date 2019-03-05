import React from 'react'
import {Button, ButtonToolbar, Jumbotron} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {AllOrders, AdminPanel} from './'

export class UserHome extends React.Component {
  constructor() {
    super()
    this.handleChange = this.handleChange.bind(this)
    this.displayTab = this.displayTab.bind(this)
  }

  handleChange(value, event) {
    this.setState({[event.target.name]: value})
  }

  displayTab() {
    const tabDisplay = {
      profile: (
        <Jumbotron>
          <h3>Welcome, {this.props.name}</h3>
          <p>Please enjoy our selection of baking products!</p>
          <p>
            <Link to="/products">
              <Button variant="primary">Shop</Button>
            </Link>
          </p>
        </Jumbotron>
      ),
      adminpanel: <AdminPanel />,
      myorders: <AllOrders selectedUserId={this.props.user.id} />
    }

    return tabDisplay[this.props.match.params.view || 'profile']
  }

  render() {
    return (
      <div>
        <ButtonToolbar>
          <Link to="/home/profile">
            <Button
              value="profile"
              active={this.props.match.params.view === 'profile'}
            >
              Profile
            </Button>
          </Link>
          <Link to="/home/adminpanel">
            <Button
              value="adminpanel"
              active={this.props.match.params.view === 'adminpanel'}
            >
              Admin Panel
            </Button>
          </Link>
          <Link to="/home/myorders">
            <Button
              value="myorders"
              active={this.props.match.params.view === 'myorders'}
            >
              My Orders
            </Button>
          </Link>
        </ButtonToolbar>
        {this.displayTab()}
      </div>
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
