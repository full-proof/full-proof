import React from 'react'
import {connect} from 'react-redux'
import {
  Container,
  Row,
  Col,
  Collapse,
  Form,
  FormLabel,
  Button
} from 'react-bootstrap'

export class EditCheckout extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      edit: false,
      name: '',
      address_line1: '',
      address_line2: '',
      city: '',
      state_province: '',
      postalCode: 0
    }
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  render() {
    const {edit} = this.state
    return (
      <div>
        <Button
          onClick={() => this.setState({edit: !edit})}
          aria-expanded={edit}
        >
          Edit Shipping Address
        </Button>
        <Collapse in={this.state.edit}>
          <Container fluid="true">
            <Form onSubmit={this.handleSubmit}>
              <Form.Group>
                <Row>
                  <FormLabel>Customer Name</FormLabel>
                  <Form.Control
                    type="text"
                    name="name"
                    onChange={this.handleChange}
                    value={this.state.name}
                  />
                </Row>
                <Row>
                  <FormLabel>Street Address</FormLabel>
                  <Form.Control
                    type="text"
                    placeholder="Address Line 1"
                    name="address_line1"
                    onChange={this.handleChange}
                    value={this.state.address_line1}
                  />
                </Row>
                <Row>
                  <FormLabel>(Optional)</FormLabel>
                  <Form.Control
                    type="text"
                    placeholder="Address Line 2"
                    name="address_line2"
                    onChange={this.handleChange}
                    value={this.state.address_line2}
                  />
                </Row>
                <Row>
                  <Col>
                    <FormLabel>State</FormLabel>
                    <Form.Control
                      type="text"
                      name="city_province"
                      onChange={this.handleChange}
                      value={this.state.city_province}
                    />
                  </Col>
                  <Col>
                    <FormLabel>ZIP Code</FormLabel>
                    <Form.Control
                      type="integer"
                      name="postalCode"
                      onChange={this.handleChange}
                      value={this.state.postalCode}
                    />
                  </Col>
                </Row>
              </Form.Group>
              <Button variant="primary" type="submit">
                Submit Order
              </Button>
            </Form>
          </Container>
        </Collapse>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    loggedinUser: state.user
  }
}

export default connect(mapStateToProps)(EditCheckout)
