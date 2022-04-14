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
        <div key={event.id} className='mt-4 mb-4 event-card' style={{ width: '330px', height: '150px' }}>
          <Card.Header>
            <Row>
              <Col xs={9} sm={9} md={9}>
                <Card.Title style={{ color: '#00ffff' }} className='eventTitle'>{event.summary}</Card.Title>
              </Col>
              <Col xs={1}>
                <ArrowRight
                  className='show-button'
                  style={{ height: '30px', maxWidth: '50px', marginRight: '15px' }}
                  onClick={this.handleShow} />
              </Col>
            </Row>
          </Card.Header>
          <Card.Text className='m-2'>
            {formattedDate}
            <span style={{ paddingRight: '10px', paddingLeft: '10px' }}>
              {formattedTime}
            </span> |
            <span style={{ paddingLeft: '10px' }}>
              {event.location}
            </span>
          </Card.Text>
        </div>
        <Modal show={show} onHide={this.handleClose} className='details-modal .modal-content'>
          <Modal.Header closeButton>
            <Modal.Title style={{ color: '#00ffff' }}>{event.summary}</Modal.Title>
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
