import { loadFeature, defineFeature } from "jest-cucumber";
import React from 'react';
import { mount } from 'enzyme';
import App from '../components/App';
import Event from "../components/Event";
import { mockEvents } from "../components/mock-data";

const feature = loadFeature('./src/features/specifyNumberOfEvents.feature');

defineFeature(feature, test => {
    test('When user hasn’t specified a number, total number of events is shown', ({ given, when, then }) => {
        given('a user hasn\'t specified a number', () => {

        });
        let AppWrapper;
        when('the main page opens', () => {
            AppWrapper = mount(<App />);
        });

        then('the default overall number of events is at the maximum limit', () => {
            AppWrapper.update();
            expect(AppWrapper.find('.events-showing').prop('value')).toBe(mockEvents.length);
        });
    });

    test('User can change the number of events they want to see', ({ given, and, when, then }) => {
        let AppWrapper;
        given('the main page is opened', () => {
            AppWrapper = mount(<App />);
        });

        and('user clicks on filter options', () => {
            AppWrapper.update();
            AppWrapper.find('.filter-icon').at(0).simulate('click');
        });

        when('the user picks the amount of events to be seen', () => {
            AppWrapper.update();
            AppWrapper.find('.input').at(0).simulate('change', {
                target: { value: 3 }
            });
        });

        and('user clicks on filter button on modal', () => {
            AppWrapper.update();
            AppWrapper.find('.filter-modal-icon').at(0).simulate('click');
        });

        then('the amount of events will change accordingly', () => {
            AppWrapper.update();
            expect(AppWrapper.state('events')).toHaveLength(3);
        });
    });
})