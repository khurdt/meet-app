import React from 'react';
import './App.css'
import { Card, Button, Row, Col, Modal } from 'react-bootstrap';
import { ArrowRight } from 'react-feather';

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
        <div key={event.id} className='mt-4 mb-4 event-card'>
          <Card.Header>
            <Row>
              <Col xs={9} sm={9} md={9}>
                <div style={{ color: '#00e2e2' }} className='eventTitle' onClick={this.handleShow} >{event.summary}</div>
              </Col>
              <Col xs={1}>
                <ArrowRight
                  className='show-button'
                  style={{ cursor: 'pointer' }}
                  onClick={this.handleShow} />
              </Col>
            </Row>
          </Card.Header>
          <div className='m-2 time-location'>
            {formattedDate}
            <span style={{ paddingRight: '10px', paddingLeft: '10px' }}>
              {formattedTime}
            </span> |
            <span style={{ paddingLeft: '10px' }}>
              {event.location}
            </span>
          </div>
        </div>
        <Modal show={show} onHide={this.handleClose} className='details-modal .modal-content'>
          <Modal.Header closeButton>
            <Modal.Title style={{ color: '#00e2e2' }}>{event.summary}</Modal.Title>
          </Modal.Header>
          <Modal.Body>{event.description}</Modal.Body>
          <Modal.Footer className='.details-footer'>
            <Button className='close-button' variant="secondary" onClick={this.handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

export default Event;
