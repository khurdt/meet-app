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
      this.setState({ showDetails: true })
    } else {
      this.setState({ showDetails: false })
    }
  }

  render() {

    return (
      <div>
        <h3 className='eventTitle'></h3>
        {showDetails ? (
          <div
            className='showDetails'
          >{this.state.showDetails}</div>
        ) : (
          <div
            className='showDetails'
          >{this.state.showDetails}</div>
        )}
      </div>
    );
  }
}

export default Event;
