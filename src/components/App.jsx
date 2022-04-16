import React, { Component } from 'react';
import '../nprogress.css';
import { Container, Row, Navbar } from 'react-bootstrap';
import './App.css';
import NumberOfEvents from './NumberOfEvents';
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
      number: 0,
      originalMaxEvents: 0
    }
    this.updateEvents = this.updateEvents.bind(this);
  }

  componentDidMount() {
    this.mounted = true;
    getEvents().then((events) => {
      if (this.mounted) {
        this.setState({
          events, locations: extractLocations(events), number: events.length, originalMaxEvents: events.length
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
    const { number, events, locations, suggestion, originalMaxEvents } = this.state
    return (
      <div className="App">
        <Navbar style={{ backgroundColor: '#474242', height: '30px', margin: '0', padding: '0', zIndex: '100' }}>
          <Navbar.Brand className='m-auto' style={{ color: '#00ffff', fontSize: '15px' }}>Meet</Navbar.Brand>
        </Navbar>
        <Container fluid style={{ margin: '10px' }}>
          <Row className='justify-content-md-center'>
            <CitySearch locations={locations} updateEvents={this.updateEvents} number={number} />
            <NumberOfEvents updateEvents={this.updateEvents} suggestion={suggestion} number={number} originalMaxEvents={originalMaxEvents} events={events} />
            <EventList events={events} updateEvents={this.updateEvents} suggestion={suggestion} />
          </Row>
        </Container>
      </div>
    );
  }
}

export default App;
