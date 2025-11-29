import { Before, After, setDefaultTimeout } from '@cucumber/cucumber';
import { chromium } from 'playwright';
import { CustomWorld } from './world';

setDefaultTimeout(60 * 1000);

Before(async function (this: CustomWorld) {
  this.browser = await chromium.launch({ headless: false });
  this.page = await this.browser.newPage();
});

After(async function (this: CustomWorld) {
  if (this.page) {
    await this.page.close();
  }
  if (this.browser) {
    await this.browser.close();
  }
});