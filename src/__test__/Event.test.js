import React from "react";
import { shallow } from "enzyme";
import Event from "../components/Event";
import { mockEvents } from "../components/mock-data";

describe('<EventList /> component', () => {
  let event, EventWrapper;
  beforeAll(() => {
    event = mockEvents[0];
    EventWrapper = shallow(<Event event={event} />)
  })

  test('render event title', () => {
    expect(EventWrapper.find('.eventTitle')).toHaveLength(1);
  });

  test('render show button', () => {
    expect(EventWrapper.find('.show-button')).toHaveLength(1);
  });

  test('render modal', () => {
    expect(EventWrapper.find('.modal')).toHaveLength(1);
  });

  test('show Details set to false', () => {
    expect(EventWrapper.state('show')).toBe(false);
  });

  test('make state of showDetails to be true', () => {
    EventWrapper.setState({ show: false });
    EventWrapper.find('.show-button').simulate('click');
    expect(EventWrapper.state('show')).toBe(true);
  });

  test('render class noDetails when show button is clicked', () => {
    EventWrapper.setState({ show: true });
    EventWrapper.find('.close-button').simulate('click');
    expect(EventWrapper.state('show')).toBe(false);
  });
})