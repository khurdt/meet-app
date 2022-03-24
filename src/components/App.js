import React, { Component } from 'react';
import '../nprogress.css';
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
      locations: [],
      suggestion: '',
      number: ''
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

  updateEvents = (location, number) => {
    this.setState({ suggestion: location, number: number })
    getEvents().then((events) => {
      const locationEvents = (location === '') ?
        events
        :
        events.filter((event) => event.location === location);
      if (!number) {
        this.setState({
          events: locationEvents
        });
      } else {
        const numberLocationEvents = locationEvents.slice(0, number);
        this.setState({
          events: numberLocationEvents
        })
      }
    });
  }

  render() {
    const { events, locations, number, suggestion } = this.state
    if (events.length === 0) {
      return <div></div>
    }

    return (
      <div className="App">
        <Container>
          <Row className='justify-content-md-center'>
            <h2 className='m-2'>Cement Your Event</h2>
            <CitySearch locations={locations} updateEvents={this.updateEvents} number={number} />
            <EventList events={events} updateEvents={this.updateEvents} suggestion={suggestion} />
          </Row>
        </Container>
      </div>
    );
  }
}

export default App;
