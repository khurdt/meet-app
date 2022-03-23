import React from 'react';
import { Card, Button, Row, Col } from 'react-bootstrap';

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
    const { showDetails } = this.state;
    const { event } = this.props;
    const formattedDate = event.start.dateTime.slice(0, 10);
    const formattedTime = event.start.dateTime.slice(11, 16);

    return (
      <Card key={event.id} className='m-2 mt-3 p-2' style={{ maxWidth: '400px' }}>
        <Card.Title className='eventTitle'>{event.summary}</Card.Title>
        <Card.Text>{formattedDate} <span style={{ paddingRight: '10px' }} >{formattedTime}</span>|<span style={{ paddingLeft: '10px' }}>{event.location}</span></Card.Text>
        {showDetails ? (
          <Card.Text className='showDetails'>{event.description}</Card.Text>
        ) : (
          <div className='noDetails' />
        )}
        <Col md={{ offset: 9 }}>
          <Button
            className='show-button ml-auto'
            style={{ height: '30px', width: '100px', fontSize: '12px' }}
            onClick={this.handleEventClick}>More Info</Button>
        </Col>
      </Card>
    );
  }
}

export default Event;
