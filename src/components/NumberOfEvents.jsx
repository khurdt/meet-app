import React from 'react';
import './App.css'
import { Form, Row, Col, Modal, Button } from 'react-bootstrap';
import { Filter } from 'react-feather';
import { ErrorAlert } from './Alert';

class NumberOfEvents extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      eventsNumber: 0,
      show: false,
      errorText: '',
      genre: 'all'
    };
  }

  componentDidMount() {
    this.setState({ eventsNumber: this.props.number });
    if (this.props.number === 0) {
      setTimeout(() => { this.setState({ eventsNumber: this.props.number }) }, 1000);
    }
  }

  handleEventNumber = (newNumber) => {
    if (newNumber < 0) {
      this.setState({ eventNumber: newNumber, errorText: 'invalid number' });
    } else {
      this.setState({ eventsNumber: newNumber, errorText: '' });
    }
  }

  handleGenre = (genre) => {
    this.setState({ genre })
  }

  handleUpdateEvents = () => {
    if (this.state.eventsNumber == 0) {
      this.setState({ errorText: 'number must be greater than 0' });
    } else {
      this.props.updateEvents(this.props.suggestion, this.state.eventsNumber, this.state.genre)
      this.handleClose();
      this.setState({ errorText: '' });
    }
  }

  handleClose = () => {
    this.setState({ show: false });
  }
  handleShow = () => {
    this.setState({ show: true });
  }

  clearFilters = () => {
    this.handleEventNumber(this.props.originalMaxEvents);
    this.handleGenre('all')
    setTimeout(() => {
      this.handleUpdateEvents();
      this.handleClose();
    }, 200);
  }

  render() {
    const { eventsNumber, show, genre } = this.state;
    return (
      <>
        <Modal show={show} onHide={this.handleClose} className='filter-modal'>
          <Modal.Header closeButton>
            <Modal.Title>Filter Events</Modal.Title>
            <Button className='m-auto clear-filter' style={{ backgroundColor: '#474242' }} onClick={() => { this.clearFilters() }}>Clear Filters</Button>
          </Modal.Header>
          <Modal.Body className='modal-body'>
            <Form className='modal-form' onSubmit={e => { e.preventDefault(); }}>
              <Form.Group className='form-group'>
                <Row className='row-input'>
                  <Col className='col-input'>
                    <Form.Label>Number of Events</Form.Label>
                    <Form.Control
                      style={{ width: '130px', textAlign: 'center', backgroundColor: '#474242', color: 'white' }}
                      className='input'
                      type='number'
                      max={250}
                      min={0}
                      value={eventsNumber}
                      onChange={(e) => this.handleEventNumber(e.target.value)} />
                  </Col>
                  <Col>
                    <Form.Label>Events by Genre</Form.Label>
                    <Form.Select
                      style={{ width: '130px', textAlign: 'center', backgroundColor: '#474242', color: 'white' }}
                      aria-label="Default select example"
                      value={genre}
                      onChange={(e) => this.handleGenre(e.target.value)}>
                      <option value='all'>all</option>
                      <option value="React">React</option>
                      <option value="JavaScript">JavaScript</option>
                      <option value="Node">Node</option>
                      <option value="jQuery">jQuery</option>
                      <option value="AngularJS">AngularJS</option>
                    </Form.Select>
                  </Col>
                </Row>
              </Form.Group>
            </Form >
          </Modal.Body>
          <Modal.Footer>
            <Col className='pb-3' style={{ height: '0px' }}>
              <ErrorAlert text={this.state.errorText} />
            </Col>
            <div style={{ display: 'flex', fontSize: '20px' }} className='filter-modal-icon' onClick={() => { this.handleUpdateEvents() }}>
              <div>Apply</div>
              <div style={{ paddingLeft: '10px' }} >
                <Filter />
              </div>
            </div>
          </Modal.Footer>
        </Modal>
        <Row>
          <Col>
            <div
              className='events-filter mt-4'
              value={this.props.events.length}>
              Events Showing:
              <div className='event-showing'>
                {this.props.events.length}
              </div>
              <div className='filter-icon' style={{ display: 'flex' }} onClick={() => this.handleShow()}>
                <div>
                  Filter
                </div>
                <div style={{ paddingLeft: '10px' }}>
                  <Filter />
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </>
    );
  }
}

export default NumberOfEvents;
