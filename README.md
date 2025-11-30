# Playwright + Cucumber UI Tests

Brief notes to run the tests in this repo and how to target a single scenario, run mobile viewports, and validate downloads.

**Quick Start**
- Install dependencies:
```cmd
npm ci
```
- Put environment values in the `.env` file (example present in repository). Key vars used:
  - `EMC_site_URL` (production URL)
  - `EMC_Test_URL` (test/staging URL)
  - `EMC_Downloads_Path` (optional; downloads folder)
  - `DEVICE` (optional; e.g. `iPhone 13`)

**Run all tests**
```cmd
npm test
```

**Run tests by tag (single scenario or group)**
Pass the Cucumber tag after `--`.
```cmd
npm run test:tag -- --tags "@EMC_02"
```

**Run a single local feature file**
```cmd
cucumber-js src/features/footer.feature --require-module ts-node/register --require src/steps/**/*.ts --require src/support/**/*.ts
```

**Run tests in a mobile viewport**
Set `DEVICE` in your environment or in `.env`. Example (Windows cmd):
```cmd
set DEVICE=iPhone 13
npm test
```
Or use PowerShell:
```powershell
$env:DEVICE='iPhone 13'
npm test
```

The test `Before` hook will read `DEVICE` and create the browser page using the Playwright device descriptor.

**Downloads**
- Downloads triggered by tests are saved to the `downloads/` folder under the project root by default. You can change or absolute-path this location using `EMC_Downloads_Path` in `.env` and by updating the steps if you prefer a custom path.

**CI (GitHub Actions)**
- Workflow: `.github/workflows/ci.yml` — run manually via the Actions tab (`workflow_dispatch`). Provide the tag input (e.g. `@FTR_01`). The workflow will run `npm run test:tag -- --tags "$TAG"`.

**Where code lives**
- Features: `src/features/*.feature`
- Step definitions: `src/steps/*.ts`
- Page objects: `src/Pages/*.ts`
- Test data: `src/Test-Data/*.ts`
- Hooks / world: `src/support/*.ts`

**Helpful tips**
- If tests run in parallel or you run mobile + desktop in same workspace, consider cleaning `downloads/` between runs.
- For debugging, set `headless: false` in `src/support/hooks.ts` to see the browser.
- To run a tag from CLI on Windows use double quotes in `cmd` or single quotes in PowerShell.

If you want, I can add shortcut npm scripts like `test:footer`, `test:mobile`, or a small script to clean `downloads/` before each run.
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