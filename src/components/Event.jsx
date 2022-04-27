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
    const formattedDate = new Date(event.start.dateTime).toString().slice(0, 21);

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
          <Row>
            <div className='text-center mt-1 time-location' style={{ color: '#04ce71' }}>
              {event.location}
            </div>
          </Row>
          <Row>
            <div className='text-center'>
              {formattedDate}
            </div>
          </Row>
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
