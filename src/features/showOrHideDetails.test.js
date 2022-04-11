import { loadFeature, defineFeature } from "jest-cucumber";
import React from 'react';
import { mount } from 'enzyme';
import App from '../components/App';

const feature = loadFeature('./src/features/showOrHideDetails.feature');

defineFeature(feature, test => {
    test('An event element is collapsed by default', ({ given, when, then }) => {
        given('a user has not clicked on an event', () => {

        });
        let AppWrapper;
        when('the main page opens', () => {
            AppWrapper = mount(<App />);
        });

        then('all event info should be collapsed by default', () => {
            AppWrapper.update();
            expect(AppWrapper.find('.details-modal').at(0).prop('show')).toBe(false);
        });
    });

    test('User can expand an event to see its details', ({ given, when, then }) => {
        let AppWrapper;
        given('the main page is opened', () => {
            AppWrapper = mount(<App />);
        });

        when('the user clicks on an event', () => {
            AppWrapper.update();
            AppWrapper.find('.show-button').at(0).simulate('click');
        });

        then('event info should expand so details can be seen', () => {
            AppWrapper.update();
            expect(AppWrapper.find('.details-modal').at(0).prop('show')).toBe(true);
        });
    });

    test('User can collapse an event to hide its details', ({ given, and, when, then }) => {
        let AppWrapper;
        given('the main page is open', () => {
            AppWrapper = mount(<App />);
        });

        and('user has clicked an event and details are showing', () => {
            AppWrapper.update();
            AppWrapper.find('.show-button').at(0).simulate('click');
            expect(AppWrapper.find('.details-modal').at(0).prop('show')).toBe(true);
        });

        when('the user clicks close button on modal', () => {
            AppWrapper.find('.close-button').at(0).simulate('click');

        });

        then('event info should collapse and details not be seen', () => {
            AppWrapper.update();
            expect(AppWrapper.find('.details-modal').at(0).prop('show')).toBe(false);

        });
    });
})