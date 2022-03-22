import React from 'react';

class Event extends React.Component {
  constructor() {
    super();
    this.state = {
      showDetails: false
    };
  }

  handleEventClick = () => {
    if (this.state.showDetails === false) {
      this.setState({ showDetails: true });
    } else if (this.state.showDetails === true) {
      this.setState({ showDetails: false });
    }
  }

  render() {
    const { showDetails } = this.state

    return (
      <div>
        <h3 className='eventTitle'></h3>
        <button className='show-button' onClick={this.handleEventClick}>Show Details</button>
        {showDetails ? (
          <div className='showDetails'>
          </div>
        ) : (
          <div className='noDetails' style={{ display: 'none' }}>
          </div>
        )}
      </div>
    );
  }
}

export default Event;
