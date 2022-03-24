import React, { Component } from "react";
import { Col, Row } from "react-bootstrap";
import Event from "./Event";
import NumberOfEvents from "./NumberOfEvents";

class EventList extends Component {
  render() {
    const { events, updateEvents, suggestion } = this.props;

    return (
      <>
        <NumberOfEvents events={events} updateEvents={updateEvents} suggestion={suggestion} />
        <Row style={{ listStyleType: 'none' }} className="EventList">
          {events.map(event =>
            <Col key={event.id}>
              <Event event={event} />
            </Col>
          )}
        </Row>
      </>
    );
  }
}

export default EventList;
