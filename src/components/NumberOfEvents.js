import React from 'react';
import './App.css'
import { Form, Row, Col, Modal } from 'react-bootstrap';
import { Filter } from 'react-feather';

class NumberOfEvents extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      eventsNumber: 0,
      show: false
    };
  }

  componentDidMount() {
    this.setState({ eventsNumber: this.props.number });
    if (this.props.number === 0) {
      setTimeout(() => { this.setState({ eventsNumber: this.props.number }) }, 1000);
    }
  }

  handleEventNumber = (newNumber) => {
    if (newNumber <= 0) {
      this.setState({ eventsNumber: 1 })
    } else {
      this.setState({ eventsNumber: newNumber });
    }
  }

  handleUpdateEvents = () => {
    this.props.updateEvents(this.props.suggestion, this.state.eventsNumber)
  }

  handleClose = () => {
    this.setState({ show: false });
  }
  handleShow = () => {
    this.setState({ show: true });
  }

  render() {
    const { eventsNumber, show } = this.state;
    return (
      <>
        <Modal show={show} onHide={this.handleClose} className='filter-modal'>
          <Modal.Header closeButton>
            <Modal.Title>Filter Events</Modal.Title>
          </Modal.Header>
          <Modal.Body className='modal-body'>
            <Form className='modal-form' onSubmit={e => { e.preventDefault(); }}>
              <Form.Group className='form-group'>
                <Form.Label htmlFor='eventNumber'>Number of Events</Form.Label>
                <Row className='row-input'>
                  <Col md={2} className='col-input'>
                    <Form.Control
                      style={{ width: '130px', textAlign: 'center', backgroundColor: '#474242', color: 'white' }}
                      className='input'
                      type='number'
                      max={250}
                      min={1}
                      value={eventsNumber}
                      onChange={(e) => this.handleEventNumber(e.target.value)} />
                  </Col>
                </Row>
              </Form.Group>
            </Form >
          </Modal.Body>
          <Modal.Footer>
            <Filter className='filter-modal-icon' onClick={() => { this.handleClose(); this.handleUpdateEvents() }}>
              Filter
            </Filter>
          </Modal.Footer>
        </Modal>
        <Row className='mt-4'>
          <Col>
            <div
              className='events-showing'
              value={this.props.events.length}
              style={{ fontSize: '20px' }}>
              Events Showing: <span style={{ paddingLeft: '10px' }}>{this.props.events.length}</span>
            </div>
          </Col>
          <Col xs={6} sm={5} md={3} lg={2}>
            <div style={{ fontSize: '20px' }}>Filter<span style={{ paddingLeft: '10px' }}><Filter className='filter-icon' onClick={() => this.handleShow()} /></span></div>
          </Col>
        </Row>
      </>
    );
  }
}

export default NumberOfEvents;
