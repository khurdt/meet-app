import React from "react";
import { shallow } from "enzyme";
import NumberOfEvents from "../components/NumberOfEvents";
import { mockEvents } from '../components/mock-data';

describe('<NumberOfEvents /> component', () => {
  let NumberOfEventsWrapper;
  beforeAll(() => {
    NumberOfEventsWrapper = shallow(<NumberOfEvents events={mockEvents} />)
  })

  test('render input element', () => {
    expect(NumberOfEventsWrapper.find('.numberOfEvents')).toHaveLength(1);
  });

  test('render correct number of events in state', () => {
    expect(NumberOfEventsWrapper.state('eventsNumber')).toEqual(4);
  });

  test('input renders number of events correctly', () => {
    const eventsNumber = NumberOfEventsWrapper.state('eventsNumber');
    expect(NumberOfEventsWrapper.find('.numberOfEvents').prop('value')).toBe(eventsNumber);
  });

  test('render certain number of events based on input', () => {
    NumberOfEventsWrapper.find('.numberOfEvents').simulate('change', {
      target: { value: 1 }
    });
    expect(NumberOfEventsWrapper.state('eventsNumber')).toEqual(1)
  })

});