Feature: Consultation Page CTA Buttons

    Scenario: EMC_01 Validate the "Book your 15-minute consultation" CTA buttons
        Given the consultation page is loaded
        When the user clicks the Book My Session CTA button
        Then the booking section should be displayed