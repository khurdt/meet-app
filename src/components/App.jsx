import React, { Component } from 'react';
import './App.css';
import NumberOfEvents from './NumberOfEvents';
import EventList from './EventList';
import CitySearch from './CitySearch';
import WelcomeScreen from './WelcomeScreen';
import Charts from './Charts';
import { extractLocations, getEvents, checkToken, getAccessToken } from './api';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Container, Row, Navbar, Nav } from 'react-bootstrap';
import { Home, BarChart2 } from 'react-feather';
import '../nprogress.css';
import { WarningAlert } from './Alert';

class App extends Component {
  constructor() {
    super();
    this.state = {
      events: [],
      locations: [],
      suggestion: '',
      genre: 'all',
      number: 0,
      originalEvents: [],
      originalMaxEvents: 0,
      warningText: '',
      noEventsWarning: 'please try another city or clear filters',
      showWelcomeScreen: undefined,
      active: 'home'
    }
    this.updateEvents = this.updateEvents.bind(this);
    this.handlePageHighlighting = this.handlePageHighlighting.bind(this);
  }

  async componentDidMount() {
    this.mounted = true;
    const accessToken = localStorage.getItem('access_token');
    let isTokenValid = (checkToken(accessToken)).error ? false : true;
    if (accessToken && !navigator.onLine) { isTokenValid = true }
    const searchParams = new URLSearchParams(window.location.search);
    const code = searchParams.get('code');
    this.setState({ showWelcomeScreen: !(code || isTokenValid) });
    if (window.location.href.startsWith('http://localhost')) {
      getEvents().then((events) => {
        if (this.mounted) {
          this.setState({
            events,
            locations: extractLocations(events),
            number: events.length,
            originalMaxEvents: events.length,
            originalEvents: events
          });
        }
      });
    } else if ((code || isTokenValid) && this.mounted) {
      getEvents().then((events) => {
        if (this.mounted) {
          this.setState({
            events,
            locations: extractLocations(events),
            number: events.length,
            originalMaxEvents: events.length,
            originalEvents: events
          });
        }
      });
    }
    this.checkInternetConnection();
  }

  componentWillUnmount() {
    this.mounted = false
    this.handlePageHighlighting('');
  }

  checkInternetConnection = () => {
    if (!navigator.onLine) {
      this.setState({ warningText: 'Meet can be used offline, but events may not be updated.' })
    } else {
      this.setState({ warningText: '' })
    }
  }

  updateEvents = (location, number, genre) => {
    this.setState({ suggestion: location, number: number, genre })
    console.log(location, number, genre);
    getEvents().then((events) => {
      if (!number) {
        number = this.state.originalMaxEvents
      }
      const locationEvents = (location === '') ? events : events.filter((event) => event.location === location);

      if (genre === 'all') {
        let filteredEvents = locationEvents.slice(0, number);
        this.setState({ events: filteredEvents })
      } else {
        let filteredEvents = locationEvents.filter((event) => event.summary.split(' ').includes(genre)).slice(0, number);
        this.setState({ events: filteredEvents });
      }
    });
    this.checkInternetConnection();
  }

  handlePageHighlighting = (page) => {
    this.setState({ active: page });
  }

  render() {
    const { number, events, locations, suggestion, originalMaxEvents, originalEvents, warningText, noEventsWarning, showWelcomeScreen, active, genre } = this.state

    if (showWelcomeScreen === undefined) return <div className="App" />

    let isEventsLoaded = false;
    if (showWelcomeScreen === undefined) {
      isEventsLoaded = false;
    } else {
      isEventsLoaded = true;
    }

    let noEvents = false;
    if (events.length === 0) {
      noEvents = true;
    } else {
      noEvents = false;
    }

    //page highlighting
    let homeIcon, chartsIcon;
    if (active === 'home') {
      homeIcon = { color: '#00e2e2' };
      chartsIcon = { color: '#474242' };
    } else if (active === 'charts') {
      homeIcon = { color: '#474242' };
      chartsIcon = { color: '#00e2e2' };
    }

    return (
      <Router>
        <Container fluid className="App" style={{ padding: '0px', margin: '0px', overflow: 'none' }}>
          <div className='navbar-top' style={{ position: 'absolute', top: '0', right: '0', left: '0', width: '100%' }}>
            <Navbar style={{ backgroundColor: '#dddcdc', height: '30px', margin: '0', padding: '0', zIndex: '100' }}>
              <Navbar.Brand className='m-auto' style={{ color: '#000', fontSize: '15px' }}>Meet</Navbar.Brand>
            </Navbar>
          </div>
          <div style={{ height: '0px' }}>
            <WarningAlert className='ml-auto' text={warningText} />
          </div>

          <Route exact path='/meet-app' render={() => {
            return (
              <div>
                {isEventsLoaded ? (
                  <Container fluid className='pt-4'>
                    <Row className='justify-content-md-center'>
                      <CitySearch locations={locations} updateEvents={this.updateEvents} number={number} genre={genre} />
                      <NumberOfEvents updateEvents={this.updateEvents} suggestion={suggestion} number={number} originalMaxEvents={originalMaxEvents} events={events} />
                      <EventList events={events} updateEvents={this.updateEvents} suggestion={suggestion} />
                      {noEvents ? (<div className='mt-5'><WarningAlert text={noEventsWarning} /></div>) : (<div />)}
                    </Row>
                  </Container>) : (
                  <WelcomeScreen showWelcomeScreen={this.state.showWelcomeScreen}
                    getAccessToken={() => { getAccessToken() }} />)}
              </div>
            );
          }} />

          <Route path='/meet-app/charts' render={() => {
            return <Charts originalEvents={originalEvents} locations={locations} handlePageHighlighting={this.handlePageHighlighting} />
          }} />

          {isEventsLoaded ? (
            <div className='footer'>
              <Navbar style={{ backgroundColor: '#dddcdc', height: '50px' }}>
                <Nav className='m-auto' style={{ backgroundColor: '#dddcdc' }}>
                  <Nav.Link as={Link} className='m-1 nav-icon' onClick={() => this.handlePageHighlighting('home')} to='/meet-app'><Home style={homeIcon} className='nav-icon' size={30} /></Nav.Link>
                  <Nav.Link as={Link} className='m-1 nav-icon' to='/meet-app/charts'><BarChart2 style={chartsIcon} className='nav-icon' size={30} /></Nav.Link>
                </Nav>
              </Navbar>
            </div>) : (
            <div></div>
          )}
        </Container>
      </Router >
    );
  }
}

export default App;
