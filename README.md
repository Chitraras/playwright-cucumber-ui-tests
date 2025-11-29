# Playwright Cucumber UI Tests

This project is a UI testing framework that utilizes Playwright and Cucumber for behavior-driven development (BDD) testing. It allows you to write tests in Gherkin syntax and execute them using Playwright's powerful automation capabilities.

## Project Structure

```
playwright-cucumber-ui-tests
├── src
│   ├── features
│   │   └── sample.feature       # Gherkin feature file defining test scenarios
│   ├── steps
│   │   └── sampleSteps.ts       # Step definitions for the scenarios
│   └── support
│       └── hooks.ts             # Hooks for setup and teardown of tests
├── playwright.config.ts          # Configuration file for Playwright
├── package.json                  # NPM configuration file with dependencies and scripts
├── tsconfig.json                 # TypeScript configuration file
└── README.md                     # Project documentation
```

## Setup Instructions

1. **Clone the repository:**
   ```
   git clone <repository-url>
   cd playwright-cucumber-ui-tests
   ```

2. **Install dependencies:**
   ```
   npm install
   ```

3. **Run the tests:**
   ```
   npx cucumber-js
   ```

## Usage

- Define your test scenarios in the `src/features/sample.feature` file using Gherkin syntax.
- Implement the step definitions in `src/steps/sampleSteps.ts` to interact with the UI using Playwright.
- Use `src/support/hooks.ts` to manage any setup or teardown logic required for your tests.

## Additional Information

For more details on Playwright and Cucumber, refer to their official documentation:

- [Playwright Documentation](https://playwright.dev/docs/intro)
- [Cucumber Documentation](https://cucumber.io/docs/guides/overview)

Feel free to contribute to this project by submitting issues or pull requests!