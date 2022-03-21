import React from "react";
import { shallow } from "enzyme";
import Event from "../Event";
import { mockEvents } from '../mock-data';

describe('<EventList /> component', () => {
  let EventWrapper;
  beforeAll(() => {
    EventWrapper = shallow(<Event events={mockEvents} />)
  })

  test('render event title', () => {
    expect(EventWrapper.find('.eventTitle')).toHaveLength(1);
  });

  test('render detail button', () => {
    expect(EventWrapper.find()).toHaveLength(1);
  })

  test('render details when clicked', () => {

  })
});