import React from "react";
import { shallow } from "enzyme";
import EventList from "../components/EventList";
import Event from '../components/Event';
import { mockEvents } from '../components/mock-data';

describe('<EventList /> component', () => {
  let EventListWrapper;
  beforeAll(() => {
    EventListWrapper = shallow(<EventList events={mockEvents} />)
  })

  test('render correct number of events', () => {
    expect(EventListWrapper.find(Event)).toHaveLength(mockEvents.length);
  });
});