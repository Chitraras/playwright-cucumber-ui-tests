Feature: Consultation Page CTA Buttons

    @EMC_01
    Scenario: EMC_01 Validate the "Book your 15-minute consultation" CTA buttons
        Given the consultation page is loaded
        When the user clicks the Book My Session CTA button
        Then the booking section should be displayed
        Then the user scrolls up to the take your First Step section
        When the user clicks the Take Your First Step CTA button
        Then the booking section should be displayed
        Then the user scrolls down to the bottom of Book your 15-minute consultation CTA button
        When the user clicks the Book My Session CTA button at the bottom
        Then the booking section should be displayed

    @EMC_02
    Scenario: EMC_02 Validate the "Get Free Resources" CTA button
        Given the consultation page is loaded
        When the user scrolls down to the Get Free Resources CTA
        And the user clicks the Get Free Resources CTA button
        Then the Get Resources popup should be displayed
        When the user clicks the popup close icon
        Then the Get Resources popup should not be visible
        When the user clicks the Get Free Resources CTA button
        And the user enters their name and email into the resources form
        And the user clicks the Download Resources button
        Then the Get Resources popup should be closed
        And the file download should be initiated
        And the downloaded file should exist in the downloads folder