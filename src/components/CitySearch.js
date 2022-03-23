import React from 'react';
import { Container, Row, Col, Form } from 'react-bootstrap';

class CitySearch extends React.Component {
  constructor() {
    super();
    this.state = {
      query: '',
      suggestions: []
    };
  }

  handleInputChanged = (event) => {
    const newValue = event.target.value;
    const suggestions = this.props.locations.filter((location) => {
      return location.toUpperCase().indexOf(newValue.toUpperCase()) > -1;
    })
    if (newValue === '') {
      this.setState({ query: newValue, suggestion: [''] });
      this.props.updateEvents('');
    } else {
      this.setState({ query: newValue, suggestions: suggestions });
    }
  }

  handleItemClicked = (suggestion) => {
    this.setState({
      query: suggestion
    });
    this.props.updateEvents(suggestion);
  }

  render() {
    let searching = false;
    if (this.state.query !== '') {
      searching = true
    } else {
      searching = false
    }
    return (
      <Container className='CitySearch'>
        <Form>
          <Form.Group className='m-auto' style={{ maxWidth: '200px' }}>
            <Form.Control
              type='text'
              className='city m-3'
              placeholder='search for cities'
              value={this.state.query}
              onChange={this.handleInputChanged} />
            {searching ? (
              <ul style={{ listStyleType: 'none', position: 'absolute' }} className="suggestions">
                {this.state.suggestions.map((suggestion) => (
                  <li
                    style={{ cursor: 'pointer' }}
                    key={suggestion}
                    onClick={() => this.handleItemClicked(suggestion)}
                  >{suggestion}</li>
                ))}
                <li
                  style={{ cursor: 'pointer' }}
                  onClick={() => this.handleItemClicked('')}>
                  <b>See all cities</b>
                </li>
              </ul>
            ) : (
              <div></div>
            )}
          </Form.Group>
        </Form>
      </Container>
    );
  }
}

export default CitySearch;

