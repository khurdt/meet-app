import React, { Component } from "react";
import { Col, Row } from "react-bootstrap";
import Event from "./Event";
import NumberOfEvents from "./NumberOfEvents";

class EventList extends Component {
  render() {
    const { events } = this.props;
    return (
      <>
        <NumberOfEvents numberOfEvents={events.length} />
        <Row style={{ listStyleType: 'none' }} className="EventList">
          {events.map(event =>
            <Event event={event} />
          )}
        </Row>
      </>
    );
  }
}

export default EventList;
