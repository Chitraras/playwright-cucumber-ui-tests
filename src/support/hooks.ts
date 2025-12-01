import { Before, After, BeforeStep, AfterStep, setDefaultTimeout } from '@cucumber/cucumber';
import { chromium, devices } from 'playwright';
import { CustomWorld } from './world';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

// Load environment variables from .env file
dotenv.config();

setDefaultTimeout(60 * 1000);

Before(async function (this: CustomWorld, scenario: any) {
  console.log(`\n=== Starting scenario: ${scenario?.pickle?.name ?? 'Unnamed scenario'} ===`);

  // Ensure deterministic downloads directory is available for both local and CI runs
  const downloadsDir = process.env.EMC_Downloads_Path && process.env.EMC_Downloads_Path.length > 0
    ? process.env.EMC_Downloads_Path
    : path.join(process.cwd(), 'downloads');
  try {
    if (!fs.existsSync(downloadsDir)) fs.mkdirSync(downloadsDir, { recursive: true });
    console.log('Ensured downloads dir:', downloadsDir);
  } catch (err) {
    console.warn('Could not create downloads dir:', err);
  }

  // Launch browser; allow overriding headless via HEADLESS env var (default true)
  const headless = typeof process.env.HEADLESS !== 'undefined'
    ? process.env.HEADLESS === 'true'
    : true;

  this.browser = await chromium.launch({ headless });

  // Select device based on DEVICE environment variable
  const deviceName = process.env.DEVICE;
  let contextOptions: any = {};

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
