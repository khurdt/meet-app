import React from "react";
import { shallow } from "enzyme";
import EventList from "../EventList";
import Event from '../Event';
import { mockEvents } from '../mock-data';

describe('<EventList /> component', () => {
  let EventListWrapper;
  beforeAll(() => {
    EventListWrapper = shallow(<EventList events={mockEvents} />)
  })

  test('render correct number of events', () => {
    expect(EventListWrapper.find(Event)).toHaveLength(mockEvents.length);
  });
});