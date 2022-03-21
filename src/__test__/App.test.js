import React from 'react';
import { shallow } from 'enzyme';
import App from '../App';
import EventList from '../EventList';
import CitySearch from '../CitySearch';

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

