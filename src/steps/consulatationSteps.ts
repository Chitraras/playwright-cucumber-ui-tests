import assert from 'assert';
import fs from 'fs';
import path from 'path';
import { Given, When, Then } from '@cucumber/cucumber';
import { ConsultationPage } from '../Pages/consulatationPage';
import { consultationData } from '../Test-Data/consultationData';
import { CustomWorld } from '../support/world';

let consultationPage: ConsultationPage;

const resolveDownloadsDir = (): string => {
    const configuredPath = process.env.EMC_Downloads_Path;
    return configuredPath && configuredPath.length > 0
        ? configuredPath
        : path.join(process.cwd(), 'downloads');
};

Given('the consultation page is loaded', async function (this: CustomWorld) {
    consultationPage = new ConsultationPage(this.page);
    await consultationPage.navigateToConsultationPage();
});

When('the user clicks the Book My Session CTA button', async function (this: CustomWorld) {
    const isVisible = await consultationPage.checkBookMySessionCTAExists();
    assert.ok(isVisible, 'Book My Session CTA is not visible');
    await consultationPage.clickBookMySessionCTA();
});

Then('the user scrolls up to the take your First Step section', async function (this: CustomWorld) {
    await consultationPage.scrollToFirstStepSection();

    const sectionVisible = await consultationPage.checkFirstStepSectionVisible();
    assert.ok(sectionVisible, 'Take Your First Step section is not visible');

    const inViewport = await consultationPage.isFirstStepSectionInViewport();
    assert.ok(inViewport, 'Take Your First Step section is not scrolled into view');
});

When('the user clicks the Take Your First Step CTA button', async function (this: CustomWorld) {
    const ctaVisible = await consultationPage.checkTryYourFirstStepCTAExists();
    assert.ok(ctaVisible, 'Take Your First Step CTA is not visible');
    await consultationPage.clickTryYourFirstStepCTA();
});

Then('the user scrolls down to the bottom of Book your 15-minute consultation CTA button', async function (this: CustomWorld) {
    await consultationPage.scrollToBottomBookingCTA();

    const ctaVisible = await consultationPage.checkBottomBookMySessionCTAExists();
    assert.ok(ctaVisible, 'Bottom Book My Session CTA is not visible');

    const inViewport = await consultationPage.isBottomBookingCTAInViewport();
    assert.ok(inViewport, 'Bottom Book My Session CTA is not scrolled into view');

});

When('the user clicks the Book My Session CTA button at the bottom', async function (this: CustomWorld) {
    const ctaVisible = await consultationPage.checkBottomBookMySessionCTAExists();
    assert.ok(ctaVisible, 'Bottom Book My Session CTA is not visible');
    await consultationPage.clickBottomBookMySessionCTA();
});

Then('the booking section should be displayed', async function (this: CustomWorld) {
    const inViewport = await consultationPage.isBookingSectionInViewport();
    assert.ok(inViewport, 'Booking section is not scrolled into view');

    const bookingSectionVisible = await consultationPage.checkBookingSectionVisible();
    assert.ok(bookingSectionVisible, 'Booking section is not visible after clicking the CTA');

    const dropdownVisible = await consultationPage.checkTimeZoneDropdownExists();
    assert.ok(dropdownVisible, 'Booking section timezone dropdown is not visible');  
});

When('the user scrolls down to the Get Free Resources CTA', async function (this: CustomWorld) {
    await consultationPage.scrollToGetResourcesCTA();
    const exists = await consultationPage.checkGetResourcesCTAExists();
    assert.ok(exists, 'Get Free Resources CTA is not visible after scrolling');
});

When('the user clicks the Get Free Resources CTA button', async function (this: CustomWorld) {
    const isVisible = await consultationPage.checkGetResourcesCTAExists();
    assert.ok(isVisible, 'Get Free Resources CTA is not visible');
    await consultationPage.clickGetResourcesCTA();
});

Then('the Get Resources popup should be displayed', async function (this: CustomWorld) {
    const visible = await consultationPage.isGetResourcesPopupVisible(true);
    assert.ok(visible, 'Get Resources popup is not visible');
});

When('the user clicks the popup close icon', async function (this: CustomWorld) {
    await consultationPage.clickCloseResourcesButton();
});

Then('the Get Resources popup should not be visible', async function (this: CustomWorld) {
    const visible = await consultationPage.isGetResourcesPopupVisible(false);
    assert.ok(!visible, 'Get Resources popup is still visible after clicking close');
});

When('the user enters their name and email into the resources form', async function (this: CustomWorld) {
    await consultationPage.enterResourceName(consultationData.Name);
    await consultationPage.enterResourceEmail(consultationData.Email);
});

When('the user clicks the Download Resources button', async function (this: CustomWorld) {
    const downloadsDir = resolveDownloadsDir();
    if (!fs.existsSync(downloadsDir)) {
        fs.mkdirSync(downloadsDir, { recursive: true });
    }

    const [download] = await Promise.all([
        this.page.waitForEvent('download'),
        consultationPage.clickSubmitResourcesButton()
    ]);

    const suggested = download.suggestedFilename() || `download-${Date.now()}`;
    const savePath = path.join(downloadsDir, suggested);

    await download.saveAs(savePath);

    this.latestDownload = download;
    this.latestDownloadFilename = suggested;
    this.latestDownloadPath = savePath;
});

Then('the Get Resources popup should be closed', async function (this: CustomWorld) {
    const visible = await consultationPage.isGetResourcesPopupVisible(false);
    assert.ok(!visible, 'Get Resources popup is still visible after submitting');
});

When('the file download should be initiated', async function (this: CustomWorld) {
    assert.ok(this.latestDownload, 'No download was initiated');
});

Then('the downloaded file should exist in the downloads folder', async function (this: CustomWorld) {
    const downloadsDir = resolveDownloadsDir();
    if (!fs.existsSync(downloadsDir)) {
        throw new Error(`Downloads directory not found at ${downloadsDir}`);
    }

    const savedPath = this.latestDownloadPath;
    assert.ok(savedPath, 'No saved download path recorded');

    await fs.promises.access(savedPath, fs.constants.R_OK);
    const stat = await fs.promises.stat(savedPath);
    assert.ok(stat.size > 0, 'Downloaded file is empty');
});

