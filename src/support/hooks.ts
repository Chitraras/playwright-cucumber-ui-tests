import { Before, After, BeforeStep, AfterStep, setDefaultTimeout } from '@cucumber/cucumber';
import { chromium, devices } from 'playwright';
import { CustomWorld } from './world';

setDefaultTimeout(60 * 1000);

Before(async function (this: CustomWorld, scenario: any) {
  console.log(`\n=== Starting scenario: ${scenario?.pickle?.name ?? 'Unnamed scenario'} ===`);
  this.browser = await chromium.launch({ headless: true });
  
  // Select device based on DEVICE environment variable
  const deviceName = process.env.DEVICE;
  let contextOptions = {};
  
  if (deviceName && devices[deviceName]) {
    console.log(`Using mobile device: ${deviceName}`);
    contextOptions = devices[deviceName];
  } else if (deviceName) {
    console.warn(`Device "${deviceName}" not found, using default viewport`);
  }
  
  this.page = await this.browser.newPage(contextOptions);
});

BeforeStep(async function (this: CustomWorld, step: any) {
  const stepText = step?.pickleStep?.text ?? step?.text ?? 'Unknown step';
  console.log(`--> Before step: ${stepText}`);
});

After(async function (this: CustomWorld, scenario: any) {
  if (this.page) {
    await this.page.close();
  }
  if (this.browser) {
    await this.browser.close();
  }
  console.log(`=== Finished scenario: ${scenario?.pickle?.name ?? 'Unnamed scenario'} ===\n`);
});

AfterStep(async function (this: CustomWorld, stepInfo: any) {
  // `stepInfo` shape may vary by cucumber version; handle common fields
  const stepText = stepInfo?.pickleStep?.text ?? stepInfo?.text ?? 'Unknown step';
  const status = stepInfo?.result?.status ?? '';
  console.log(`<-- After step: ${stepText}${status ? ` (status: ${status})` : ''}`);
});
