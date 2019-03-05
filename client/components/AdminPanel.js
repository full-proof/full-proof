import React from 'react'
import {withRouter} from 'react-router-dom'
import {
  ToggleButtonGroup,
  ToggleButton,
  Container,
  Row,
  Col
} from 'react-bootstrap'
import {AllUsers, AllOrders, AddProduct, AddCategory} from './'

class AdminPanel extends React.Component {
  constructor() {
    super()
    this.state = {
      adminFunction: 'orders'
    }

    this.handleChange = this.handleChange.bind(this)
    this.displayAdminFunction = this.displayAdminFunction.bind(this)
  }

  handleChange(value, event) {
    this.setState({[event.target.name]: value})
  }

  displayAdminFunction() {
    const adminFunctionDisplay = {
      addproduct: <AddProduct />,
      categories: <AddCategory />,
      users: <AllUsers />,
      orders: <AllOrders />
    }
    return adminFunctionDisplay[this.state.adminFunction]
  }

  render() {
    return (
      <div>
        <Container fluid>
          <Row>
            <Col lg={1} md={1} sm={1} xl={1} xs={1}>
              <ToggleButtonGroup
                vertical
                name="adminFunction"
                type="radio"
                defaultValue="orders"
                onChange={this.handleChange}
              >
                <ToggleButton value="orders">Orders</ToggleButton>
                <ToggleButton value="users">Users</ToggleButton>
                <ToggleButton value="addproduct">Add Product</ToggleButton>
                <ToggleButton value="categories">Categories</ToggleButton>
              </ToggleButtonGroup>
            </Col>
            <Col>{this.displayAdminFunction()}</Col>
          </Row>
        </Container>
      </div>
    )
  }
}

export default withRouter(AdminPanel)
