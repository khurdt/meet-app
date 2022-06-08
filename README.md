# Meet App

An Application to find or filter events and their information using React, a serverless function and google authorization.

# Features and User Stories

    Feature 1: Show/hide an event's details

        User Story: 
            as a user I should be able to show and hide event details so that I don't have to overwhelmed by lots of information and better focus on a certain event.

            Scenario 1: An event element is collapsed by default

                Given: a user has not clicked on an event
                When: the main page opens
                Then: all event info should be collapsed by default

            Scenario 2: User can expand an event to see its details

                Given: the main page is opened
                When: the user clicks on an event
                Then: event info should expand so details can be seen

            Scenario 3: User can collapse an event to hide its details

                Given: the user has clicked on an event
                When: the user clicks the event again
                Then: event info should collapse and details not be seen

    Feature 2: Specify number of events

        User Story: 
            as a user I should be able to see how many events that are in a certain city so that I can have a grasp on how many options I have.

            Scenario 1: When user hasn’t specified a number, 32 is the default number

                Given: a user hasn't specified a number
                When: the main page opens
                Then: the default overall number of events is 32

            Scenario 2: User can change the number of events they want to see

                Given: the main page is opened or a certain city is opened
                When: the user filters through events
                Then: the amount of events will change accordingly

    Feature 3: Use the app when offline

        User Story: 
            as a user I should be able to use the app offline so that I can see events and their details even when internet is either slow or nonexistent.

            Scenario 1: Show cached data when there’s no internet connection

                Given: The user has loaded the app with its data
                When: There is no more internet connection
                Then: The cached data will still appear for user

            Scenario 2: Show error when user changes the settings (city, time range)

                Given: There is no internet and user has loaded the app
                When: The user changes the city or time range which requires internet
                Then: App will show error and alert the user of no internet

    Feature 4: Data visualization

        User Story:
            as a user I should be able to see a visual chart so that I can grasp the types and quantity of events in each city

            Scenario 1: Show a chart with the number of upcoming events in each city

                Given: the main page is open
                When: the user clicks the chart tab
                Then: the chart page is opened revealing all the events in each city in a chart

