Feature: Show/hide an event's details

    Scenario: An event element is collapsed by default
        Given a user has not clicked on an event
        When the main page opens
        Then all event info should be collapsed by default

    Scenario: User can expand an event to see its details
        Given the main page is opened
        When the user clicks on an event
        Then event info should expand so details can be seen

    Scenario: User can collapse an event to hide its details
        Given the main page is open
        And user has clicked an event and details are showing
        When the user clicks close button on modal
        Then event info should collapse and details not be seen
