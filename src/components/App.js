import React from 'react';
import './App.css';
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';

function App() {
  return (
    <div className="App">
      <NumberOfEvents />
      <CitySearch />
      <EventList />
    </div>
  );
}

export default App;