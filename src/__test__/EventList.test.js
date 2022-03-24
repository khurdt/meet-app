import React from "react";
import { shallow } from "enzyme";
import EventList from "../components/EventList";
import NumberOfEvents from "../components/NumberOfEvents";
import Event from '../components/Event';
import { mockEvents } from '../components/mock-data';

describe('<EventList /> component', () => {
  let EventListWrapper;
  beforeAll(() => {
    EventListWrapper = shallow(<EventList events={mockEvents} />)
  })

  test('render NumberOfEvents', () => {
    expect(EventListWrapper.find(NumberOfEvents)).toHaveLength(1);
  })

  test('render correct number of events', () => {
    expect(EventListWrapper.find(Event)).toHaveLength(mockEvents.length);
  });
});