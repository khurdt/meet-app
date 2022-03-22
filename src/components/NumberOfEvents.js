import React from 'react';

class NumberOfEvents extends React.Component {
  constructor() {
    super();
    this.state = {
      eventsNumber: 0,
    };
  }

  componentDidMount() {
    this.setState({ eventsNumber: this.props.numberOfEvents })
  }

  handleEventNumber = (e) => {
    const value = e.target.value;
    this.setState({ eventsNumber: value })
  }

  render() {
    const { numberOfEvents } = this.props;
    const { eventsNumber } = this.state;

    return (
      <input
        className='numberOfEvents'
        type='number'
        max={100}
        min={1}
        value={eventsNumber}
        onChange={this.handleEventNumber}
      />
    );
  }
}

export default NumberOfEvents;
