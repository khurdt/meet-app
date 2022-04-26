import React from 'react';
import './App.css'
import { Container, Form } from 'react-bootstrap';
import { InfoAlert } from './Alert';

class CitySearch extends React.Component {
  constructor() {
    super();
    this.state = {
      query: '',
      suggestions: [],
      showSuggestions: undefined,
      infoText: ''
    };
  }

  handleInputChanged = (event) => {
    const newValue = event.target.value;
    const suggestions = this.props.locations.filter((location) => {
      return location.toUpperCase().indexOf(newValue.toUpperCase()) > -1;
    })
    if (suggestions.length === 0) {
      this.setState({
        query: newValue,
        suggestions: [],
        infoText: 'City not found. Try again please'
      });
    } else {
      return this.setState({
        query: newValue,
        suggestions,
        infoText: ''
      });
    }
  }

  handleItemClicked = (suggestion) => {
    this.setState({
      query: suggestion,
      showSuggestions: false,
      suggestions: [],
      infoText: ''
    });
    this.props.updateEvents(suggestion, this.props.number, this.props.genre);
  }

  render() {
    return (
      <Container className='CitySearch'>
        <Form onSubmit={e => { e.preventDefault(); }}>
          <Form.Group className='m-auto' style={{ maxWidth: '250px' }}>
            <div style={{ height: '0px' }}>
              <InfoAlert text={this.state.infoText} />
            </div>
            <Form.Control
              style={{ backgroundColor: '#474242', color: 'white', borderRadius: '3%' }}
              type='text'
              className='city mt-4 shadow-none'
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

