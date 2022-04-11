Feature: Specify number of events

    Scenario: When user hasn’t specified a number, total number of events is shown
        Given a user hasn't specified a number
        When the main page opens
        Then the default overall number of events is at the maximum limit

    Scenario: User can change the number of events they want to see
        Given the main page is opened
        And user clicks on filter options
        When the user picks the amount of events to be seen
        And user clicks on filter button on modal
        Then the amount of events will change accordingly