import React, { Component } from "react";
import { Col, Row } from "react-bootstrap";
import Event from "./Event";

class EventList extends Component {
  render() {
    const { events } = this.props;
    if (events.length === 0) {
      return <div></div>
    }

    return (
      <>
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
