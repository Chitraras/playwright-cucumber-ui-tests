Feature: Consultation Page CTA Buttons

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