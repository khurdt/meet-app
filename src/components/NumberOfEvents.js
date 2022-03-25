import React from 'react';
import './App.css'
import { Form, Row, Col } from 'react-bootstrap';
import { Search } from 'react-feather';

class NumberOfEvents extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      eventsNumber: 0
    };
  }

  componentDidMount() {
    this.setState({ eventsNumber: this.props.events.length })
    if (this.props.events.length === 0) {
      setTimeout(() => { this.setState({ eventsNumber: this.props.events.length }) }, 500);
    }
  }

  handleEventNumber = (e) => {
    const newNumber = e.target.value;
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
    const { events } = this.props
    return (
      <Form>
        <Form.Group>
          <Form.Label htmlFor='eventNumber'>Number of Events</Form.Label>
          <Row>
            <Col md={2}>
              <Form.Control
                style={{ maxWidth: '140px', textAlign: 'center' }}
                className='input'
                type='number'
                max={100}
                min={1}
                value={eventsNumber}
                onChange={(e) => this.handleEventNumber(e)} />
            </Col>
            <Col md={10} style={{ marginLeft: '150px', marginTop: '3px', position: 'absolute' }}>
              <Search className='search-icon' onClick={() => this.handleUpdateEvents()} />
            </Col>
          </Row>
        </Form.Group>
      </Form >
    );
  }
}

export default NumberOfEvents;
