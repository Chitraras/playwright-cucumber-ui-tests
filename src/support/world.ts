import { IWorldOptions, setWorldConstructor, World } from '@cucumber/cucumber';
import { Browser, Page, Download } from 'playwright';

export class CustomWorld extends World {
  browser!: Browser;
  page!: Page;

  // Download tracking
  latestDownload?: Download;
  latestDownloadPath?: string;
  latestDownloadFilename?: string;

  constructor(options: IWorldOptions) {
    super(options);
  }
}

setWorldConstructor(CustomWorld);
