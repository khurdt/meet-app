import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './App.css';
import EventList from './EventList';
import CitySearch from './CitySearch';
import { extractLocations, getEvents } from './api';

class App extends Component {
  constructor() {
    super();
    this.state = {
      events: [],
      locations: []
    }
    this.updateEvents = this.updateEvents.bind(this);
  }

  componentDidMount() {
    this.mounted = true;
    getEvents().then((events) => {
      if (this.mounted) {
        this.setState({
          events, locations: extractLocations(events)
        });
      }
    });
  }

  componentWillUnmount() {
    this.mounted = false
  }

  updateEvents = (location) => {
    getEvents().then((events) => {
      const locationEvents = (location === '') ?
        events
        :
        events.filter((event) => event.location === location);
      this.setState({
        events: locationEvents
      });
    });
  }


  render() {
    const { events, locations } = this.state
    return (
      <div className="App">
        <Container>
          <Row className='justify-content-md-center'>
            <CitySearch locations={locations} updateEvents={this.updateEvents} />
            <EventList events={events} />
          </Row>
        </Container>
      </div>
    );
  }
}

export default App;
