import React from 'react'
import {Container, Row, Col, Form, Button, FormLabel} from 'react-bootstrap'
import {connect} from 'react-redux'
import {addCategoryThunk} from '../store/product'

export class AddCategory extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      title: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    this.setState({
      title: event.target.value
    })
  }
  handleSubmit(event) {
    event.preventDefault()
    const title = this.state.title
    const newCategory = {title}
    this.props.addCategoryThunk(newCategory)
  }

  render() {
    return (
      <Container fluid="true">
        <h4>Create a new category</h4>
        <form onSubmit={this.handleSubmit}>
          <Form.Group>
            <FormLabel>Product title</FormLabel>
            <Form.Control
              required
              type="text"
              placeholder="Enter title"
              name="title"
              onChange={this.handleChange}
              value={this.state.title}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </form>
      </Container>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  addCategoryThunk: category => dispatch(addCategoryThunk(category))
})

export default connect(null, mapDispatchToProps)(AddCategory)
