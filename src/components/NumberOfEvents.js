import React from 'react';
import './App.css'
import { Form, Row, Col } from 'react-bootstrap';
import { Filter } from 'react-feather';

class NumberOfEvents extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      eventsNumber: 0
    };
  }

  componentDidMount() {
    this.setState({ eventsNumber: this.props.number })
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

  render() {
    const { eventsNumber } = this.state;
    return (
      <Form onSubmit={e => { e.preventDefault(); }}>
        <Form.Group>
          <Form.Label htmlFor='eventNumber'>Number of Events</Form.Label>
          <Row>
            <Col md={2}>
              <Form.Control
                style={{ maxWidth: '140px', textAlign: 'center' }}
                className='input'
                type='number'
                max={250}
                min={1}
                value={eventsNumber}
                onChange={(e) => this.handleEventNumber(e.target.value)} />
            </Col>
            <Col md={10} style={{ marginLeft: '150px', marginTop: '3px', position: 'absolute' }}>
              <Filter className='search-icon' onClick={() => this.handleUpdateEvents()} />
            </Col>
          </Row>
        </Form.Group>
      </Form >
    );
  }
}

export default NumberOfEvents;
