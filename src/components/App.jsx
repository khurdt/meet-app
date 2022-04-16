import React, { Component } from 'react';
import '../nprogress.css';
import { Container, Row, Col } from 'react-bootstrap';
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
        <Container fluid style={{ margin: '10px' }}>
          <Row className='justify-content-md-center'>
            <Col>
              <h2 className='m-2'>Meet</h2>
              <img src='./public/meet-app-192.png'></img>
            </Col>
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
