import React from 'react';
import { Form } from 'react-bootstrap';

class NumberOfEvents extends React.Component {
  constructor() {
    super();
    this.state = {
      eventsNumber: 0
    };
  }

  componentDidMount() {
    this.setState({ eventsNumber: this.props.numberOfEvents })
  }

  handleEventNumber = (e) => {
    const value = e.target.value;
    this.setState({ eventsNumber: value })
  }

  render() {
    const { numberOfEvents } = this.props;
    const { eventsNumber } = this.state;

    return (
      <Form>
        <Form.Group>
          <Form.Label htmlFor='eventNumber'>Number of Events</Form.Label>
          <Form.Control
            style={{ maxWidth: '120px', textAlign: 'center' }}
            className='numberOfEvents'
            type='number'
            max={numberOfEvents}
            min={1}
            value={eventsNumber}
            onChange={(e) => this.handleEventNumber(e)}
          />
        </Form.Group>
      </Form>
    );
  }
}

export default NumberOfEvents;
