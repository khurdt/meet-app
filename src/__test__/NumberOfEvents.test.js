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
    expect(NumberOfEventsWrapper.find('.input')).toHaveLength(1);
  });

  test('input renders number of events correctly', async () => {
    await fakeTimer()
    expect(NumberOfEventsWrapper.state('eventsNumber')).toEqual(4);
  });

  test('input renders number of events correctly', () => {
    const eventsNumber = NumberOfEventsWrapper.state('eventsNumber');
    expect(NumberOfEventsWrapper.find('.input').prop('value')).toBe(eventsNumber);
  });

  test('render certain number of events based on input', () => {
    NumberOfEventsWrapper.find('.input').simulate('change', {
      target: { value: 1 }
    });
    expect(NumberOfEventsWrapper.state('eventsNumber')).toEqual(1)
  })

  test('render certain number of events based on input', () => {
    NumberOfEventsWrapper.find('.input').simulate('change', {
      target: { value: 0 }
    });
    expect(NumberOfEventsWrapper.state('eventsNumber')).toEqual(1)
  })

});