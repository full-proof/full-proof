import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import PropTypes from 'prop-types'
import {
  Login,
  Signup,
  UserHome,
  AllProducts,
  AllUsers,
  SingleProduct,
  AllOrders,
  SingleOrder,
  Cart,
  AddProduct,
  AddCategory
} from './components'
import {me} from './store'
import {fetchCartThunk} from './store/cart'

class Main extends Component {
  async componentDidMount() {
    await this.props.loadInitialData()
    this.props.fetchCartThunk()
  }

  render() {
    const {isLoggedIn} = this.props

    return (
      <Switch>
        {/* Routes placed here are available to all visitors */}
        <Route path="/users" component={AllUsers} />
        <Route exact path="/orders" component={AllOrders} />
        <Route path="/orders/:id" component={SingleOrder} />
        <Route exact path="/cart" component={Cart} />
        <Route exact path="/products" component={AllProducts} />
        <Route exact path="/products/:id" component={SingleProduct} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/addProduct" component={AddProduct} />{' '}
        {/* {change this eventually} */}
        <Route path="/addCategory" component={AddCategory} />{' '}
        {/* {change this eventual to products/categories} */}
        {isLoggedIn && (
          <Switch>
            {/* Routes placed here are only available after logging in */}

            <Route path="/home/:view" component={UserHome} />
            {/*<Route
              path="/home/myOrders"
              component={() => <UserHome view="myorders" />}
            /> */}
            <Route path="/home" component={UserHome} />
          </Switch>
        )}
        {/* Displays our Login component as a fallback */}
        <Route component={Login} />
      </Switch>
    )
  }
}

const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      return dispatch(me())
    },
    fetchCartThunk: () => {
      dispatch(fetchCartThunk())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Main))

/**
 * PROP TYPES
 */
Main.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
