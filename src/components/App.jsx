import React, { Component } from 'react';
import '../nprogress.css';
import { Container, Row, Navbar, Nav } from 'react-bootstrap';
import './App.css';
import NumberOfEvents from './NumberOfEvents';
import EventList from './EventList';
import CitySearch from './CitySearch';
import WelcomeScreen from './WelcomeScreen';
import { extractLocations, getEvents, checkToken, getAccessToken } from './api';
import { BrowserRouter as Router, Routes, Route, Redirect, Link } from 'react-router-dom';
import { WarningAlert } from './Alert';
import Charts from './Charts';

class App extends Component {
  constructor() {
    super();
    this.state = {
      events: [],
      locations: [],
      suggestion: '',
      number: 0,
      originalMaxEvents: 0,
      warningText: '',
      showWelcomeScreen: undefined
    }
    this.updateEvents = this.updateEvents.bind(this);
  }

  async componentDidMount() {
    this.mounted = true;
    const accessToken = localStorage.getItem('access_token');
    let isTokenValid;
    if (navigator.onLine) {
      isTokenValid = (await checkToken(accessToken)).error ? false :
        true;
    }
    const searchParams = new URLSearchParams(window.location.search);
    const code = searchParams.get('code');
    this.setState({ showWelcomeScreen: !(code || isTokenValid) });
    if (window.location.href.startsWith('http://localhost')) {
      getEvents().then((events) => {
        if (this.mounted) {
          this.setState({
            events, locations: extractLocations(events), number: events.length, originalMaxEvents: events.length
          });
        }
      });
    } else {
      if ((code || isTokenValid) && this.mounted) {
        getEvents().then((events) => {
          if (this.mounted) {
            this.setState({
              events, locations: extractLocations(events), number: events.length, originalMaxEvents: events.length
            });
          }
        });
      };
    }
  }

  componentWillUnmount() {
    this.mounted = false
  }

  checkInternetConnection = () => {
    if (!navigator.onLine) {
      this.setState({ warningText: 'Meet can be used offline, but events may not be updated.' })
    } else {
      this.setState({ warningText: '' })
    }
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
    this.checkInternetConnection();
  }

  render() {
    const { number, events, locations, suggestion, originalMaxEvents, warningText, showWelcomeScreen } = this.state

    if (showWelcomeScreen === undefined) return <div className="App" />

    let isEventsLoaded = false;
    if (events.length === 0) {
      isEventsLoaded = false;
    } else {
      isEventsLoaded = true;
    }

    return (
      <Router>
        <div className="App">
          <Navbar style={{ backgroundColor: '#474242', height: '30px', margin: '0', padding: '0', zIndex: '100' }}>
            <Navbar.Brand className='m-auto' style={{ color: '#00ffff', fontSize: '15px' }}>Meet</Navbar.Brand>
          </Navbar>
          <div style={{ height: '0px' }}>
            <WarningAlert className='ml-auto' text={warningText} />
          </div>

          <Route exact path='/' render={() => {
            return (
              <div>
                {isEventsLoaded ? (
                  <Container fluid style={{ margin: '10px' }}>
                    <Row className='justify-content-md-center'>
                      <CitySearch locations={locations} updateEvents={this.updateEvents} number={number} />
                      <NumberOfEvents updateEvents={this.updateEvents} suggestion={suggestion} number={number} originalMaxEvents={originalMaxEvents} events={events} />
                      <EventList events={events} updateEvents={this.updateEvents} suggestion={suggestion} />
                    </Row>
                  </Container>) : (
                  <WelcomeScreen showWelcomeScreen={this.state.showWelcomeScreen}
                    getAccessToken={() => { getAccessToken() }} />)}
              </div>
            );
          }} />

          <Route path='/charts' render={() => {
            return <Charts />
          }} />

          <div className='footer'>
            <Navbar style={{ backgroundColor: '#1E2127', height: '56px', margin: '0', padding: '0', zIndex: '100' }}>
              <Nav className='m-auto' style={{ backgroundColor: '#1E2127', paddingBottom: '20px' }}>
                <Nav.Link style={{ color: 'white' }} href='/'>Home</Nav.Link>
                <Nav.Link style={{ color: 'white' }} href='/charts'>Charts</Nav.Link>
              </Nav>
            </Navbar>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
