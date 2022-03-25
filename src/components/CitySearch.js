import React from 'react';
import './App.css'
import { Container, Form } from 'react-bootstrap';

class CitySearch extends React.Component {
  constructor() {
    super();
    this.state = {
      query: '',
      suggestions: [],
      showSuggestions: undefined
    };
  }

  handleInputChanged = (event) => {
    const newValue = event.target.value;
    const suggestions = this.props.locations.filter((location) => {
      return location.toUpperCase().indexOf(newValue.toUpperCase()) > -1;
    })
    this.setState({ query: newValue, suggestions: suggestions });
  }

  handleItemClicked = (suggestion) => {
    this.setState({
      query: suggestion,
      showSuggestions: false
    });
    this.props.updateEvents(suggestion, this.props.number);
  }

  render() {
    return (
      <Container className='CitySearch'>
        <Form>
          <Form.Group className='m-auto' style={{ maxWidth: '200px' }}>
            <Form.Control
              type='text'
              className='city mt-4'
              placeholder='search for cities'
              value={this.state.query}
              onChange={this.handleInputChanged}
              onFocus={() => { this.setState({ showSuggestions: true }) }}
              onBlur={() => { this.setState({ showSuggestions: false }) }} />
            <ul
              className="suggestions"
              style={this.state.showSuggestions ? { listStyleType: 'none', position: 'absolute' } : { display: 'none' }}>
              {this.state.suggestions.map((suggestion) => (
                <li
                  className='suggestion-items'
                  key={suggestion}
                  onMouseDown={() => this.handleItemClicked(suggestion)}
                >{suggestion}</li>
              ))}
              <li
                className='suggestion-items'
                onMouseDown={() => this.handleItemClicked('')}>
                <b>See all cities</b>
              </li>
            </ul>
          </Form.Group>
        </Form>
      </Container >
    );
  }
}

export default CitySearch;

