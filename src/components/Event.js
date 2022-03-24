import React from 'react';
import './App.css'
import { Card, Button, Row, Col, Modal } from 'react-bootstrap';
import { ArrowRight, ArrowDown } from 'react-feather';

class Event extends React.Component {
  constructor() {
    super();
    this.state = {
      show: false
    };
  }

  handleClose = () => {
    this.setState({ show: false });
  }
  handleShow = () => {
    this.setState({ show: true });
  }

  render() {
    const { show } = this.state;
    const { event } = this.props;
    const formattedDate = event.start.dateTime.slice(0, 10);
    const formattedTime = event.start.dateTime.slice(11, 16);

    return (
      <>
        <div key={event.id} className='p-2 m-3 event-card' style={{ width: '300px', height: '100px' }}>
          <Row>
            <Col>
              <Card.Title className='eventTitle'>{event.summary}</Card.Title>
            </Col>
            <ArrowRight
              className='show-button'
              style={{ height: '30px', maxWidth: '50px', marginRight: '15px' }}
              onClick={this.handleShow} />
          </Row>
          <Card.Text className='m-2'>
            {formattedDate}<span style={{ paddingRight: '10px' }}>
              {formattedTime}</span>|<span style={{ paddingLeft: '10px' }}>
              {event.location}</span>
          </Card.Text>
        </div>
        <Modal show={show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{event.summary}</Modal.Title>
          </Modal.Header>
          <Modal.Body>{event.description}</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

export default Event;
