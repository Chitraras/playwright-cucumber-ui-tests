Feature: Footer checks

    @FTR_01
    Scenario: FTR_01 Validate consultation page footer basic content
        Given the consultation page is loaded
        Then scrolls to the footer
        Then the footer should be visible
        And verify the page selection link for "How It Works"
        And verify the page selection link for "Features"
        And verify the page selection link for "Resources"
        And verify the page selection link for "Book Session"
        Then verify the footer contact information is displayed
        And verify the social media icons are visible
        

