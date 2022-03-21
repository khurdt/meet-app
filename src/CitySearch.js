import React from 'react';

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
    this.setState({
      query: newValue,
      suggestions
    });
  }

  handleItemClicked = (suggestion) => {
    this.setState({
      query: suggestion
    })
  }

  render() {
    return (
      <div className='CitySearch'>
        <input
          type='text'
          className='city'
          value={this.state.query}
          onChange={this.handleInputChanged} />
        <ul className='suggestions'>
          {this.state.suggestions.map((suggestion) => (
            <li
              key={suggestion}
              onClick={() => this.handleItemClicked(suggestion)}
            >{suggestion}</li>
          ))}
          <li key='all'>
            <b>see all cities</b>
          </li>
        </ul>
      </div>
    );
  }
}

export default CitySearch;

