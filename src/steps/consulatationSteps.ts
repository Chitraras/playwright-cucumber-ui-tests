import assert from 'assert';
import fs from 'fs';
import path from 'path';
import { Given, When, Then } from '@cucumber/cucumber';
import { ConsultationPage } from '../Pages/consulatationPage';
import { consultationData } from '../Test-Data/consultationData';
import { CustomWorld } from '../support/world';

let consultationPage: ConsultationPage;

Given('the consultation page is loaded', async function (this: CustomWorld) {
    consultationPage = new ConsultationPage(this.page);
    await consultationPage.navigateToConsultationPage();
    console.log('Navigated to Consultation Page');
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
    // Determine downloads directory (prefer env var set by CI or .env)
    const downloadsDir = process.env.EMC_Downloads_Path && process.env.EMC_Downloads_Path.length > 0
        ? process.env.EMC_Downloads_Path
        : path.join(process.cwd(), 'downloads');

    if (!fs.existsSync(downloadsDir)) fs.mkdirSync(downloadsDir, { recursive: true });

    // Use Playwright's download event pattern: wait for 'download' while clicking the button
    const [download] = await Promise.all([
        this.page.waitForEvent('download'),
        consultationPage.clickSubmitResourcesButton()
    ]);

    const suggested = download.suggestedFilename() || `download-${Date.now()}`;
    const savePath = path.join(downloadsDir, suggested);

    // Save the file to the deterministic downloads folder
    await download.saveAs(savePath);

    // Store download info on the World for later assertions
    this.latestDownload = download;
    this.latestDownloadFilename = suggested;
    this.latestDownloadPath = savePath;
});

Then('the Get Resources popup should be closed', async function (this: CustomWorld) {
    const visible = await consultationPage.isGetResourcesPopupVisible(false);
    assert.ok(!visible, 'Get Resources popup is still visible after submitting');
});

When('the file download should be initiated', async function (this: CustomWorld) {
    // Debug: print cwd and list downloads folder before asserting
    const downloadsDir = process.env.EMC_Downloads_Path && process.env.EMC_Downloads_Path.length > 0
        ? process.env.EMC_Downloads_Path
        : path.join(process.cwd(), 'downloads');

    console.log('CWD:', process.cwd());
    try {
        const before = fs.existsSync(downloadsDir) ? fs.readdirSync(downloadsDir) : [];
        console.log('Downloads folder content before assertion:', before);
    } catch (err) {
        console.warn('Could not list downloads dir before assertion:', err);
    }

    assert.ok(this.latestDownload, 'No download was initiated');
    console.log('Download object captured. Suggested filename:', this.latestDownloadFilename);
    console.log('Saved path:', this.latestDownloadPath);
    try {
        const after = fs.existsSync(downloadsDir) ? fs.readdirSync(downloadsDir) : [];
        console.log('Downloads folder content after download:', after);
    } catch (err) {
        console.warn('Could not list downloads dir after assertion:', err);
    }
});

Then('the downloaded file should exist in the downloads folder', async function (this: CustomWorld) {
    const downloadsDir = process.env.EMC_Downloads_Path && process.env.EMC_Downloads_Path.length > 0
        ? process.env.EMC_Downloads_Path
        : path.join(process.cwd(), 'downloads');

    console.log('Checking downloads in:', downloadsDir);
    try {
        const before = fs.existsSync(downloadsDir) ? fs.readdirSync(downloadsDir) : [];
        console.log('Downloads folder content before final assert:', before);
    } catch (err) {
        console.warn('Could not list downloads dir before final assert:', err);
    }

    const p = this.latestDownloadPath;
    assert.ok(p, 'No saved download path recorded');

    try {
        await fs.promises.access(p as string, fs.constants.R_OK);
    } catch (err) {
        throw new Error(`Downloaded file not accessible at ${p}: ${err}`);
    }

    const stat = fs.statSync(p as string);
    assert.ok(stat.size > 0, 'Downloaded file is empty');

    try {
        const after = fs.existsSync(downloadsDir) ? fs.readdirSync(downloadsDir) : [];
        console.log('Downloads folder content after final assert:', after);
    } catch (err) {
        console.warn('Could not list downloads dir after final assert:', err);
    }
});

