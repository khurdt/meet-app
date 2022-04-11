import React from 'react';
import { shallow, mount } from 'enzyme';
import App from '../components/App';
import EventList from '../components/EventList';
import CitySearch from '../components/CitySearch';
import { extractLocations, getEvents } from '../components/api';
import { mockEvents } from '../components/mock-data';
import NumberOfEvents from '../components/NumberOfEvents';

//test suite
describe('<App /> components', () => {
  let AppWrapper;
  beforeAll(() => {
    AppWrapper = shallow(<App />);
  })

  test('render list of events', () => {
    expect(AppWrapper.find(EventList)).toHaveLength(1);
  });
  test('render CitySearch', () => {
    expect(AppWrapper.find(CitySearch)).toHaveLength(1);
  })
  test('render NumberOfEvents', () => {
    expect(AppWrapper.find(NumberOfEvents)).toHaveLength(1);
  })
});

describe('<App /> integration', () => {
  let AppWrapper;
  beforeAll(() => {
    AppWrapper = mount(<App />);
  })


  test('App passes "events" state as aprop to EventList', () => {
    const AppWrapper = mount(<App />);
    const AppEventsState = AppWrapper.state('events');
    expect(AppEventsState).not.toEqual(undefined);
    expect(AppWrapper.find(EventList).props().events).toEqual(AppEventsState);
    AppWrapper.unmount();
  });

  test('App passes "locations" state as a prop to CitySearch', async () => {
    const AppWrapper = mount(<App />);
    const AppLocationsState = AppWrapper.state('locations');
    expect(AppLocationsState).not.toEqual(undefined);
    expect(AppWrapper.find(CitySearch).props().locations).toEqual(AppLocationsState);
    AppWrapper.unmount();
  });

  test('get list of events matching the city selected by the user', async () => {
    const CitySearchWrapper = AppWrapper.find(CitySearch);
    await CitySearchWrapper.find('.suggestions');
    const locations = extractLocations(mockEvents);
    CitySearchWrapper.setState({ suggestions: locations });
    const suggestions = CitySearchWrapper.state('suggestions');
    const selectedIndex = Math.floor(Math.random() * (suggestions.length));
    const selectedCity = suggestions[selectedIndex];
    await CitySearchWrapper.instance().handleItemClicked(selectedCity);
    const allEvents = await getEvents();
    const eventsToShow = allEvents.filter(event => event.location === selectedCity);
    expect(AppWrapper.state('events')).toEqual(eventsToShow);
    AppWrapper.unmount();
  });

  test('get list of all events when user selects "see all cities"', async () => {
    const AppWrapper = mount(<App />);
    await AppWrapper.find(CitySearch).find('.suggestions');
    const suggestionItems = AppWrapper.find(CitySearch).find('.suggestions li');
    await suggestionItems.at(suggestionItems.length - 1).simulate('mousedown');
    const allEvents = await getEvents();
    expect(AppWrapper.state('events')).toEqual(allEvents);
    AppWrapper.unmount();
  });

  test('get correct number of events when user submit amount of events to filter"', async () => {
    const AppWrapper = mount(<App />);
    await AppWrapper.find('.filter-icon').at(0).simulate('click');
    AppWrapper.find('.input').at(0).simulate('change', {
      target: { value: 3 }
    });
    await AppWrapper.find('.filter-modal-icon').at(0).simulate('click');
    await getEvents();
    expect(AppWrapper.state('events')).toHaveLength(3);
    AppWrapper.unmount();
  });

});





// describe('test Event state', () => {
//   beforeAll(() => {
//     mountEventWithState();
//   });

//   afterAll(() => {
//     unmountEvent();
//   });

//   beforeEach(() => {
//     initEventState();
//   });

//   afterEach(() => {
//     clearEventState();;
//   });

//   test('render Event component with correct name', () => {
//     expect(Event.find('.name').text()).toBe(Events in Berlin);
//   });

//   test('render Event component with correct time', () => {
//     expect(Event.find('.time').text()).toBe('14:00');
//   });

// });

// describe('test Event props', () => {
//   beforeAll(() => {
//     mountEventWithProps();
//   });

//   afterAll(() => {
//     unmountEvent();
//   });

//   beforeEach(() => {
//     initEventProps();
//   });

//   afterEach(() => {
//     clearEventProps();
//   })

//   test('description 1', () => {
//     expect().toBe()

//   })
//   test('description 1', () => {
//     expect().toBe()
//   })
// })

