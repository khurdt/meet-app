import React from "react";
import { shallow } from "enzyme";
import NumberOfEvents from "../components/NumberOfEvents";
import { mockEvents } from '../components/mock-data';
import { fakeTimer } from '../components/api'

describe('<NumberOfEvents /> component', () => {
  let NumberOfEventsWrapper;
  beforeAll(() => {
    NumberOfEventsWrapper = shallow(<NumberOfEvents number={mockEvents.length} events={mockEvents} />)
  })

  test('render input element', () => {
    NumberOfEventsWrapper.setState({ show: true });
    expect(NumberOfEventsWrapper.find('.input')).toHaveLength(1);
  });

  test('input renders number of events correctly', () => {
    expect(NumberOfEventsWrapper.state('eventsNumber')).toEqual(4);
  });

  test('render modal when filter icon is clicked', () => {
    NumberOfEventsWrapper.setState({ show: false });
    NumberOfEventsWrapper.find('.filter-icon').at(0).simulate('click');
    expect(NumberOfEventsWrapper.state('show')).toBe(true);
  });

  test('input renders number of events correctly', () => {
    NumberOfEventsWrapper.setState({ show: true });
    const eventsNumber = NumberOfEventsWrapper.state('eventsNumber');
    expect(NumberOfEventsWrapper.find('.input').prop('value')).toBe(eventsNumber);
  });

  test('render certain number of events based on input', () => {
    NumberOfEventsWrapper.setState({ show: true });
    NumberOfEventsWrapper.find('.input').simulate('change', {
      target: { value: 1 }
    });
    expect(NumberOfEventsWrapper.state('eventsNumber')).toEqual(1)
  })

  test('render certain number of events based on input', () => {
    NumberOfEventsWrapper.setState({ show: true });
    NumberOfEventsWrapper.find('.input').simulate('change', {
      target: { value: 0 }
    });
    expect(NumberOfEventsWrapper.state('eventsNumber')).toEqual(1)
  })

});