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
  })

  test('show Details set to false', () => {
    expect(EventWrapper.state('showDetails')).toBe(false);
  })

  test('when showDetails is set to false class noDetails renders', () => {
    expect(EventWrapper.find('.noDetails')).toHaveLength(1);
  })

  test('when showDetails is set to false class noDetails renders', () => {
    expect(EventWrapper.find('.showDetails')).toHaveLength(0);
  })

  test('render class showDetails when show button is clicked', () => {
    EventWrapper.find('.show-button').simulate('click');
    expect(EventWrapper.find('.showDetails')).toHaveLength(1);
  })

  test('hide class noDetails when show button is clicked', () => {
    EventWrapper.setState({ showDetails: false });
    EventWrapper.find('.show-button').simulate('click');
    expect(EventWrapper.find('.noDetails')).toHaveLength(0);
  })

  test('make state of showDetails to be true', () => {
    EventWrapper.setState({ showDetails: false });
    EventWrapper.find('.show-button').simulate('click');
    expect(EventWrapper.state('showDetails')).toBe(true);
  })

  test('render class noDetails when show button is clicked', () => {
    EventWrapper.setState({ showDetails: true });
    EventWrapper.find('.show-button').simulate('click');
    expect(EventWrapper.find('.noDetails')).toHaveLength(1);
  })

  test('make state of showDetails to be false', () => {
    EventWrapper.setState({ showDetails: true });
    EventWrapper.find('.show-button').simulate('click');
    expect(EventWrapper.state('showDetails')).toBe(false);
  })
});