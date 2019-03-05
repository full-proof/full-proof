import React from 'react'
import {withRouter} from 'react-router-dom'
import {ToggleButtonGroup, ToggleButton} from 'react-bootstrap'
import {AllUsers, AllOrders} from './'

class AdminPanel extends React.Component {
  constructor() {
    super()
    this.state = {
      adminFunction: 'products'
    }

    this.handleChange = this.handleChange.bind(this)
    this.displayAdminFunction = this.displayAdminFunction.bind(this)
  }

  handleChange(value, event) {
    this.setState({[event.target.name]: value})
  }

  displayAdminFunction() {
    const adminFunctionDisplay = {
      products: <p>products</p>,
      categories: <p>categories</p>,
      users: <AllUsers />,
      orders: <AllOrders />
    }
    return adminFunctionDisplay[this.state.adminFunction]
  }

  render() {
    return (
      <div>
        <ToggleButtonGroup
          vertical
          name="adminFunction"
          type="radio"
          defaultValue="products"
          onChange={this.handleChange}
        >
          <ToggleButton value="addproduct">Add Product</ToggleButton>
          <ToggleButton value="products">Products</ToggleButton>
          <ToggleButton value="categories">Categories</ToggleButton>
          <ToggleButton value="users">Users</ToggleButton>
          <ToggleButton value="orders">Orders</ToggleButton>
        </ToggleButtonGroup>
        {this.displayAdminFunction()}
      </div>
    )
  }
}

export default withRouter(AdminPanel)
