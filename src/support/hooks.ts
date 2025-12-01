import { Before, After, setDefaultTimeout } from '@cucumber/cucumber';
import { chromium, devices } from 'playwright';
import { CustomWorld } from './world';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

// Load environment variables from .env file
dotenv.config();

setDefaultTimeout(60 * 1000);

Before(async function (this: CustomWorld) {
  const downloadsDir = process.env.EMC_Downloads_Path && process.env.EMC_Downloads_Path.length > 0
    ? process.env.EMC_Downloads_Path
    : path.join(process.cwd(), 'downloads');

  if (!fs.existsSync(downloadsDir)) {
    try {
      fs.mkdirSync(downloadsDir, { recursive: true });
    } catch (error) {
      throw new Error(`Unable to create downloads directory at ${downloadsDir}: ${error}`);
    }
  }

  const headless = typeof process.env.HEADLESS !== 'undefined'
    ? process.env.HEADLESS === 'true'
    : true;

  this.browser = await chromium.launch({ headless });

  const deviceName = process.env.DEVICE;
  const deviceDescriptor = deviceName ? devices[deviceName] : undefined;

  if (deviceName && !deviceDescriptor) {
    throw new Error(`Playwright device descriptor not found for "${deviceName}"`);
  }

  const contextOptions = deviceDescriptor ? { ...deviceDescriptor } : undefined;
  this.page = await this.browser.newPage(contextOptions);
});

After(async function (this: CustomWorld) {
  if (this.page) {
    await this.page.close();
  }
  if (this.browser) {
    await this.browser.close();
  }
});
